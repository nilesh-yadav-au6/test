var formSelector = document.querySelector("form");

var resultList = document.querySelector(".resultlist");

var loadingText = document.querySelector(".loader")

var resultList1 = document.querySelector(".detaills");

var homeButton = document.querySelector(".home");


function fetchApi (searchQuery){

    loadingText.style.display = 'block';
   return fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchQuery}`)
    .then(function(res){
        return res.json();
    })
    .then(function(resJason){
        console.log(resJason)
       return resJason
    })
    .catch(function(err){
        console.log(err);
    })

}



formSelector.addEventListener("submit" , function(event){

    event.preventDefault();

    var inputValue = event.target.search.value;
    console.log(inputValue)
    fetchApi(inputValue)
    .then(function(response) {
            return response.recipes;   
    })
    .then(function(resRec) {
        console.log(resRec)
        return resRec;
        
       })
    .then(function (recipesList) { 

        var output = " ";

        console.log(recipesList.length)
        if(recipesList.length == 0){
            var h3Element = document.createElement("h3");
            h3Element.innerText = "Not Found"
            resultList.insertAdjacentElement("beforeend",h3Element);
        }else{

            loadingText.style.display = 'none';
        for ( i of recipesList){

            output += `

                <div class="card col-md-3 card-css" style="width: 18rem; style="margin: 10px 5px;">
                <img src="${i.image_url}"  style="width: 250px; height: 250px;">
                <div class="card-body card-body-css">
                <h5>${i.title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a onclick="itemSelected('${i.recipe_id}')" class="btn btn-primary" href="#">Cuisine Details</a>
                </div>
                </div>
                `
               
        }
      
        resultList.innerHTML = output
    }
     })

     resultList1.innerHTML = " "
     document.querySelector("#inputText").value = " "
})

function itemSelected(id){
    sessionStorage.setItem('itemId', id);
    window.location = 'index.html';
    return false;
  }


  function recipe(){

    
    var itemId = sessionStorage.getItem('itemId');

    console.log(itemId)
  
     fetch(`https://forkify-api.herokuapp.com/api/get?rId=+${itemId}`)
      .then(function(response) {
        return response.json();
        
      })
      .then(function(responsejson) {
            console.log(responsejson)

            var item = responsejson.recipe.ingredients;

            console.log(item)

      var output =`


          <div class="col-md-4">
            <img src="${responsejson.recipe.image_url}" class="thumbnail" width="300px" height="300px">
            <a class="nav-link home" href="#">ADD FAVORITE <span class="sr-only">(current)</span></a>
            <ul class="list-group">
            <li class="list-group-item"> <strong>Publisher:  </strong> ${responsejson.recipe.publisher}</li>
            <li class="list-group-item"> <strong>Social Rank:  </strong> ${responsejson.recipe.social_rank}</li>
            <li class="list-group-item"> <strong>Publisher URL:  </strong> ${responsejson.recipe.publisher_url}</li>
           
            </ul>
          </div>
         <div class="col-md-8">
             <h2>${responsejson.recipe.title}</h2>
             <ul class="list-group">
               <h3 class="list-group-item">Ingredients</h3>
               <li class="list-group-item"> ${item[0]}</li>
               <li class="list-group-item">${item[1]}</li>
               <li class="list-group-item"> ${item[2]}</li>
               <li class="list-group-item"> ${item[3]}</li>
               <li class="list-group-item"> ${item[4]}</li>
               <li class="list-group-item"> ${item[5]}</li>
               <li class="list-group-item">${item[6]}</li>
               <li class="list-group-item">${item[7]}</li>
               <li class="list-group-item">${item[8]}</li>
               <li class="list-group-item">${item[9]}</li>
               <li class="list-group-item">${item[10]}</li>
        
             </ul>
          </div>
        
      `;

      resultList1.innerHTML = output
      document.querySelector(".detaills") = " "
      })
      .catch((err) => {
        console.log(err);
      });

  
  }
  
homeButton.addEventListener("click",function(){

    resultList.innerHTML = " ";
    resultList1.innerHTML = " "

})

