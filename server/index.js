const express = require('express');
var app = express();

app.use(express.json());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

var posts = [{
   name: "post1",
   content: "An awesome post"
}];

app.get('/posts', (req, res) => {
   res.json(posts);
});
app.post('/posts/', (req, res) => {
   const post = {
      name: req.body.name,
      content: req.body.content
   };

   posts.push(post);
   res.send(post);
});


var server = app.listen(3000, function () {
   console.log("listen to port 3000");
});