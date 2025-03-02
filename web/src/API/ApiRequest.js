import axios from "axios";
import http from "./config";

const server = process.env.REACT_APP_SERVICE_URL;
const REFRESH_INTERVAL = 500000; // 8 минут 500000
let refreshTokensTimeout;

//! Рефреш токенов
export const refreshTokens = async () => {
  const data = {
    refreshToken: sessionStorage.getItem("refreshToken"),
  };
  try {
    const response = await http.post(`/auth/refresh`, data);
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
    const response = await http.post(`/auth/login`, UserData);
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
    const response = await http.post(`/auth/register`, UserData);
    return response;
  } catch (error) {
    console.log("error", error);
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
    const response = await http.post(`/auth/logout`);
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
    const response = await http.get(`/users`);
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
    const response = await http.get(`/employees/${id}`);
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
    const response = await http.patch(`/users/switchRole`);
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
    const response = await http.post(`/equipments`, UserData);
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
    const response = await http.patch(`/employees/${id}`, Data);
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
    const response = await http.get(`/equipments${s}`);
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
    const response = await http.post(`/buildings`, UserData);
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
    const response = await http.get(`/buildings?search=${s}`);
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
    const response = await http.get(`/buildings/${id}`);
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
    const response = await http.patch(`/buildings/${id}`, data);
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
    const response = await http.post(`/employees`, UserData);
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
    const response = await http.get(`/employees/${id}`);
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
    const response = await http.patch(`/employees/${id}`, data);
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
    const response = await http.get(`/employees${s}`);
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
    const response = await http.post(`/floors/canvas/${id}`, data);
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
    const response = await http.post(`/employees/bulk/delete`, Data);
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
    const response = await http.post(`/equipments/bulk/delete`, Data);
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
    const response = await http.post(`/buildings/bulk/delete`, Data);
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
    const response = await http.post(`/floors`, data);
    return response;
  } catch (error) {
    console.log("error", error);
    return;
  }
};

//! Получения елементов конваса
export const apiGetConvas = async (id) => {
  try {
    const response = await http.get(`/floors/canvas/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

//! Получения Списка офисов
export const GetOfficeAll = async () => {
  try {
    const response = await http.get(`/buildings`);
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
    const response = await http.delete(`/floors/canvas/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

//! удалить этаж
export const apiDeleteFloor = async (id) => {
  try {
    const response = await http.delete(`/floors/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
