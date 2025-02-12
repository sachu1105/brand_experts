import axios from "axios";

const API = axios.create({
  baseURL: "https://dash.brandexperts.ae",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
