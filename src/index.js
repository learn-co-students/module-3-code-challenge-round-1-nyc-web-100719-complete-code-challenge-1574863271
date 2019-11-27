document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4041 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`



  function fetchImg(imageId){
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(function(response){return response.json()})
    .then(function(img){
      ShowImg(img)
    })
  }


  function PersistLikes(id){
    console.log(id)
    fetch(`https://randopic.herokuapp.com/likes/`), {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_id: id })
      // chett told me to not pass in likes but it still won't persist!! :(
    }
  }

  fetchImg(imageId)

  function newcomment(comment, id){
    AddComment(comment)
    PersistComment(id)
  }

  function PersistComment(id){
    console.log(id)
    fetch(`https://randopic.herokuapp.com/comments/`), {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {image_id: id} )
      //same thing here!! QQ chett thought it should be working
    }
  }

  function ShowImg(image){
    let div = document.getElementById("image_card")
    div.innerHTML = `
      <img src="${image.url}"id="image" data-id=${image.id}>
      <h4 id="name">${image.name}</h4>
      <span>Likes:
        <span id="likes">${image["like_count"]}</span>
      </span>
      <button id="like_button" data-likes=${image["like_count"]} data-id=${image.id}>Like</button>
      <form class="form" id="comment_form">
        <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
        <button type="submit">Submit</button>
      </form>
      <ul id="comments">
      </ul>
    `
    let button = document.getElementById("like_button")
    AddEvent(button)
    function CommentFunctionality(){
      let form = document.querySelector("#comment_form")
      form.addEventListener("submit", function(e){
        e.preventDefault()
        let comment = {
          "name": e.target[0].value
        }
        newcomment(comment, image.id)
        e.target[0].vaue = ""
        form.innerHTML = `
          <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
          <input type="submit" value="Submit"/>
        `
      })
    }
    CommentFunctionality()
  }

  function AddComment(comment){
    let ul = document.getElementById("comments")
    let li = document.createElement("li")
    li.innerText = Object.values(comment)
    ul.append(li)
  }

  function AddEvent(button){
    button.addEventListener("click", function(e){
      IncreaseLikes(e)
      PersistLikes(e.target.dataset.id)
    })
  }

  function IncreaseLikes(e){
    let span = document.getElementById("likes")
    e.target.dataset.likes = parseInt(e.target.dataset.likes) + 1
    span.parentNode.innerHTML = `
    <span>Likes:
      <span id="likes">${e.target.dataset.likes}</span>
    </span>
    `
  }
  
})

