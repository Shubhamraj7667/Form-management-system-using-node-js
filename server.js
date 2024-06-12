const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

const connection = require("./config/db");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {

    res.redirect("./index.html");
});

// create operation
app.post("/create", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;

    connection.query("INSERT INTO ajax_crud_table (name,email,phone) values(?,?,?)", [name, email, phone], function (err, rows) {
        // console.log(rows);
        if (err) {
            res.send({ status: 500, message: err })
        } else {
            res.send({ status: 201, message: "Submitted", url: "/read" })
        }
    })

})


// read operation

app.get("/read", (req, res) => {

    connection.query("SELECT * from ajax_crud_table", function (err, rows) {
        if (err) {
            res.send(err)
        } else {
            res.render("read.ejs", { rows })
        }
    })
})


//delete operation

app.delete("/delete_student", (req, res) => {
    const deleted_id = req.body.id;
    const deleteQuery = "DELETE FROM ajax_crud_table WHERE id = ?";

    connection.query(deleteQuery, deleted_id, (err) => {
        if (err) {
            return res.status(500).json({ status: 500, message: "Error deleting student", error: err });
        } else {
            connection.query("SELECT COUNT(*) AS cnt FROM ajax_crud_table", (err, result) => {
                if (err) {
                    return res.status(500).json({ status: 500, message: "Error fetching count", error: err });
                } else {
                    const count = result[0].cnt;
                    return res.status(200).json({ status: 200, message: "Deleted", row: count });
                }
            });
        }
    });
});




app.listen(process.env.PORT || 3000, (err) => {
    if (err) console.log(err);
    console.log(`connected success on port ${process.env.PORT}`)
});




