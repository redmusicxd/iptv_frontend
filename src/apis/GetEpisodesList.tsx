import axios from "axios";

export default async function getEpisodesList(provider: string | null, show: string | null) {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${provider}/vod/${show}`);
  return res.data;
}