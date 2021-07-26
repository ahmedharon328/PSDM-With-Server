const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required :true
    },
    phone :{
        type: Number,
        required: true
    },
    review :{
        type: String,
        required: true
    }
},{ timestamps : true });

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;