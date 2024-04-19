import Axios from "axios";

const api = Axios.create({
  baseURL: "https://barberapp-57k0.onrender.com",
});
export default api;
