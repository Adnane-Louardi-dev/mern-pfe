require("dotenv").config();
const cors=require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectToMongo = require('./db');
const morgan = require("morgan");
const fs = require('fs');
const path = require('path');
const ministere=require("./routes/espaceMinistere")
const agent=require("./routes/espaceAgent")
const entreprise=require('./routes/espaceEntreprise')
const publicRoutes=require('./routes/espacePublic')
//connect to cluster
connectToMongo();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use("/espaceMinistere",ministere)
app.use("/espacePublic",publicRoutes)
app.use("/espaceEntreprise",entreprise)
app.use("/espaceAgent",agent)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const createImagesDirectory = () => {
  const imagesDirectory = './public/images';

  // Vérifier si le répertoire existe déjà
  if (!fs.existsSync(imagesDirectory)) {
    // Créer le répertoire
    fs.mkdirSync(imagesDirectory);
    console.log('Répertoire "images" créé avec succès.');
  }
  else 
  {console.log('Répertoire "images" est déjà existe'); }
};
// Appeler la fonction pour créer le répertoire
createImagesDirectory();


app.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000');
});
