const API_URL = "http://localhost:3000/posts";

posts = {};

let postsDOM = document.getElementById('posts');

setInterval(()=>{
      getPosts();
},2000)


function post() {
   var name = document.getElementById('name').value;
   var content = document.getElementById('content').value;

   const post={
      name,
      content
   };
   if(name === null && content === null){
         return alert("enter Values brfore you post something")
   }
   fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
         'content-type': 'application/json'
      }
   }).then(response => {
      if (!response.ok) {
         const contentType = response.headers.get('content-type');
         if (contentType.includes('json')) {
            return response.json().then(error => Promise.reject(error.message));
         } else {
            return response.text().then(message => Promise.reject(message));
         }
      }
   }).then(() => {
      setTimeout(() => {
      }, 30000);
      getPosts();
   }).catch(errorMessage => {
      
   });
 



}






function getPosts() {
   fetch(API_URL)
      .then(response => response.json())
      .then(posts => {
         render(posts);
      });
}



 function render(posts) {
      posts.reverse();
      postsDOM.innerHTML = '';
      posts.forEach( async element => {
            await (postsDOM.innerHTML += '<div class="card"><div class="card-body"><h4 class="card-title">'+ element.name  +'</h4><p class="card-text">'+element.content+'</p></div></div>');
      });
      

}