import axios from "axios";

export default axios.create({
  baseURL: "https://todo-api-full.onrender.com/api/v1",
});
