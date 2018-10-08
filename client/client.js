const API_URL = "http://localhost:3000/posts";

posts = {};


function post() {
   var name = document.getElementById('name').value;
   var content = document.getElementById('content').value;

   const post={
      name,
      content
   };
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

getPosts();




function getPosts() {
   fetch(API_URL)
      .then(response => response.json())
      .then(posts => {
         console.log(posts);
      });
}



function render() {

}