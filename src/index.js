document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4039 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function fetchImage () {
    fetch(imageURL).then(function(response) {
     return response.json();
   })
   .then(function(json) {
     console.log(json)
    let imgName = document.getElementById('name');
    imgName.innerText = `${json.name}`
    let imgSrc = document.getElementById('image').src = `${json.url}`
    let imgLikes = document.getElementById('likes');
    imgLikes.innerText = `${json.like_count}`
    

   });
  }
  fetchImage();

  function persistLike(id, like, e){
    fetch(`https://randopic.herokuapp.com/images/${imageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({likes: like})
    })
  }

  document.addEventListener("click", function(e){
    if (e.target.dataset.purpose === "like"){
      let parent = e.target.parentNode
      let p = document.getElementById("likes")
      let newLike = parseInt(p.innerText) + 1
      e.target.dataset.likes = newLike
      p.innerText = newLike
      let id = e.target.dataset.id
      persistLike(id, newLike, e)
    }
  })

 
  

})
