import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_CONNECTION_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB connected Successfully");
        });

        connection.on('error',(err)=>{
            console.log("Error "+err);
            process.exit();
        })

    } catch (error) {
        console.log(String(error));
    }
}