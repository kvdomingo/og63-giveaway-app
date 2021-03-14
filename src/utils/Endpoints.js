import axios from "axios";

const { NODE_ENV } = process.env;

const baseURL =
  NODE_ENV === "development" ? "http://127.0.0.1:8000/v1.0/" : "https://og63-giveaway-api.herokuapp.com/v1.0/";

const axiosInstance = axios.create({ baseURL });

const api = {
  data: {
    giveaway() {
      return axiosInstance.get("/giveaway");
    },
    participant(data) {
      return axiosInstance.post("/participant", data);
    },
    winner() {
      return axiosInstance.get("/winner");
    },
    getDraw(data) {
      return axiosInstance.post("/draw", data);
    },
    publishDraw(data) {
      return axiosInstance.post("/publish", data);
    },
  },
};

export default api;
