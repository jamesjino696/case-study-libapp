const express = require("express");
// router
const authorsRouter = express.Router();

const fs = require("fs");

const upload = require("express-fileupload");
authorsRouter.use(upload());

// import AuthorSchema
const Authordata = require("../model/Authordata");


// router function
function router(nav){


    // authors page
    authorsRouter.get("/",(req,res)=>{

        // access all authors in Database
        Authordata.find()
        .then(function(authors){

            res.render("authors",{
                nav,
                title : "Authors",
                authors
            });

        });
    });



    // add author form page
    authorsRouter.get("/addauthor",(req,res)=>{

        res.render("addAuthor",
        {
            nav,
            title : "Add an Author"
        });

    });



    // access new author details from AddBook
    authorsRouter.post("/add",(req,res)=>{

        // new author
        var item = {
            author : req.body.author,
            book : req.body.book,
            genre : req.body.genre,
            image : req.files.image.name,
            about : req.body.about
        }

        if(req.files){
            var file = req.files.image;
            var filename = req.files.image.name;

            // upload image to images-folder
            file.mv("./public/images/"+filename,function(err){
                if(err){
                    res.send(err);
                }
            });

        }

        // pass to AuthorSchema
        var author = Authordata(item);

        // save new author to Database
        author.save();

        // update Authors page
        res.redirect("/authors");

    });



    // single author page
    authorsRouter.get("/:id",(req,res)=>{

        // access id of single author
        const id = req.params.id;

        // find single author in Database
        Authordata.findOne({_id : id})
        .then(function(author){

            res.render("author",
            {
                nav,
                title : "Author",
                author
            });
            
        });

    });



    // update author form
    authorsRouter.get("/updateform/:id",(req,res)=>{

        // access id of a single author
        const id = req.params.id;

        // find single author in Database
        Authordata.findOne({_id : id})
        .then(function(author){

            res.render("updateAuthor",
            {
                nav,
                title : "Update an Author",
                author
            });

        });
        
    });



    // update an author
    authorsRouter.post("/update/:id/:img",(req,res)=>{

        // access id & image of a single author
        const id = req.params.id;
        var img = req.params.img;

        // if image is updated
        if(req.files){

            // remove curent image
            fs.unlink("./public/images/"+img, (err) => {
                if (err) {
                    console.log(err);
                }
            });

            img = req.files.image.name;
            var file = req.files.image;

            // upload image to images-folder
            file.mv("./public/images/"+img,function(err){
                if(err){
                    res.send(err);
                }
            });
        
        }
            
        // update author details
        Authordata.updateOne({_id : id},
            { $set :
                {
                    author : req.body.author,
                    book : req.body.book,
                    genre : req.body.genre,
                    image : img,
                    about : req.body.about
                }
            })
        .then(function(author){
            // updated an author
        });

        // update Authors page
        res.redirect("/authors");

    });



    // delete an author
    authorsRouter.get("/delete/:id",(req,res)=>{

        // access id & image of a single author
        const id = req.params.id;
        const img = req.params.img;

        // find single author in Database
        Authordata.deleteOne({_id : id})
        .then(function(author){
            // deleted one author from Library

            // remove image
            fs.unlink("./public/images/"+img, (err) => {
                if (err) {
                    console.log(err);
                }
            });

        });

        // update Authors page
        res.redirect("/authors");
        
    });




    return authorsRouter;

}


// router function call
module.exports = router;