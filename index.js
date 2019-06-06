const express = require("express");
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/users", (req, res) => {
    // res.send("Yay!");
    res.json({
        message: "Yay!"
    });
});

app.listen(3000, () => console.log("Listening on 3000"));