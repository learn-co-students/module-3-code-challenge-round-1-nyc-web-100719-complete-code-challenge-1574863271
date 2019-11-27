document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4046 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function displayImageInfo(image){
    let imageCard = document.querySelector('#image_card')
    let img = imageCard.querySelector('img')
    img.src = image.url
    let imageName = document.querySelector('#name')
    imageName.innerText = image.name
    let likes = document.querySelector('#likes')
    likes.innerText = image.like_count
    let commentObjects = Array.from(image.comments)
    let commentUl = document.querySelector('#comments')
    commentObjects.forEach(function(commentObject){
      let commentLi = document.createElement('li')
      commentLi.innerText = commentObject.content
      let deleteButton = document.createElement('button')
      deleteButton.innerText = 'Delete Comment' 
      deleteButton.dataset.type = 'delete-btn'
      deleteButton.dataset.commentId = commentObject.id
      commentLi.append(deleteButton)
      commentUl.append(commentLi)
    })
  }

  function fetchImage(){
    fetch(imageURL)
      .then(function(resp){
        return resp.json()
      })
      .then(function(image){
        displayImageInfo(image)
      })
  }

  fetchImage(imageURL)

  let container = document.getElementsByClassName('container')[0]

  function increaseLikes(){
    let likeSpan = document.querySelector('#likes')
    let numLikes = parseInt(likeSpan.innerText)
    likeSpan.innerText = numLikes + 1
    return numLikes
  }

  function persistLikes(numLikes){
    fetch(likeURL, { method: "POST",
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({ image_id: 4046})
    })
      .then(function(resp){
        return resp.json()
      })
  }

  function addNewComment(e){
    let commentUl = document.querySelector('#comments')
    let newComment = document.createElement('li')
    newComment.innerText = e.target[0].value
    commentUl.appendChild(newComment)
    return newComment.innerText
  }

  function persistNewComment(newComment){
    fetch(commentsURL, { method: "POST",
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
      },
      body: JSON.stringify({image_id: 4046, content: newComment})
    })
      .then(function(resp){
        return resp.json()
      })
  }

  function deleteComment(e){
    let commentUl = document.querySelector('#comments')
    commentUl.removeChild(e.target.parentNode)
  }

  function DOMDeleteComment(e, id){
    fetch(`https://randopic.herokuapp.com/comments/${id}`, { method: "DELETE",
    })
    .then(function(resp){
      deleteComment(e)
    })
  }
  
  container.addEventListener('click', function(e){
    if (e.target.id === 'like_button'){
      let numLikes = increaseLikes()
      persistLikes(numLikes)
    }

    if (e.target.dataset.type === 'delete-btn'){
      DOMDeleteComment(e,e.target.dataset.commentId)
    }
  })

  container.addEventListener('submit', function(e){
    if (e.target.id === 'comment_form'){

      let newComment = addNewComment(e)
      persistNewComment(newComment)
      e.preventDefault()
    }
  })

})
