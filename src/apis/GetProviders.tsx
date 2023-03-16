import axios from "axios";

export default async function getProviders() {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/modules?cf_bypass=1`);
  return res.data;
}