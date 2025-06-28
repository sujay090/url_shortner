import shortUrl from "../models/shortUrlSchema.model.js";

export const saveShortUrl = async (url,newShortId,userId)=>{
     const newShortUrl = new shortUrl({
    full_url: url,
    short_url: newShortId,
  });
  if(userId){
    newShortUrl.user=userId
  }
 await newShortUrl.save();
}