# METTRE EN PLACE L'ENVIRONNEMENT : Installer Node.js, NPM et Express.js

## telecharger Node.js pour le serveur JavaScript
    Aller a : https://nodejs.org/en/download/
    Chercher et telecharger la version de Node.js qui correspond a votre systeme.
    NPM (pour Node Package Manager) est un gestionnaire de paquet installé par défaut dans l'environnement Node.js

## creer et developper le projet
*creer le repertoire du projet*
    $ mkdir UserManagementRestAPI
    $ cd UserManagementRestAPI

*creer le projet en tant que module NPM. le fichier package.json est cree automatiquement; il contient les informations sur le projet et permet de configurer ce dernier*
    $ npm init

*Cette commande vous demande un certain nombre de choses, telles que le nom et la version de votre application. Pour l'instant, vous pouvez simplement appuyer sur ENTRER pour accepter les valeurs par défaut pour la plupart d'entre eux, à l'exception de :*

    entry point : (index.js)

*Entrez server.js, ou tout ce que vous voulez que le nom du fichier principal soit (app.js, etc). Si vous voulez que ce soit index.js, appuyez sur RETOUR pour accepter le nom de fichier par défaut suggéré. Cela est valable pour les autres champs comme (package name, description, author).*

*le fichier package.json doit etre cree et devrait ressembler a ceci:*
    {
        "name": "le-nom-que-vous-avez-choisi",
        "version": "1.0.0",
        "description": "description-que-vous-avez-donnee",
        "main": "server.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "le-nom-que-vous-avez-donne",
        "license": "ISC"
    }

### installer les dependances dont nous aurons besoin:

*installer Express.js dans le projet*
    $npm install --save express

*installer sqlite3 (SQLite est une bibliothèque écrite en langage C qui propose un moteur de base de données relationnelle accessible par le langage SQL) pour la gestion des donnees de l'api*
    $npm install sqlite3

*installer babel (Babel est un transcompilateur JavaScript gratuit et open source qui est principalement utilisé pour convertir le code ECMAScript 2015+ en code JavaScript rétrocompatible pouvant être exécuté par des moteurs JavaScript plus anciens. Il permet aux développeurs Web de tirer parti des dernières fonctionnalités du langage) et ses dependances*
    npm install --save-dev babel-cli babel-preset-env

*installer md5 pour crypter les donnees*
    $npm install md5

*installer body-parser (Body Parser est un must-have lorsque vous développez une API ou une application web via express. Ce module vous permet d'interpréter, d'où le nom “parser”, le corps JSON d'une réponse HTTP) et nodemon (Nodemon est un utilitaire qui permet de surveiller les fichiers de votre application Node. js et de redémarrer automatiquement le serveur lorsqu'un fichier est modifié)*
    $ npm install --save nodemon body-parser

*on devrait avoir maintenant dans le fichier package.json:*
    {
        "name": "le-nom-que-vous-avez-choisi",
        "version": "1.0.0",
        "description": "description-que-vous-avez-donnee",
        "main": "server.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "le-nom-que-vous-avez-donne",
        "license": "ISC",
        "dependencies": {
            "body-parser": "^1.20.2",
            "express": "^4.18.2",
            "md5": "^2.3.0",
            "nodemon": "^3.0.1",
            "sqlite3": "^5.1.6"
        },
        "devDependencies": {
            "babel-cli": "^6.26.0",
            "babel-preset-env": "^1.7.0"
        }
    }

*modifier l'attribut "scripts" dans package.json:*
    "scripts": {
        "start": "nodemon ./server.js --exec babel-node -e js",
        "test": "echo "Error: no test specified" && exit 1"
    },

