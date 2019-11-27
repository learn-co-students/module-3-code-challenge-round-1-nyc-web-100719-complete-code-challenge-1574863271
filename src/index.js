document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4047 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  function fetchData (){
    fetch("https://randopic.herokuapp.com/images/4047")
    .then(function (resp){ return resp.json()})
    .then(function (data){renderData(data)})
  }
  fetchData()


  let divContainer = document.getElementsByClassName("container")[0]
  
  // console.log(imageCard)

  function renderData(data) {
    let imageCard = document.getElementById("image_card")
    let commValues = Object.values(data.comments)
    console.log(commValues)

    console.log(data.comments)
    let comments = data.comments

    //had to iterate through the array of comments, accessed property of content
    comments.forEach(function(c){
      console.log(c.content) 
    })
    
    imageCard.innerHTML = `
            <img src=${data.url} id="image" data-id=""/>
            <h4 id="name">${data.name}</h4>
            <span>Likes:
              <span id="likes">${data.like_count}</span>
            </span>
            <button id="like_button">Like</button>
            <form id="comment_form">
              <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
              <input type="submit" value="Submit"/>
            </form>
            <ul id="comments">
                 <li> Comments Here! (see code for more)  </li>
            </ul> 
    `
      //return to comments later 



            

        divContainer.append(imageCard)


      //grab like button 
      // add event listener
      //conditional for if clicked, likes counter ++
      //change innerHTML/text to reflect data.likes
      let likeBtn = document.getElementById("like_button")
      
      likeBtn.addEventListener("click", function(e){
        let likesText = document.querySelector("#image_card > span") 
        let like = data.like_count

        if (e.target === likeBtn) {
          data.like_count ++ 
          likesText.innerText = `Likes ${data.like_count}`
        }

        persistLike(data)


      })//end event listener 


      //post 
      function persistLike (data){
        fetch(likeURL, {
          method: "POST", 
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: data.id,
            "image_id": 4047,
            likes: data.like_count
        }) //put in key value pairs 

        })//end fetch 



      }




  }//end render data

  











})//end DOM
