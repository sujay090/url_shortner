import mongoose from "mongoose"

const connectDb = async()=>{
    try{
        const connec = await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connect")
    }catch(err){
        console.log(`Error ${err}`)
        process.exit(1)
    }
}

export default connectDb