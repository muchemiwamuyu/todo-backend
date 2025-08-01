import connectDb from "./config/db.js";

const startServer = async () => {
    await connectDb();
}

startServer();