import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "33061",
    database: "employees"
});

con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) {
            return res.json({Status: "Error", Error: "Error in running query"});
        }
        if(result.length > 0) {
            return res.json({Status: "Success"});
        } else{
            return res.json({Status: "Error", Error: "Invalid credentials"});
        }
    })
});

app.listen(8081, () => {
    console.log("Server started on port 8081");
})