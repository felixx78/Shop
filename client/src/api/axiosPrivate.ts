import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: localStorage.getItem("accessToken") || "",
  },
});

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getNewAccessToken();

        originalRequest.headers["Authorization"] = newAccessToken;

        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        window.location.href = "/logout";
        throw refreshError;
      }
    }

    return Promise.reject(error);
  },
);

async function getNewAccessToken() {
  const response = await axios.get("http://localhost:3000/api/auth/refresh");
  return response.data;
}

export default axiosPrivate;
