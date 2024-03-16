const mongoose = require("mongoose");
const passport = require('passport');
const Account = mongoose.model("Account");

let login = {
    login: (req, res) => {
        res.render('login');
    },

    processLogin: async (req, res) => {
        if(req.params && req.params.username && req.params.password) {
            const username = req.params.username;

            // Query the DB to see if username exists
            const account = await Account.findOne({username: username}).lean();
            if(account) {
                // If there's an account, set the user to account and redirect to home to let passport check if the password matches 
                req.user = account; 
                //res.redirect('/'); // TODO: pass in account json
                return account;
            } else { // TODO: return 401 if not found
                // Otherwise, log error message
                console.log("Incorrect login credentials");
                res.redirect("/login");
            }
        }
    },

    register: (req, res) => {
        res.render('register');
    },

    processRegister: async (req, res) => {
        // Check if password and passwordAgain are the same
        if (req.body.password && req.body.passwordAgain && req.body.password === req.body.passwordAgain) {
            //Check the rest of the user info is there and register
            if (req.body.username && req.body.email && req.body.password) {
                await Account.register(new Account({ username: req.body.username, email: req.body.email }), req.body.password);
                console.log("Account created!");
            }
            res.redirect("/login");
        } else {
            // Otherwise, log error message
            console.log("Passwords do not match.");
            res.redirect("/register");
        }
    },

    // New function for Google authentication
    processGoogleLogin: passport.authenticate('google', {
        scope: ['profile', 'email']
    }),

    // Callback function for Google authentication
    processGoogleCallback: passport.authenticate('google', {
        failureRedirect: '/login' // Redirect to login page on failure
    }),

    // Logout function
    logout: (req, res) => {
        req.logout(() => {
            res.redirect('/');
        });
    }
};

module.exports = login;