import axios from "axios";
const http = axios.create({
  withCredentials: true,
});

const server = process.env.REACT_APP_SERVICE_URL;
const REFRESH_INTERVAL = 500000; // 8 минут 500000
let refreshTokensTimeout;

//! Рефреш токенов
export const refreshTokens = async () => {
  const data = {
    refreshToken: sessionStorage.getItem("refreshToken"),
  };
  try {
    const response = await http.post(`${server}/auth/refresh`, data, {});
    // Remove old tokens
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    // Destructure the required data from the response
    const { accessToken, refreshToken } = response.data.data;
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);

    return response;
  } catch (error) {
    console.error("Tokens were not updated!", error);
  }
};

//!таймер рефреша
const refreshTokensTimer = () => {
  clearTimeout(refreshTokensTimeout);
  if (sessionStorage.getItem("accessToken") === "null") {
    return;
  }
  const lastRefreshTime = sessionStorage.getItem("lastRefreshTime");
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
    sessionStorage.setItem("lastRefreshTime", Date.now());
    refreshTokensTimer();
  }, timeRemaining);

  sessionStorage.setItem("refreshTokensInterval", refreshTokensTimeout);
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

    // Store tokens in sessionStorage
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("userData", JSON.stringify(user));

    // Set the refresh token as a cookie
    document.Сookie = `refreshToken=${refreshToken}; path=/; secure; SameSite=Strict`; // Adjust attributes as needed

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
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        withCredentials: true,
      },
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
    const response = await http.get(`${server}/users`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error?.response?.status === 403) {
      window.location.href = `${process.env.REACT_APP_WEB_URL}/Authorization`;
    } else {
      console.log("Возникла ошибка при выходе!");
    }
  }
};

//! Получение профиля по Id
export const GetProfileOne = async (id) => {
  try {
    const response = await http.get(`${server}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
      withCredentials: true,
    });
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
  console.log("accessToken", sessionStorage.getItem("accessToken"));
  try {
    const response = await http.patch(
      `${server}/users/switchRole`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      },
    );
    refreshTokens();
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

//! Создание оборудования
export const CreateEquipment = async (UserData) => {
  try {
    const response = await http.post(`${server}/equipments`, UserData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Запрос на оборудование оборудования
export const UpdateEquipment = async (Data, id) => {
  try {
    const response = await http.patch(`${server}/employees/${id}`, Data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Получения Списка оборудования
export const GetEquipment = async (searchText) => {
  let s = searchText ? `?search=${searchText}` : "";
  try {
    const response = await http.get(`${server}/equipments${s}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Офисы
//!Созданеи офиса
export const CreateOffice = async (UserData) => {
  try {
    const response = await http.post(`${server}/buildings`, UserData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Получения Списка офисов
export const GetOffice = async (searchText) => {
  let s = searchText ? `?search=${searchText}` : "";

  try {
    const response = await http.get(`${server}/buildings?search=${s}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Получения офиса по Id
export const GetOfficeOne = async (id) => {
  try {
    const response = await http.get(`${server}/buildings/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Обновлеение офиса по Id
export const EditOfficeForId = async (data, id) => {
  try {
    const response = await http.patch(`${server}/buildings/${id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Сотрудники
//!Создане Сотрудника
export const CreateWorker = async (UserData) => {
  try {
    const response = await http.post(`${server}/employees`, UserData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//!Получение Сотрудника по Id
export const GetWorkerOne = async (id) => {
  try {
    const response = await http.get(`${server}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Обновлеение Сотрудника по Id
export const EditWorkerForId = async (data, id) => {
  try {
    const response = await http.patch(`${server}/employees/${id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Получения Списка офисов
export const GetWorker = async (searchText) => {
  let s = searchText ? `?search=${searchText}` : "";
  try {
    const response = await http.get(`${server}/employees${s}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! сохранить конвас
export const apiSaveConvas = async (data, id) => {
  try {
    const response = await http.post(`${server}/floors/canvas/${id}`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Массовые действия удаления
//! Удаление Сотрудников
export const DeleteWorker = async (Data) => {
  try {
    const response = await http.post(`${server}/employees/bulk/delete`, Data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Удаление оборудования
export const DeleteEquipment = async (Data) => {
  try {
    const response = await http.post(`${server}/equipments/bulk/delete`, Data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! Удаление офисов
export const DeleteOfisses = async (Data) => {
  try {
    const response = await http.post(`${server}/buildings/bulk/delete`, Data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! добавить этаж
export const apiAddFloor = async (data) => {
  try {
    const response = await http.post(`${server}/floors`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return;
  }
};

//! Получения елементов конваса
export const apiGetConvas = async (id) => {
  try {
    const response = await http.get(`${server}/floors/canvas/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

//! Получения Списка офисов
export const GetOfficeAll = async () => {
  try {
    const response = await http.get(`${server}/buildings`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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

//! очистить канвас
export const refreshCanvas = async (id) => {
  try {
    const response = await http.delete(`${server}/floors/canvas/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

//! удалить этаж
export const apiDeleteFloor = async (id) => {
  try {
    const response = await http.delete(`${server}/floors/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
