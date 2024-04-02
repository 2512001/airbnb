const express =  require('express');
const router = express.Router();
const wrapasync = require('../uitls/wrapasync.js');
const {isloggin, isowner, validlisting ,  } = require('../middleware/authenticat.js');
const {index ,showroute, newroute, postroute, editroute, updateroute, deleteroute, filterlisting, searchlisting} = require('../controllers/listings.js');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});

//get and post route for listing
router.route('/')
.get(wrapasync(index))
.post( upload.single("listing[image]"), validlisting ,wrapasync(postroute));
    
//listing diff get route
router.get('/new', isloggin , newroute);
router.get('/filter' , isloggin , wrapasync(filterlisting));
router.get('/search' ,  isloggin  ,  wrapasync(searchlisting));

//on id get put and delete 
router.route('/:id')
.get(wrapasync(showroute))
.put(isloggin , isowner , upload.single("listing[image]") ,  validlisting  , wrapasync(updateroute))
.delete(isloggin , isowner , wrapasync(deleteroute));

//edit route 
router.get('/:id/edit', isloggin , isowner, wrapasync(editroute));

module.exports  = router;