*package.json:*
    {
        "name": "le-nom-que-vous-avez-choisi",
        "version": "1.0.0",
        "description": "description-que-vous-avez-donnee",
        "main": "server.js",
        "scripts": {
            "start": "nodemon ./server.js --exec babel-node -e js",
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "le-nom-que-vous-avez-donne",
        "license": "ISC",
        "dependencies": {
            "body-parser": "^1.20.2",
            "express": "^4.18.2",
            "md5": "^2.3.0",
            "nodemon": "^3.0.1",
            "sqlite3": "^5.1.6"
        },
        "devDependencies": {
            "babel-cli": "^6.26.0",
            "babel-preset-env": "^1.7.0"
        }
    }

### creer le fichier server.js et le modifier
*c'est dans ce fichier qu'on ecrira le script du serveur d'api*
    $ touch server.js

*ajouter les lignes suivantes dans le fichier server.js pour creer l'application*
    // Creation de l'application express
    const express = require("express");
    const app = express();
    
    // port d'ecoute du serveur
    const HTTP_PORT = 3000;

    // lancement du serveur
    app.listen(
        HTTP_PORT,
        () => {
            console.log(`Server running on port ${HTTP_PORT}`); // message en console au lancement du serveur
        }
    );

    // endpoint racine
    app.get(
        "/",
        (req, res, next) => {
            res.json({
                "message":"Welcome !"
            });
        }
    );

    // inserer d'autres endpoints d'api ici

    // reponse par defaut
    app.use(function(req, res){
        res.status(404);
    });

*Dans le script de server.js, nous pouvons identifier :*
    Création du serveur express (app)
    Définition d'un port de serveur local (HTTP_PORT)
    Démarrage du serveur Web, exécuté sur HTTP_PORT
    Une réponse pour le point de terminaison racine (http://localhost:HTTP_PORT/)
    Une réponse par défaut pour toute autre demande, par défaut la réponse HTTP 404 (Non trouvé)

### lancer l'application et tester l'api via un navigateur
*l'entrée "start" que nous avions ajoutée dans notre fichier package.json nous permet d'exécuter notre serveur à l'aide de la commande npm run. Grace a nodemon, pas besoin d'arreter le serveur et de le redemarrer apres chaque modification du script*
    $ npm run start

*la console retourne quelques messages notamment:*
    Le Serveur Web tourne sur le port 3000

*Vous pouvez pointer votre navigateur vers l'URL du serveur http://localhost:3000/ pour voir le résultat initial (la réponse de notre serveur pour le point de terminaison racine "/")*
    {"message":"Welcome !"}

### connection a la base de donnees
*À ce stade, nous avons un serveur Web en cours d'exécution. Maintenant, nous avons besoin d'une base de données locale pour stocker les informations à consommer par l'API REST. Dans ce cas, nous utilisons une base de données locale SQLite, en utilisant le package de node; sqlite3.*

#### creation d'un fichier database.js
*Dans le fichier database.js nous allons créer la connexion principale à la base de données, et l'initialisation de la base de données*
    const sqlite3 = require('sqlite3').verbose();
    const md5 = require('md5');

    const DBSOURCE = "db.sqlite";

    const db = new sqlite3.Database(
        DBSOURCE,
        (err) => {
            if (err) {
                // si la base de donnees ne peut pas s'ouvrir
                console.error(err.message)
                throw err
            }
            else{
                console.log('Connected to the SQLite database.');
                db.run(
                    `CREATE TABLE user (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name text, 
                        email text UNIQUE, 
                        password text, 
                        CONSTRAINT email_unique UNIQUE (email)
                    )`,
                    (err) => {
                        if (err) {
                            // si la table existe deja
                        }
                        else{
                            // creation de table et insertion de donnees
                            const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)';
                            db.run(insert, ["admin","admin@example.com",md5("admin1234567890")]);
                            db.run(insert, ["user","user@example.com",md5("user1234567890")]);
                        }
                    }
                );  
            }
        }
    );

    module.exports = db

### Étendre l'API REST avec des points de terminaison de données
Nous pouvons maintenant utiliser la connexion à la base de données créée à la dernière étape.

#### Tout d'abord, importez la référence au script de database.js dans server.js :
*ajouter en bas des lignes suivantes...*
    // Creation de l'application express
    const express = require("express");
    const app = express();

*...la ligne ci-apres:*
    const db = require("./database.js")

*Pour une API REST, l'objectif principal est de créer une source de données sans état, uniforme, à la demande et basée sur une URI, représentant les entités dans un format standard (dans ce cas, une réponse JSON). Les principales opérations/endpoints que vous souhaiterez peut-être implémenter dans un service REST pourraient être :*

    Operation                               Méthode HTTP        Point de terminaison
    Obtenir une liste d'entités             GET                 /api/users/
    Obtenir une seule entité par id         GET                 /api/user/{id}
    Créer une entité                        POST                /api/user/
    Mettre à jour l'entité par id           PATCH et ou PUT     /api/user/{id}
    Supprimer l'entité par id               DELETE              /api/user/{id}


#### obtenir une liste d'utilisateurs
*Le premier endpoint de l'API à implémenter sera la liste des utilisateurs. Le code suivant dans server.js créera un point de terminaison pour répertorier les utilisateurs dans la base de données (placez ce code avant la dernière réponse par défaut):*
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


#### obtenir un utilisateur via son id
*ajouter a la suite le code suivant*
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

#### creer un utilisateur
*Dans ce cas, la méthode HTTP sera POST (envoyer de nouvelles données). Lorsque vous envoyez des données POST, ces informations sont normalement encodées en URL à partir d'un formulaire.Vous devez ajouter un prétraitement supplémentaire pour analyser le corps des requêtes POST.*

*Dans servers.js, a la suite de...:*
    // Creation de l'application express
    const express = require("express");
    const app = express();
    const db = require("./database.js");

*...ajoutez:*
    const md5 = require("md5")

    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

*Nous utilisons à nouveau md5() pour hacher le mot de passe créé. Le module middleware body-parser, ajouté à l'application Express.js, essaiera d'analyser le contenu du corps (encodé en URL ou JSON) de la demande de publication et de le stocker dans l'objet req.body. Ajoutez ensuite le code de point de terminaison Express.js suivant :*
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

#### mettre a jour un utilisateur via son id
*Pour les opérations de mise à jour, nous utilisons la méthode PATCH (replace data). Nous pouvons envoyer un sous-ensemble de champs à mettre à jour dans l'entité (utilisateur). Le code server.js pour implémenter la mise à jour utilisateur est :*
    // endpoint mise a jour utilisateur
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

*la meme methode peut etre implementee avec PUT:*
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

#### supprimer un utilisateur via son id
*La dernière méthode à implémenter est DELETE. Ce point de terminaison prend un ID utilisateur à supprimer. Le code server.js pour implémenter l'action de suppression de l'utilisateur est :*
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

## tester l'api
### utiliser postman
*avec Postman, il n'est pas plus facile de tester ses apis. Toutefois, le client web postman ne permet pas de tester les apis depuis le localhost*

*voici le lien vers postman:*
    https://web.postman.co/

*pour telecharger l'application desktop, qui est plus utile dans cette situation, voici le lien:*
    https://www.postman.com/downloads/

*il vous sera demande de creer un compte et tout; de toute facon c'est gratuit !*

### tests
*apres avoir lance postman et cree un workspace, veuillez a ce que ***les methodes selectionnees soient adequates a chaque requete que vous saisissez*** *

***le serveur doit etre actif avant de s'attendre a avoir des resultats !***

#### methode GET
*vous pouvez saisir dans le champ de requete,*
*pour pointer vers la racine:*
    http://localhost:3000/

*pour pointer vers la liste des utilisateurs:*
    http://localhost:3000/api/users
*pour pointer vers un utilisateur; ici celui a l'id egale a 1*
    http://localhost:3000/api/user/1

*appuyez sur **send***

#### methode POST
*saisir:*
    http://localhost:3000/api/user/

*aller dans **body** pour remplir le name, l'email et le password de l'utilisateur a creer*

*appuyez sur **send** pour lancer la requete*

#### methode PATCH or PUT
*saisir*
    http://localhost:3000/api/user/

*saisir l'id dans **params** pour pointer sur l'utilisateur a modifier*

*aller dans body pour remplir le name ou l'email ou le password de cet utilisateur*

*appuyez sur **send***

***En general PUT est utilise pour modifier totalement une entite et PATCH pour le faire partiellement***

#### methode DELETE
*saisir*
    http://localhost:3000/api/user/

*saisir l'id dans **params** pour pointer sur l'utilisateur a supprimer*

*aller dans body pour remplir le name ou l'email ou le password de cet utilisateur*

*appuyez sur **send***

**Vous pouver arreter le serveur avec Ctrl^C ou Command^C**

# FELICITATION VOUS ETES A LA FIN. VOUS POUVEZ ME CONTACTER A L'ADRESSE yao.david.soussoukpo@outlook.com
