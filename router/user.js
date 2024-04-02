const express = require('express');
const router = express.Router();
const wrapasync = require('../uitls/wrapasync');
const passport = require('passport');
const { savaredirect } = require('../middleware/authenticat.js');
const { singupGetRoute, singupPostRoute, loginGetRoute, loginPostRoute, logoutroute } = require('../controllers/users.js');


//singop get and post route
router.route('/signup')
.get(singupGetRoute)
.post( wrapasync(singupPostRoute));

//login get and post route
router.route('/login')
.get(loginGetRoute)
.post(savaredirect, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), loginPostRoute
   );


router.get('/logout', logoutroute);



module.exports = router;