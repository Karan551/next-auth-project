import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected Successfully.");
        });


        connection.on("error", (error) => {
            console.log("MongoDB connection Error.Please Make sure MongoDB is running.", error);

            process.exit();
        });

    } catch (error) {
        console.log("error::", error);
    }
}