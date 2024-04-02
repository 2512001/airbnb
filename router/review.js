const express =  require('express');
const router = express.Router({mergeParams : true});
const wrapasync = require('../uitls/wrapasync.js');
const { reviewvalidation, isloggin, isreviewauthor } = require('../middleware/authenticat.js');
const { postreview, deletereview } = require('../controllers/reviews.js');



//review middleware
router.post( '/' , isloggin , reviewvalidation , wrapasync(postreview)
);


router.delete('/:reviewId', isloggin , isreviewauthor , deletereview
);


module.exports =  router;