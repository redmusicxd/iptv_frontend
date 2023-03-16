import axios from "axios";

export default async function getEpisodesList(provider: string | null, show: string | null, page: string | null) {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${provider}/vod/${show}?page=${page || 1}&cf_bypass=1`);
  return res.data;
}