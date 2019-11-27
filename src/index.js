document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4043 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})


//grab the div image card
let div = document.getElementById("image_card")

//create display with image URL & info
function showImage(image){
  //add in the image from data given
  div.innerHTML = ` <img src=${image.url} />`

}

//fetch image data from imageURL
function getImage() {
  fetch('https://randopic.herokuapp.com/images/4043')
  .then(function(resp){ return resp.json() }) 
  .then(function(json){ json.image})
  }
getImage()

//function to increase the likes
function increaseLikes(e){
  let likes = document.getElementById("likes")
  likes.innerText = `${e.target.dataset.likes} likes`
 
}

//update in DB new likes & id
function updateLikes(likes, id){
      //grab from HTML where image name goes & change it to interpolate image.name
      let imageName = document.getElementById("name")
      imageName.innerText = `${image.name}`
      //grab from HTML where image likes goes & change it to interpolate image.likes
      let imageLikes = document.getElementById("likes")
      //add in dataset of likes to keep track of likes 
      let imageLikes.dataset.likes = "likes"
      //add in dataset of id to keep track of the id
      let imageLikes.dataset.id = "id"

}

//add likes to picture (increment by +1) - frontend display
      //when like button clicked, inc by 1, 
let likeButton = document.getElementById("like_button")
likeButton.addEventListener("click", function(e){
    if(e.target.className === "like-button"){
      e.target.dataset.likes = parseInt(e.target.dataset.likes) + 1
      increaseLikes(e)
      updateLikes(e.target.dataset.likes, e.target.datasset.id)
    }
})

//optimistic rendering -> DOM updated before changes added to DB

//post fetch to persist new like in DB
function persistLikes(updateLikes) {fetch('https://randopic.herokuapp.com/likes', 
{method: "POST",
    headers: 
    {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body :
      {
        image_id: (4043)
      }
  .then(function(resp){ return resp.json() }) 
}


//function to create the new comment displayed
function createComment(){
  let newLi= document.createElement("li")
  let commentsUl = document.getElementById("comments")
  newLi.innerText = `${newComment}`
  commentsUl.append(newLi)
}
//comments frontend -> clicking subit appends comment as new Li
let newCommentForm = document.getElementById("comment_form")
newCommentForm.addEventListener("submit", function(e){
  //grab comment from input recieved in form
  let comment = newCommentForm[0].value
  let newComment = {
    comment = comment
  }
  createComment(newComment)
  persistComments(newComment)
})

//post fetch to persist comments in DB
function persistComments(newComment) {fetch('https://randopic.herokuapp.com/comments', 
  {method: "POST",
      headers: 
      {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body :
        {
          image_id: (4043)
          content: `${newContent}`
        }
    .then(function(resp){return resp.json()}) 
  })
}

//delete comment -> fetch 
