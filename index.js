const express = require("express");
const cors = require('cors');
const mysql = require('mysql');

const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "fs_bnb"
};
const connection = mysql.createConnection(config);
connection.connect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/users", (req, res) => {
    // res.send("Yay!");
    const user = req.body;
    console.log(user);

    // const userInsert = {
    //     column_a: user.name,
    //     columnB: user.email
    // };

    connection.query("INSERT INTO user SET ?", user, (err, result) => {
        if (err) {
            console.log(err);

            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({message: err.sqlMessage});
            } else {
                return res.status(500).json({message: "Failed to insert. Please try again."});
            }
        }

        console.log(result);

        var responseUser = {
            id: result.insertId,
            name: user.name,
            email: user.email,
            password: user.password
        };

        return res.status(200).json(responseUser);
    });

});

app.listen(3000, () => console.log("Listening on 3000"));