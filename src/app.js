const express = require("express");
require('dotenv').config();
const demoLogger = require("./middleware/logger");
const youtubeRouter = require("./routes/youtubeRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(demoLogger);
app.use("/youtube", youtubeRouter);
app.listen(3000, () => {
    console.log(`Server started on port ${PORT}`);
});
