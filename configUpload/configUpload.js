const multer = require('multer');

const dir = '../public/productsImages'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body);
      cb(null, 'utils/assets/')
    },
    
    filename: (req, file, cb) => {
      const fileEx = file.originalname.split('.')[1]
  
      cb(null, `${req.body.path}.${fileEx}`)
    },
  });
  
  module.exports = multer({ storage });