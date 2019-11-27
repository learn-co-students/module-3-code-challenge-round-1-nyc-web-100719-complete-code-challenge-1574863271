document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4045

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let deleteCommentBtn = document.createElement("button")
    deleteCommentBtn.innerText = "X"

  function getComments(data, imageObj){
    data.comments.forEach(function(comment) {
      let newComment = {
        "id": comment.id,
        "content": comment.content,
        "image_id": comment.image_id,
        "created_at": comment.created_at,
        "updated_at": comment.updated_at
      }
      imageObj.comments.push(newComment)
    })
  }
  
  function fetchImage(){ fetch(imageURL)
    .then(function(resp){ return resp.json() })
    .then(function(data){
      //get data here
      // debugger
      let imageObj = {
        "id": data.id,
        "url": data.url,
        "name": data.name,
        "like_count": data.like_count,
        "comments": []
      }
      getComments(data, imageObj)
      console.log("grabbed image:", imageObj)
      return imageObj
    })
    .then(function(image){
      showImage(image)
    })
  }

  let imageElem = document.querySelector("div#image_card > img")
  let titleH4 = document.querySelector("h4#name")
  let likeCount = document.querySelector("span#likes")
  let likeBtn = document.querySelector("button#like_button")
  let commentForm = document.querySelector("form#comment_form")
  let commentUl = document.querySelector("ul#comments")

  function showImage(image){
    imageElem.dataset.id = image.id
    imageElem.src = image.url
    titleH4.innerText = image.name
    likeCount.innerText = image.like_count
    likeBtn.dataset.id = image.id
    commentForm.dataset.id = image.id
    // debugger
    for (let i = 0; i < image.comments.length; i++) {
      const comment = image.comments[i]
      let commentLi = document.createElement("li")
      commentLi.dataset.id = comment.id
      commentLi.innerText = comment.content
      commentLi.dataset.image_id = comment.image_id
      commentLi.dataset.created_at = comment.created_at
      commentLi.dataset.updated_at = comment.updated_at
      // commentLi.append(deleteCommentBtn)
      commentUl.append(commentLi)
    }
  }

  function eventListeners(){
    likeBtn.addEventListener("click", increaseLikes)
    commentForm.addEventListener("submit", submitComment)
    // body.addEventListener("click", deleteComment)
  }

  function increaseLikes(e){
    likeCount.innerText = `${parseInt(likeCount.innerText) + 1}`
    increaseLikesDB(e)
  }

  function increaseLikesDB(e){
    let imageId = e.target.dataset.id
    fetch(`https://randopic.herokuapp.com/likes`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"image_id": imageId})
    })
  }

  function submitComment(e){
    e.preventDefault()
    let comment = e.target[0].value
    e.target[0].value = ""
    // console.log(comment)
    let commentLi = document.createElement("li")
    commentLi.innerText = comment
    commentUl.append(commentLi)
    submitCommentDB(e, comment, commentLi)
  }

  function submitCommentDB(e, comment, commentLi){
    let imageId = e.target.dataset.id
    fetch(`https://randopic.herokuapp.com/comments`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": imageId,
        "content": comment
      })
    })
    .then(function(resp){
      return resp.json()
    })
    .then(function(data){
      console.log(data)
      commentLi.append(deleteCommentBtn)
      deleteCommentBtn.dataset.id = data.id
      deleteCommentBtn.dataset.image_id = data.image_id
      deleteCommentBtn.addEventListener("click", deleteCommentDB)
    })
    // .then(function(){
    //   let newComment = document.querySelector("li[data-id][data-image_id]:last-child")
    //   commentLi.append(deleteCommentBtn)
    //   debugger
    //   deleteCommentBtn.dataset.id = newComment.dataset.id
    //   deleteCommentBtn.dataset.image_id = newComment.datsaet.image_id
    //   deleteCommentBtn.addEventListener("click", deleteCommentDB)
    // })
  }

  function deleteCommentDB(e){
    let id = e.target.dataset.id
    let image_id = e.target.dataset.image_id
    fetch(`https://randopic.herokuapp.com/comments/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // "image_id": image_id,
        "id": id
      })
    })
    // .then(function(resp){ return resp.json() })
    // .then(function(data){ console.log(data) })
  }

  fetchImage()
  eventListeners()

})
