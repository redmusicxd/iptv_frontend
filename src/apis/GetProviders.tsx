import axios from "axios";

export default async function getProviders() {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/modules`);
  return res.data;
}