const express = require("express");

// router
const signupRouter = express.Router();

const alert = require("alert");  

// import AccountSchema
const Accountdata = require("../model/Accountdata");


// router function
function router(nav){
    

    // signup page
    signupRouter.get("/",(req,res)=>{

        res.render("signup",
        {
            nav,
            title : "SignUp",
        });

    });



    // add an account
    signupRouter.post("/addaccount",(req,res)=>{

        var password = req.body.password;
        var email = req.body.email;
        var regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9]{3,5})+.([a-zA-Z0-9]{3,5})$/
        
        // email format validation
        if (regexp.test(email))
        {
            // valid email

            // password format validation
            if (password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g) && password.length >= 8)
            {
                // valid password

                // new account
                var accnt = {
                    name : req.body.name,
                    email : req.body.email,
                    username : req.body.username,
                    password : req.body.password
                }

                // pass to AccountSchema
                var account = Accountdata(accnt);

                // save new account to Database
                account.save();

                // redirect to Loginform page
                res.redirect("/login");

                alert("Your account is ready. You can LogIn now !");
               
            }
            else
            {
                // invalid password
                alert("Password must contain minimum 8 characters including atleast one lowercase,one uppercase,one digit and one special character");
            }

        }
        else
        {
            // invalid email
            alert("Invalid Email! (eg:- abcd@gmail.com)");
        }

    });




    return signupRouter;

}


// router function call
module.exports = router;