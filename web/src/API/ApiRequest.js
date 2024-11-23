import axios from "axios";
const http = axios.create({
  withCredentials: true,
});

const server = "http://195.58.54.23:3000";
const REFRESH_INTERVAL = 500000; // 8 минут 500000
let refreshTokensTimeout;

//!Рефреш токенов
export const refreshTokens = async () => {
  try {
    const response = await http.get(`${server}/auth/refresh`);
    console.log("response", response);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    const { accessToken, refreshToken } = response.data.data; // Destructure the required data from the response
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return response;
  } catch (error) {
    console.error("Tokens were not updated!");
  }
};

//!таймер рефреша
const refreshTokensTimer = () => {
  clearTimeout(refreshTokensTimeout);
  if (localStorage.getItem("accessToken") === "null") {
    return;
  }
  const lastRefreshTime = localStorage.getItem("lastRefreshTime");
  const currentTime = Date.now();
  let timeRemaining;
  if (lastRefreshTime) {
    const nextRefreshTime = parseInt(lastRefreshTime) + REFRESH_INTERVAL;
    timeRemaining = Math.max(0, nextRefreshTime - currentTime);
  } else {
    timeRemaining = 0;
  }
  refreshTokensTimeout = setTimeout(() => {
    refreshTokens();
    localStorage.setItem("lastRefreshTime", Date.now());
    refreshTokensTimer();
  }, timeRemaining);

  localStorage.setItem("refreshTokensInterval", refreshTokensTimeout);
};

window.addEventListener("load", () => {
  refreshTokensTimer();
});

window.addEventListener("unload", () => {
  clearTimeout(refreshTokensTimeout);
});

//! Запрос на авторизацию
export const LoginFunc = async (UserData) => {
  try {
    const response = await http.post(`${server}/auth/login`, UserData);
    const { accessToken, refreshToken, ...user } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(user));
    refreshTokensTimer();
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      window.location.href = `${process.env.REACT_APP_WEB_URL}/Authorization`;
    } else {
      return false;
    }
  }
};

//! регистрация аккаунта
export const Register = async (UserData) => {
  try {
    const response = await http.post(`${server}/auth/register`, UserData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      window.location.href = `${process.env.REACT_APP_WEB_URL}/Authorization`;
    } else {
      console.log("Такой пользователь уже существует!");
      return false;
    }
  }
};


export const LogOut = async () => {
  try {
    const response = await http.post(
      `${server}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      window.location.href = `${process.env.REACT_APP_WEB_URL}/Authorization`;
    } else {
      console.log("Возникла ошибка при выходе!");
    }
  }
};

export const GetProfile = async () => {
    try {
      const response = await http.get(
        `${server}/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      if (error?.response?.status === 403) {
        window.location.href = `${process.env.REACT_APP_WEB_URL}/Authorization`;
      } else {
        console.log("Возникла ошибка при выходе!");
      }
    }
};

//! Смена роли
export const SwitchRole = async () => {
  try {
    const response = await http.patch(`${server}/users/switchRole`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      window.location.href = `${process.env.REACT_APP_WEB_URL}/Authorization`;
    } else {
      console.log("Такой пользователь уже существует!");
      return false;
    }
  }
};
