const express = require("express");
// router
const booksRouter = express.Router();

const fs = require("fs");

const upload = require("express-fileupload");
booksRouter.use(upload());

// import BookSchema
const Bookdata = require("../model/Bookdata");


// router function
function router(nav){
    

    // books page
    booksRouter.get("/",(req,res)=>{
        
        // access all books in Database
        Bookdata.find()
        .then(function(books){

            res.render("books",
            {
                nav,
                title : "Books",
                books
            });

        });

    });



    // add book form page
    booksRouter.get("/addbook",(req,res)=>{

        res.render("addBook",
        {
            nav,
            title : "Add a Book"
        });

    });
    


    // access new book details from AddBook
    booksRouter.post("/add",(req,res)=>{
    
        // new book
        var item = {
            title : req.body.title,
            author : req.body.author,
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

        // pass to BookSchema
        var book = Bookdata(item);

        // save new book to Database
        book.save();

        // update Books page
        res.redirect("/books");

    });



    // single book page
    booksRouter.get("/:id",(req,res)=>{

        // access id of single book
        const id = req.params.id;

        // find single book in Database
        Bookdata.findOne({_id : id})
        .then(function(book){

            res.render("book",
            {
                nav,
                title : "Book",
                book
            });
            
        });

    });



    // update book form
    booksRouter.get("/updateform/:id",(req,res)=>{

        // access id of a single book
        const id = req.params.id;

        // find single book in Database
        Bookdata.findOne({_id : id})
        .then(function(book){

            res.render("updateBook",
            {
                nav,
                title : "Update a Book",
                book
            });

        });
        
    });



    // update a book
    booksRouter.post("/update/:id/:img",(req,res)=>{

        // access id & image of a single book
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
            
        // update book details
        Bookdata.updateOne({_id : id},
            { $set :
                {
                    title : req.body.title,
                    author : req.body.author,
                    genre : req.body.genre,
                    image : img,
                    about : req.body.about
                }
            })
        .then(function(book){
            // updated a book
        });

        // update Books page
        res.redirect("/books");

    });



    // delete a book
    booksRouter.get("/delete/:id/:img",(req,res)=>{

        // access id of single book
        const id = req.params.id;
        var img = req.params.img;

        // find single book in Database
        Bookdata.deleteOne({_id : id})
        .then(function(book){
            // deleted one book from Library

            // remove image
            fs.unlink("./public/images/"+img, (err) => {
                if (err) {
                    console.log(err);
                }
            });

        });

        // update Books page
        res.redirect("/books");
        
    });




    return booksRouter;

}


// router function call
module.exports = router;