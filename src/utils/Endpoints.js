import axios from "axios";

const baseURL = "http://127.0.0.1:8000/v1.0/";

const axiosInstance = axios.create({ baseURL });

const api = {
  data: {
    giveaway() {
      return axiosInstance.get("/giveaway");
    },
    participant(data) {
      return axiosInstance.post("/participant", data);
    },
  },
};

export default api;
