import axios from "axios";

const instance = axios.create({
  baseURL: "https://vast-shore-74260.herokuapp.com",
  headers: {
    "content-type": "application/json",
  },
});

export default instance;
