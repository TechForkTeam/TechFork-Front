import axios from "axios";
// import useUserStore from "../store/useUserStore";
const api = axios.create({
  baseURL: "https://techfork.shop",
});

const TEMP_TOKEN = import.meta.env.VITE_APP_DEV_TOKEN;

// api.interceptors.request.use(
//   config => {
//     const accessToken = useUserStore.getState().user?.accessToken;
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// export default api;

api.interceptors.request.use(
  config => {
    // const accessToken = useUserStore.getState().user?.accessToken;
    if (TEMP_TOKEN) {
      config.headers.Authorization = `Bearer ${TEMP_TOKEN}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
