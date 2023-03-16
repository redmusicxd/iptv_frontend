import axios from "axios";

export default async function getVodShows(provider: string | null, page: string | null) {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${provider}/vod?page=${page || 1}`);
  return res.data;
}