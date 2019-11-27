document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4044 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})
let imageId = 4044 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

fetch(imageURL)
  .then(resp=>resp.json())
  .then(datas=>{
    setImage(datas)
  })


let imageBox = document.querySelector("#image_card")

function setImage(image){
  document.querySelector("#image").src = image.url
  document.querySelector("#name").innerText = `${image.name}`
  document.querySelector("#likes").innerText = `${image.like_count}`
  let comments = image.comments
  comments.forEach(element => {
    let li = document.createElement("li")
    li.dataset.commentId = element.id
    let parentUL = document.querySelector("#comments")
    li.innerText = element.content
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "DELETE"
    deleteButton.addEventListener("click", function(e){
      li.remove()
      deleteComments(li.dataset.commentId)
    })
    li.appendChild(deleteButton)
    parentUL.append(li)
  });
  let likeButton = document.querySelector("#like_button")
  let likes = image.like_count
  let likeCount = document.querySelector("#likes")
  likeButton.addEventListener("click", function(e){
    likes = likes + 1
    likeCount.innerText = `${likes}`
    updateLikes(likes, image.id)
  })
  let commentForm = document.querySelector("#comment_form")
  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    let comment = e.target.comment.value
    let li = document.createElement("li")
    let parentUL = document.querySelector("#comments")
    li.innerText = comment
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "DELETE"
    deleteButton.addEventListener("click", function(e){
      li.remove()
    })
    li.appendChild(deleteButton)
    parentUL.append(li)
    commentForm.reset()
    let testId = updateComments(comment, image.id)
    console.log(testId)
  })
}

function updateLikes(likes, imageId){
  fetch("https://randopic.herokuapp.com/likes", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      like_count: likes,
      image_id: imageId
    })
  })
}

function updateComments(comment, imageId){
  fetch("https://randopic.herokuapp.com/comments", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  }).then(res=>res.json())
    .then(res => {
      console.log(res.id); 
      return res
    });
    
}

function deleteComments(commentId){
  fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
}