import axios from "axios";

export default async function getChannelStream(provider: string | null, channel: string | null) {
  let res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${provider}/live/${channel}?cf_bypass=1`);
  return res.data
}