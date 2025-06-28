import shortUrl from "../models/shortUrlSchema.model.js";
import { createShortUrlServiceWithOutUser,createShortUrlServiceWithUser } from "../services/createShortUrl.service.js";


export const createShortUrl= async(req, res) => {
  const { url } = req.body;
  const {userId} = req.params;
  let createdShortUrl;
  if(userId){
   createdShortUrl = await createShortUrlServiceWithUser(url,userId)
  }else{
  createdShortUrl = await createShortUrlServiceWithOutUser(url)
  }
  res.send(`${process.env.APP_URL}${createdShortUrl}`)
//   res.status(201).json({sortedUrl:`${process.env.APP_URL}${createShortUrl}`})
}

export const redirectFromShortUrl = async (req,res)=>{
    const {id} = req.params
  try{
      const urlDoc = await shortUrl.findOne({short_url:id})
     if (urlDoc && urlDoc.full_url) {
      // Ensure the URL has a protocol
      let redirectUrl = urlDoc.full_url;
      if (!redirectUrl.startsWith('http://') && !redirectUrl.startsWith('https://')) {
        redirectUrl = 'https://' + redirectUrl;
      }
      await shortUrl.updateOne({ short_url: id }, { $inc: { clicks: 1 } });
        res.redirect(redirectUrl)
    }else{
        res.send("not Found")
    }
  }catch(err){
    console.log(err)
    res.json({message:"server error"})
  }
}