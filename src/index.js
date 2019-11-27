document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4049//Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
})


  //create an image
  function createImage(image){
    let div = document.createElement("image_card")
    div.innerHTML = 
    `
    "url": ${image.url}
    "name": ${image.name}
    "like_count": ${image.like}
    `
  }



//use GET request to fetch data from API
function fetchImageData(){
  fetch("https://randopic.herokuapp.com/images/4049")
  
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      data.resp(json)
    })
    
}
  



let likeButton = document.getElementById("like_button")

//add likes to an image
function imageLike(){
  likeButton.addEventListener("submit", (function(e)
    

  )}
