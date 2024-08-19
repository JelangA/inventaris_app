const express = require("express"); //import session
const bodyparser = require("body-parser");
const Route = require("./routes/Route");

const helmet = require("helmet");
const app = express();

app.use(helmet());  //initial 
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', Auth); //authentifikasi

require("dotenv").config(); //configuration .env 
const port = process.env.PORT || 3000;

app.use(Route);  //secured route

//listen port
app.listen(port, () => {    
    console.log(`server berjalan di http://localhost:${port}`);
});