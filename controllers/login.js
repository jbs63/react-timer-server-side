const mongoose = require("mongoose");
const passport = require('passport');
const Account = mongoose.model("Account");

let login = {
    processLogin: async (req, res) => {
        if(req.body && req.body.username && req.body.password) {
            const username = req.body.username;

            // Query the DB to see if username exists
            const account = await Account.findOne({username: username}).lean();
            console.log(account);
            if(account) {
                //Pass in account json
                res.json(account);
            } else { 
                // Otherwise, log error message
                console.log("Incorrect login credentials");
                res.status(401);
            }
        }
    },

    processRegister: async (req, res) => {
        // Check if password and passwordAgain are the same
        if (req.body.password && req.body.passwordAgain && req.body.password === req.body.passwordAgain) {
            try {
                // Check the rest of the user info is there and register
                if (req.body.username && req.body.email && req.body.password) {
                    const newUser = new Account({ username: req.body.username, email: req.body.email });
                    await Account.register(newUser, req.body.password);

                    // Create a user object without the hashed password and salt
                    const user = {
                        _id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                        // Add any other user properties you want to include in the response
                    };

                    passport.authenticate("local")(req, res, () => {
                        console.log("Account created!", user);
                        res.status(200).json(user);
                    });
                }
            } catch (error) {
                // Handle registration error
                console.error("Error creating account:", error);
                res.status(500).json({ error: "Internal server error" });
            }
            
        } else {
            // Otherwise, log error message
            console.log("Passwords do not match.");
            res.status(400).json({ error: "Passwords do not match" });
        }
    },

    processDeregister: async (req, res) => {
        try {
            // Fetch the current user's ID from the request object (assuming you're using Passport.js)
            const userId = req.user._id;
    
            // Delete the user account from the database
            await User.findByIdAndDelete(userId);
    
            // Send a success response
            res.status(200).json({ message: "User account deleted successfully" });
        } catch (error) {
            // Handle errors
            console.error("Error de-registering user:", error);
            res.status(500).json({ error: "Internal server error" });
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