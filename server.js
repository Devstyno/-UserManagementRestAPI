// Creation de l'application express
const express = require("express");
const app = express();
const db = require("./database.js");
const md5 = require("md5")

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// port d'ecoute du serveur
const HTTP_PORT = 3000;

// lancement du serveur
app.listen(
    HTTP_PORT,
    () => {
        console.log(`Le Serveur Web tourne sur le port ${HTTP_PORT}`); // message en console au lancement du serveur
    }
);

// endpoint racine
app.get(
    "/",
    (req, res, next) => {
        res.json({
            "message":"Soyez le Bienvenu(e) sur notre API REST UserManagementRestAPI"
        });
    }
);

// autres endpoints
// endpoint affichage liste d'utilisateurs
app.get("/api/users", (req, res, next) => {
    const sql = "select * from user";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        });
    });
});

// endpoint affichage d'un utilisateur
app.get("/api/user/:id", (req, res, next) => {
    const sql = "select * from user where id = ?";
    const params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});

// endpoint creation d'un utilisateur
app.post("/api/user/", (req, res, next) => {
    const errors=[];
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    const data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }
    const sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)';
    const params =[data.name, data.email, data.password];
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        });
    });
});

// endpoint mise a jour utilisateur
// avec methode put
app.put("/api/user/:id", (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }
    db.run(
        `UPDATE user set 
        name = COALESCE(?,name), 
        email = COALESCE(?,email), 
        password = COALESCE(?,password) 
        WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            });
    });
});
//avec methode patch
app.patch("/api/user/:id", (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }
    db.run(
        `UPDATE user set 
        name = COALESCE(?,name), 
        email = COALESCE(?,email), 
        password = COALESCE(?,password) 
        WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message});
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            });
    });
});

//endpoint suppression d'utilisateur
app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

// reponse par defaut
app.use(function(req, res){
    res.status(404);
});
