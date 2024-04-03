import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/universities/api/v1/universities",
});
