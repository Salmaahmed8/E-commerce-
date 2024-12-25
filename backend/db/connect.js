import monngose from "mongoose"

const connect = async () => {
    try {
        console.log("Attemping to connect to database..");
        await monngose.connect(process.env.MONGO_URL, {});
        console.log("Connected to database..")
    } catch (error) {
        console.log("Failed to connect to database..", error.message);
        process.exit(1);
    }
};

export default connect;