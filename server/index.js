const express = require('express');
const mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/posts')
  .then(() => {
    console.log("connected to mongodb")
  })

const postSchema = new mongoose.Schema({
  name: String,
  content: String
});
const Post = mongoose.model('Post', postSchema);
async function createPost(name, content) {
  
  const post = new Post({
    name: name,
    content: content
  });
  const result = await post.save();
  console.log(result)
}
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var posts = [];



app.get('/posts', (req, res) => {
  getPosts();
  res.json(posts);
});
app.post('/posts/', (req, res) => {
  const post = {
    name: req.body.name,
    content: req.body.content
  };

  createPost(post.name, post.content);


  posts.push(post);
  res.send(post);
});


var server = app.listen(3000, function () {
  console.log("listen to port 3000");
});

async function getPosts() {
  posts = await Post.find();
}
