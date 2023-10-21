require ("dotenv").config();

const express = require("express")
const path = require("path")
const cors = require("cors")

const port = process.env.PORT || 3001;

const app = express(); 

//config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Solve CORS
app.use(cors({Credential:true, origin:"https://react-gram-completo.vercel.app/"}))

//upload directory
app.use("/uploads", express.static(path.join(__dirname,"/uploads")))

//DB connection
require("./config/db.js")
//routes 
const router = require("./routes/Router.js")
app.use(router)
app.listen(port,()=>{
    console.log(`app rodando na porta ${port}`);
})
