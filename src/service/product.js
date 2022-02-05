import axios from "axios";

export const AxiosProduct = axios.create({
  baseURL: "http://dnc0cmt2n557n.cloudfront.net/products.json",
  headers: { "Content-Type": "application/json" },
});