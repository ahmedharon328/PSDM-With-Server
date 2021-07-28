const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Review = require('./model/blog')
const bodyParser = require('body-parser');
const { render } = require('ejs');



const app = express();


//Connect to mongoDB
const mongDB = 'mongodb+srv://ahmedharon:peka9900@nodetuts.6rv64.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(mongDB ,{useNewUrlParser:true , useUnifiedTopology:true})
.then((result) =>{ app.listen(3000,"localHost",(req,res)=>{
    console.log(`Server Is Running On localHost:3000`)
})})
.catch(err => console.log(err))


//Register view engine
app.set('view engine','ejs')
app.set('views','PSDM/views')

app.use(morgan('combined'))

app.use(express.static('PSDM'));

//I used JSON and Urlencoded So i can read data that come from the FORM and JSON    
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.get('/add-review',(req,res)=>{
    const review = new Review({
        name:'Hesham Haron',
        email:'Haron@gmail.com',
        phone: '01097351579',
        review:'I love  what im doing'
    })

    review.save().then((data)=>{
        res.send(data)
    }).catch(err => console.log(err))
})


app.get('/reviews',(req,res)=>{
    Review.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index' , { title: 'All Reviews', blogs: result })
    })
    .catch(err => console.log(err))
})

app.post('/feedback',(req,res )=>{    
    const review = new Review(req.body)
    review.save()
    .then((result)=>{
        res.redirect ('/feedback')
    }).catch(err => console.log(err))  
    
})

app.post('/reviews',(req,res)=>{
    const review = new Review(req.body);
    review.save()
    .then((result)=>{
        res.redirect('/reviews')
    })
    .catch(err => console.log(err))
});

app.get('/reviews/:id',(req,res)=>{
    const id = req.params.id
    Review.findById(id)
    .then((result)=>{
        res.render('details',{title:'Review Details', blog:result})
    })
})

app.delete('/reviews/:id',(req,res)=>{
    const id = req.params.id;
    Review.findByIdAndDelete(id)
    .then((result) =>{
        res.json({redirect:'/reviews'})
    })
    .catch(err => console.log(err))
})


app.get('/home',(req,res) =>{
    res.sendFile('./PSDM/index.html',{root:__dirname})
})

app.get('/feedback',(req,res)=>{
    res.sendFile('./PSDM/views/Feedback.html',{root:__dirname})
})
app.get('/create',(req,res)=>{
    res.render('contact',{title:'New form'})
})

app.get('/about',(req,res)=>{
    res.sendFile('./PSDM/views/about.html',{root:__dirname})
})

app.use((req,res)=>{
    res.status(404).sendFile('./PSDM/views/404.html',{root:__dirname})
})





