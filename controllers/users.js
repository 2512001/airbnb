const userSchema = require('../models/user');
var url = require('url');
module.exports.singupGetRoute = (req, res) => {
    res.render('user/signup.ejs');
}

module.exports.singupPostRoute = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        let newuser = new userSchema({ email, username });
        let registereduer = await userSchema.register(newuser, password);
        req.login(registereduer, (error) => {
            if (error) {
                next(error);
            }
            req.flash('success', 'user is registered!');
            res.redirect('/listing');
        });

    }
    catch (err) {
        req.flash('error', err.message);
        res.redirect('/signup');
    }

}

module.exports.loginGetRoute = (req, res) => {
    res.render('user/login.ejs');
}

module.exports.loginPostRoute =  async (req, res) => {
     let redirect = res.locals.redirect || '/listing';
     let modifyurl = url.parse(redirect , true);
     let originlaurl = modifyurl.path || '/listing';
     req.flash('success', 'user loggin sucessfully');
     res.redirect(originlaurl);
}

module.exports.logoutroute = (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'user logout successfully!');
        res.redirect('/listing');
    })
}