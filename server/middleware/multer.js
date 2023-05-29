/*Ce middleware Multer permet de spécifier le répertoire de destination des fichiers téléchargés, 
de générer un nom de fichier unique et de limiter les types de fichiers autorisés 
(dans ce cas, seuls les fichiers JPEG, PNG et GIF sont autorisés).*/ 

const multer = require('multer');
const fs = require('fs');

// Créer le répertoire "uploads" s'il n'existe pas déjà
const createUploadsDirectory = () => {
  const uploadsDirectory = './uploads';

  if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory);
    console.log('Répertoire "uploads" créé avec succès.');
  }
};

createUploadsDirectory();


// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Répertoire de destination des fichiers téléchargés
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + getFileExtension(file.originalname));
  }
});

// Fonction pour obtenir l'extension de fichier
const getFileExtension = (filename) => {
  return filename.split('.').pop();
};

// Configuration des types de fichiers autorisés
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé. Seuls les fichiers JPEG, PNG et GIF sont autorisés.'), false);
  }
};

// Configuration du middleware Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
