document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4048 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/` // API Set up

  const imageCard = document.getElementById("image_card")
  const imageTitleContainer = document.getElementById("name")
  const imageElement = document.getElementById("image")
  const commentUl = document.getElementById("comments") 
  const likeSpan = document.getElementById("likes")
  const likeButton = document.getElementById("like_button")
  const commentForm = document.getElementById("comment_form")
  //grabbing elements and containers
  console.log(commentForm)

  fetch(imageURL)  //fetching original Data
  .then(data => data.json())
  .then(json => parseImage(json))

  function parseImage(image){
    imageTitleContainer.innerHTML = `${image.name}`
    imageElement.src = `${image.url}`
    imageElement.dataset.id = `${image.id}`
    likeSpan.innerText = `${image.like_count}`

    image.comments.forEach(appendComments)
    
  }

  function appendComments(comments){
 
    let commentLi = document.createElement("li")
    commentLi.innerHTML = `<p>${comments.content}</p>
    <button id = ${comments.id}> Delete Comment</button>`
    commentUl.append(commentLi)
    let deleteButton = document.getElementsById(`${comments.id}`)
    console.log(deleteButton)
    deleteButton.forEach(function(deleteBtn){
      deleteBtn.addEventListener("click", deleteMe)  //this is where it's breaking sorry this code works 
    })
  }

  likeButton.addEventListener("click", function(e){ 
    let id = imageElement.dataset.id  // not dynamic I know but for the sake of time I'll grab it like this 
    newValue = parseInt(likeSpan.innerText) + 1
    likeSpan.innerText = newValue
    persistLike(id)
    //  
  })

  function persistLike(id){  
    fetch('https://randopic.herokuapp.com/likes', {
      method: "POST", 
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({image_id: `${id}`})
    })
  }

  commentForm.addEventListener('submit', function(e){
    e.preventDefault();
    let id = imageElement.dataset.id 
    newComment = {content: e.target[0].value}
    persistNewCommentData = newComment.content
    appendComments(newComment)
    persistComment(persistNewCommentData, id)
    commentForm.reset();
  })

  function persistComment(newComment, id){
    fetch('https://randopic.herokuapp.com/comments', {
      method: "POST", 
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({image_id: `${id}`,
                            content: `${newComment}`})
    }) 
  }

 

   function deleteMe(e){
     console.log(e.target.parentNode)

    
   }

   function deleteComment(comment_id){
    fetch(`https://randopic.herokuapp.com/comments/${comment_id}`, {
      method: "DELETE", 
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({message: 'comment successfully Destroyed'}) 
  })
} 








})
