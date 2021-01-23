import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.43.212:8090/",
  headers: {
    "Content-type": "application/json"
  }
});