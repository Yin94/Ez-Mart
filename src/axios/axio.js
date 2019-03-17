import axios from "axios";

export default axios.create({
  baseURL:
    "https://firestore.googleapis.com/v1/projects/ez-mart-7f88f/databases/(default)/",
  timeout: 1000
});
