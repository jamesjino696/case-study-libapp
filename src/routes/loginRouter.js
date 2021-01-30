const express = require("express");

// router
const loginRouter = express.Router();

const alert = require("alert");  

// import AccountSchema
const Accountdata = require("../model/Accountdata");


// router function
function router(nav){


    // login page
    loginRouter.get("/",(req,res)=>{

        res.render("login",
        {
            nav,
            title : "LogIn",
        });

    });



    // login into an account
    loginRouter.post("/account",(req,res)=>{

        var username = req.body.username;
        var password = req.body.password;

        // find single account in Database
        Accountdata.findOne({username : username})
        .then(function(account){

            // validate account
            if(account != null)
            {
                const pass = account.password;

                // check password
                if(pass == password)
                {
                    alert("Hai  " + account.name + ",  Welcome !!!");
                    res.redirect("/home");
                }
                else
                {
                    alert("Wrong Password !!!");
                }

            }
            else
            {
                alert("Couldn't find account !!! Please check your Username and Password");
            }
            
        });

    });



    // forgot password
    loginRouter.get("/updatepasswd",(req,res)=>{

            res.render("reset",
            {
                nav,
                title : "Reset Password",
            });
    
    

    });



    // reset password
    loginRouter.post("/reset",(req,res)=>{

        const email = req.body.email;
        var newpasswd = req.body.password;
        
        // validate account
        Accountdata.findOne({email : email})
        .then(function(book){

            if(book != null)
            {
                // password format validation
                if (newpasswd.match(/[a-z]/g) && newpasswd.match(/[A-Z]/g) && newpasswd.match(/[0-9]/g) && newpasswd.match(/[^a-zA-Z\d]/g) && newpasswd.length >= 8)
                {
                    // valid password
                
                    // update password
                    Accountdata.updateOne({email : email},
                        { $set :
                            {
                                password : newpasswd
                            }
                        })
                    .then(function(updated){
                            
                        alert("Updated your password, You can login now with new password !!!");
                                
                        // login page
                        res.redirect("/login");
                            
                    });
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
                alert("Couldn't find account ! Check your Email ID");
            }
               
        });
                
    });




    return loginRouter;

}


// router function call
module.exports = router;