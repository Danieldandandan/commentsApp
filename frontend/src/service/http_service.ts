import axios from "axios";

const httpService = axios.create({
  baseURL: "http://localhost:5000/api/v0",
});

export default httpService;
