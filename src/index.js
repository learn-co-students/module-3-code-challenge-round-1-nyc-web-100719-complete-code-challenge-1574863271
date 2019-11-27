document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4042 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let image = document.querySelector("#image")
  let imageCard = document.querySelector("#image_card")
  let likes = document.querySelector("span#likes")
  let commentsUl = document.querySelector("ul#comments")
  let likeButton = imageCard.querySelector("button#like_button")
  let commentForm = document.querySelector("form#comment_form")

  function addComments(data){
    data.comments.forEach(function(comment){
      let li = document.createElement("li")
      li.dataset.purpose = "comment"
      li.dataset.id = comment.id
      li.innerText = comment.content
      let deleteButton = document.createElement("button")
      deleteButton.dataset.purpose = "delete"
      deleteButton.dataset.id = comment.id
      li.append(deleteButton)
      deleteButton.innerText = "X"
      commentsUl.append(li)
    })
  }

  function addImage(data){
    image.src = data.url
    let title = imageCard.querySelector("h4")
    console.log(data)
    title.innerText = data.name
    likes.innerHTML = `${data.like_count}`
    likes.dataset.count = data.like_count
    addComments(data)
  }

  function addComment(comment){
    let li = document.createElement("li")
    li.dataset.purpose = "comment"
    li.innerText = comment
    let deleteButton = document.createElement("button")
    deleteButton.dataset.purpose = "delete"
    deleteButton.dataset.id = comment.id
    li.append(deleteButton)
    deleteButton.innerText = "X"
    commentsUl.append(li)
  }


  function persistLikes(likes){
    fetch(`https://randopic.herokuapp.com/likes`, {method: "POST",
      headers:{
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        image_id: imageId,
      })
    })
    .then(function(resp){
      return resp.json()
    })

  }

  function persistComment(comment){
    fetch('https://randopic.herokuapp.com/comments', {method: "POST",
    headers:{
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  })
  .then(function(resp){
    return resp.json()
  })

  }

  function deleteComment(comment_id, event){
    fetch(`https://randopic.herokuapp.com/comments/${comment_id}`,{method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        accept: "application/json"
      }
    })
    .then(function(resp){
      return resp.json()
    })
    .then(function(){
      event.target.parentNode.remove()
    })
  }

  function fetchImage(imageId){
    fetch(imageURL)
    .then(function(resp){return resp.json()})
    .then(function(data){
      addImage(data)
    })
  }

  fetchImage()

  likeButton.addEventListener("click", function(e){
    console.log(e.target.dataset.count)
    let newLikes = parseInt(likes.innerHTML) +1
    likes.innerHTML = newLikes
    persistLikes(newLikes)
  })

  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    console.log(e.target[0].value)
    addComment(e.target[0].value)
    persistComment(e.target[0].value)
    e.target[0].value = ""
  })

  commentsUl.addEventListener("click", function(e){
    if(e.target.dataset.purpose === "delete"){
      deleteComment(e.target.dataset.id, e)

    }
  })

})
