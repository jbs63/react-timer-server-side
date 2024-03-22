const mongoose = require("mongoose");
const Account = mongoose.model("Account");

let login = {
    login: (req, res) => {
        res.render('login');
    },

    processLogin: async (req, res) => {
        if(req.body && req.body.username && req.body.password) {
            const username = req.body.username;

            // Query the DB to see if username exists
            const account = await Account.findOne({username: username}).lean();
            console.log(account);
            if(account) {
                // If there's an account, set the user to account
                req.user = account; 
                //Pass in account json
                res.json({account: account});
            } else { // TODO: return 401 if not found
                // Otherwise, log error message
                console.log("Incorrect login credentials");
                res.status(401);
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

    // Logout function
    logout: (req, res) => {
        req.logout(() => {
            res.redirect('/');
        });
    }
};

module.exports = login;