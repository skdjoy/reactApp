var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);




var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/reduxApp",function(){
  console.log("mongoose successfully connected to mongodb");
});

// Session Set up
var db = mongoose.connection;
db.on('error',console.error.bind(console,'# MongoDB - connection error: '));

app.use(session({
  secret : 'mySecretString',
  saveUninitialized: false,
  resave: true,
  cookie: {maxAge: 1000*60*60*24*2},
  store: new MongoStore({mongooseConnection : db, ttl : 2*24*60*60})
}))



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var Books = require('./models/books');

app.post('/cart',function(req,res){
  var cart=req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
});

app.get('/cart',function(req,res){
  if(typeof req.session.cart !== undefined){
    res.json(req.session.cart);
  }
});

app.post('/books',function(req,res){
	var book = req.body;
	Books.create(book,function(err,books){
    if(err){
  		throw err;
  	}
    res.json(books);
  })
});

app.get('/books',function(req,res){
  Books.find(function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})

app.delete('/books/:_id',function(req,res){
  var query = {_id : req.params._id};
  Books.remove(query,function(err,books){
    if(err){
      throw err;
    }
    res.json(books);
  })
})

app.get('/images',function(req,res){
  const imgFolder = __dirname + '/public/images/';
  const fs = require('fs');
  fs.readdir(imgFolder,function(err,files){
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    files.forEach(function(file){
      filesArr.push({name:file})
    })
    res.json(filesArr);
  })
})

app.listen(3001,function(err){
  if(err){
    return console.log(err);
  }
  console.log('Api server in listening on http://localhost:3001');
})
