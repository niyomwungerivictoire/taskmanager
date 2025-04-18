import dotenv from "dotenv"
dotenv.config();
export default{
    port: process.env.PORT||5000,
    mongodburl: process.env.MONGO_URL || "mongodb+srv://niyomwungerivictoire177:1hRDZvtT0yRrBI6x@cluster0.soufodf.mongodb.net/taskmanagement",
    jwtSecret: process.env.JWT_SECRET,
    jwtexpire:process.env.JWT_EXPIRE ||'7d'
};
