require('dotenv').config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const eventRoute = require("./routes/events");
const app = express();
const PORT = process.env.PORT || 8002;

connectToMongoDB(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected Successfully for Event Reg App"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(express.json());

app.use(express.static("public"));

app.use("/api/events", eventRoute);
app.listen(PORT, () => console.log(`Server started and tracking on PORT: ${PORT}`));