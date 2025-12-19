const mongoose = require("mongoose")


const  blogSchama = new mongoose.Schema({
    title : {
        type:String
    },
    subTitle : {
        type : String
    },
    description :{
        type : String
    }
} ,{
    timestamps:true
});

const Blog = mongoose.model("Blog", blogSchama)

// export garue vane sabai tho u ma  use garne sakix a
module.exports = Blog