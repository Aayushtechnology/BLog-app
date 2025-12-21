
 

const express = require('express')
const databaseConnect= require ('./database/dbconnect.js');
const Blog = require("./model/blogmodel")
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({extended:true})) 
databaseConnect(process.env.MONGO_URL); 

app.post("/blog",async(req,res)=> { 
     
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

app.get("/blogs",async(req,res)=>{
    const blogs = await Blog.find()
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

 // single blog featch
app.get("/blogs/:id",async (req,res)=> {
    
    const { id } = req.params;
    console.log(id); 
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

app.patch("/blogs/:id",async (req,res)=> {
    const { id } = req.params
    const {title,subTitle,description} = req.body

    await Blog.findByIdAndUpdate(id,{
        title : title,
        subTitle: subTitle,
        description: description
    })

})

app.listen(port, () => {
    console.log(`sever is running port number ${port}`)
} ) ;

