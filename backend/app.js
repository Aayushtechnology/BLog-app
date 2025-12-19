
const express = require("express");
const app = express();

const databaseConnect = require("./database/dbconnect");
const authRoute = require("./routes/authRoute");



require("dotenv").config();


app.use(express.json()); 


app.use("/api/auth/", authRoute); 


// Database connect
databaseConnect(process.env.MONGO_URL);

// Server start
app.listen(process.env.PORT, () => {
    console.log("Server is starting on port number:", process.env.PORT);
});
 

const express = require('express')
const databaseConnect= require ('./db/database');
const Blog = require("./model/blogmodel")
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended:true})) 
databaseConnect(process.env.MONGO_URL); 

app.post("/blog",async(req,res)=> { 
    // console.log(req.body)

    // data store garne  
    // const title = req.body.title;
    // const subTitle = req.body.subTitle;
    // const description = req.body.description; 
    const {description,subTitle,title} = req.body

   await Blog.create({
        title:title,
        subTitle:subTitle,
        description:description
    }) 

    res.status (201).json ({
        massage:"blog crate sucessfully"
    })
})
// gat api /// blog database bata fetch garar fronted ma show graxa 

app.get("/blogs",async(req,res)=>{
    //instert garxa 
    const blogs = await Blog.find()
    //databse koi adat xana vane yo run huxa 
    if (blogs.length == 0){
        res.status(401).json({
            massage:"empty blogs"
        })
    }else {
        res.status(201).json({
            message: "Blog created successfully",
            blogs:blogs
        })
    }
})

//single page /single blog api 
app.get("/blogs/:id",async (req,res)=> {
    // id fectm garxa parms lie
    const { id } = req.params;
    console.log(id);
    // data find 
    const blog = await Blog.findById(id);


  if (blog){
        res.status(200).json({
            massage : " blog feacth sucesfully",
            //data ayta virables ho 
            data:blog
        
        })
    }
    else {
       res.status(404).json({
        massage : "NO blog found"
       })
    }
}) 

app.patch("/blogs/:id",async (req,res)=> {
     const id = req.params.id 
    //  const title = req.body.title 
    //  const  subTitle = req.body.subTitle
    //  const description =req.body.description

    const {title ,subTitle ,description} = req.body

  await Blog.findByIdAndUpdate(id,{
      title :title,
      subTitle:subTitle,
      description:description
  }) 

    res.status(200).json ({
    massage : "blog upadtae  succesfully"
  })
})

app.delete("/blogs:id",async (req,res)=> {
    const {id} = req.params

    await Blog.findByIdAndDelete(id)

    res.status(200).json ({
        massage : " BLOg delete sucessfuly"
    })
})

app.listen(port, () => {
    console.log(`sever is running port number ${port}`)
} ) ;

