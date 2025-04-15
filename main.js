import "dotenv/config"

import "./src/config/database.config.js";

import app from "./app.js"

const PORT = process.env.PORT;
app.listen(PORT,() =>{
    console.log(`Server running at http://localhost:${PORT}`);
})