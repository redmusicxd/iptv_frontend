import axios from "axios";

export default async function getVodStream(provider: string | null, show: string | null, epid: string | null) {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${provider}/vod/${show}/${epid}`);
  return res.data;
}