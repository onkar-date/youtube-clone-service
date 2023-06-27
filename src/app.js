const express = require("express");
require('dotenv').config();
const requestLogger = require("./middleware/logger");
const youtubeRouter = require("./routes/youtubeRoutes");
const clientErrorHandler = require("./errorHandlers/clientErrorHandler");
const errorHandler = require("./errorHandlers/errorHandler");
const invalidPathHandler = require("./errorHandlers/invalidPathHandler");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(requestLogger);
app.use("/youtube", youtubeRouter);

app.use(clientErrorHandler);
app.use(errorHandler);
app.use(invalidPathHandler);
app.listen(3000, () => {
    console.log(`Server started on port ${PORT}`);
});
