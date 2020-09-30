require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());

//Routes

//params => http://localhost:5000/:id => req.params
//query parameter => https://localhost:5000/?name=henry = req.query

app.get("/users", async (req, res) => {
    try {
        const { name } = req.query;

        //first_name last_name => %{}%
        //Henry Ly => %ly%
        // || => OR SQL || => Concat

        const result = await pool.query(
            "SELECT * FROM users WHERE first_name || ' ' || last_name LIKE $1", 
            [`%${name}%`]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("Server is starting on port 5000")
});