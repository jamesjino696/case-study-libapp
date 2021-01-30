console.log("Library App Port No. :- 9999");

const express = require("express");
const app = new express();

// select available port
const port = process.env.PORT || 9999;


// nav-array
const nav = [
    {
        link : "/home",
        name : "Home"
    },
    {
        link : "/books",
        name : "Books"
    },
    {
        link : "/authors",
        name : "Authors"
    },
    {
        link : "/books/addbook",
        name : "AddBook"
    },
    {
        link : "/authors/addauthor",
        name : "AddAuthor"
    },
    {
        link : "/signup",
        name : "SignUp/LogIn"
    },
    {
        link : "/",
        name : "LogOut"
    }
]


// imports Routers
const signupRouter = require("./src/routes/signupRouter")(nav);
const loginRouter = require("./src/routes/loginRouter")(nav);
const homeRouter = require("./src/routes/homeRouter")(nav);
const booksRouter = require("./src/routes/booksRouter")(nav);
const authorsRouter = require("./src/routes/authorsRouter")(nav);


// POST middleware
app.use(express.urlencoded({extended : true}));

// static files
app.use(express.static("./public"));

// ejs template engine
app.set("view engine","ejs");
// set initial path
app.set("views","./src/views");


// routers
app.use("/signup",signupRouter);
app.use("/login",loginRouter);
app.use("/home",homeRouter);
app.use("/books",booksRouter);
app.use("/authors",authorsRouter);


// library page
app.get("/",(req,res)=>{
    res.render("index",
    {
        nav,
        title : "Library App",
    });
});


// server port
app.listen(port,()=>{
    console.log("Server is ready at " + port);
});
