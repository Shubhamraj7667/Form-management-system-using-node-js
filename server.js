const express = require ("express");
const app = express();

const connection = require("./config/db");
app.use(express.static(__dirname + "/public" ));

app.get("/",(req,res) =>{

    res.redirect("./index.html");
} );



app.listen(process.env.PORT || 3000 , (err) => {
    if(err) console.log(err);
    console.log(`connected success on port ${process.env.PORT}`)
});




