import axios from "axios";
import { API_KEY, API_PATH } from "../constants.mjs";

const client = axios.create({
  baseURL: API_PATH,
  params: {
    api_key: API_KEY,
    format: "json",
    nojsoncallback: 1
  }
});

client.interceptors.response.use(res => {
  if (res.data && res.data.stat === "ok") {
    return res;
  } else if (res.data && res.data.stat === "fail") {
    return Promise.reject(Error(`(${res.data.code}) ${res.data.message}`));
  }

  return Promise.reject(Error("unknown"));
});

export default client;
