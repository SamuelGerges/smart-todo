import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;


const dbConnection = async() => {
  try{
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB database");
  } catch(error){
    console.error("Error connecting to MongoDB database:", error);
  }
  
}


export default dbConnection;