const User = require("../models/user.js");

module.exports.renderSignupForm= (req,res) =>{
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res) => {
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email, username});
        const registeduser = await User.register(newUser,password);
        console.log(registeduser);
        req.login(registeduser,(err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderLust");
            res.redirect("/listings");
        });
    }catch(e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
  
};

module.exports.renderLoginForm = (req,res) =>{
    res.render('users/login.ejs');
};


module.exports.login = async(req,res) => {
    req.flash("success","Welcome back to wanderLust You are logged in!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logOut((err) => {
        if(err) {
           return next(err);
        }
        req.flash("success","loged Out!!");
        res.redirect("/listings");
    });
};