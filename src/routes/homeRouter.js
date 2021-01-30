const express = require("express");
// router
const homeRouter = express.Router();


// router function
function router(nav){


    // review array
    const reviews = [
        {
            reader : "Manohar Varma",
            rating : "Good",
            img : "readr1.jpeg",
            time : "- 3 hours ago",
            about : "Exactly what I wanted, and then some. This app provides a tool to store a list of all your book, comics and computer games."
        },
        {
            reader : "Ravindra Nadh",
            rating : "Excellent",
            img : "readr2.jpeg",
            time : "- Yesterday",
            about : "This app has finally helped us catalog our large and disarrayed library and to keep track of the books we have out on loan."
        },
        {
            reader : "Shalini Das",
            rating : "Satisfactory",
            img : "readr3.jpeg",
            time : "- Just now",
            about : "I get the comment section is designed for added things, but its not an organized system. Adding a small spot for checking if its signed or not would be nice."
        }
    ]



    // home page
    homeRouter.get("/",(req,res)=>{

        res.render("home",{
            nav,
            title : "Library",
            reviews
        });

    });




    return homeRouter;

}


// router function call
module.exports = router;