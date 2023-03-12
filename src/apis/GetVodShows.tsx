import axios from "axios";

export default async function getVodShows(provider: string | null) {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${provider}/vod`);
  return res.data;
}