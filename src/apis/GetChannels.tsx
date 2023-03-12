import axios from "axios";

export default async function getChannels(provider: string | null) {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${provider}/live`);
  return res.data;
}