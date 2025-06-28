import { saveShortUrl } from "../dao/short_url.js";
import { genaratedNanoId } from "../utils/genarateNanoId.js";

export const createShortUrlServiceWithOutUser = async (url) => {
  const newShortId = genaratedNanoId(7);
 await saveShortUrl(url,newShortId,)
  return newShortId;
};

export const createShortUrlServiceWithUser = async (url,userId) => {
  const newShortId = genaratedNanoId(7);
 await saveShortUrl(url,newShortId,userId)
  return newShortId;
};