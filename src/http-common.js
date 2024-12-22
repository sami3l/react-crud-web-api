import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5008/api",
  headers: {
    "Content-type": "application/json"
  }
});