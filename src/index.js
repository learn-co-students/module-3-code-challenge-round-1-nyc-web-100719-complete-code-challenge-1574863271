document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4040 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageTag = document.getElementById("image")
  let imageNameTag = document.getElementById("name")
  let likesSpan = document.getElementById("likes")
  let commentsUl = document.getElementById("comments")
  let imageCard = document.getElementById("image_card")
  let commentForm = document.getElementById("comment_form")

  function getImage(){
    fetch(`${imageURL}`)
    .then(function(response){
      return response.json()
    }).then(function(image){
      renderImage(image)
    })
  }

  function renderImage(image){
    imageTag.src = image.url
    imageNameTag.innerText = `${image.name}`
    likesSpan.innerText = `${image.like_count}`

    image.comments.forEach(function(comment){
      renderComment(comment)
    })
  }

  function renderComment(comment){
    let commentLi = document.createElement("li")
    let removeButton = document.createElement("button")
    
    commentLi.innerText = `${comment.content}`
    commentLi.dataset.id = `${comment.id}`
    removeButton.innerText = "Remove"
    
    commentsUl.append(commentLi)
    commentLi.append(removeButton)

    removeButton.dataset.id = comment.id

    removeButton.addEventListener("click", function(e){
      //pessimistic
      removeComment(removeButton.dataset.id)
      commentLi.remove()
    })
  }

  function saveLikes(likesObj){
    fetch(`${likeURL}`, {
      method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(likesObj)
    }).then(function(response){
      console.log(response)
    })
  }

  function saveComment(comment){
    fetch(`${commentsURL}`, {
      method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(function(response){
      console.log(response)
    })
  }

  function removeComment(comment_id){
    fetch(`${commentsURL}/${comment_id}`, {
      method: 'DELETE', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    }).then(function(response){
      console.log(response)
    })
  }

  getImage()
  imageCard.addEventListener("click", function(e){
    if (e.target.id == "like_button"){
      let likes = parseInt(likesSpan.innerText) + 1
      likesSpan.innerText = `${likes}`

      let likesObj = {
        image_id: 4040
      }

      saveLikes(likesObj)
    }
  })

  commentForm.addEventListener("click", function(e){
    e.preventDefault()

    if (e.target.type == "submit"){
      let inputValue = document.getElementById("comment_input").value
      let comment = {
        image_id: imageId,
        content: inputValue
      }
      renderComment(comment)
      saveComment(comment)
    }
  })
})
