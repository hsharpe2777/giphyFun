var topics = [];


//when you click the submit button...
$("#submit").click(function dothis(){

//grab the entered text from the texbox
var buttonName = $("#textbox").val().trim();

//add button to "topics" array
topics.push(buttonName);

//call new button function
newButton();


	//create new button for entered topic
	function newButton(){
		$("#buttonDiv").append(" ");
		var newBtn = $("<button>");
		newBtn.addClass("btn btn-default");
		newBtn.text(buttonName);
		$("#buttonDiv").append(newBtn);

		//when button is clicked...
		newBtn.click(function addGiphy(){

				//query api for giphys with the buttonName as the subject
				var queryUrl = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + buttonName;

				$.ajax({

					url: queryUrl,
					method: "GET"
				})


				//when the query is complete...
				.done(function(response){
			 	var imgUrl = response.data.image_original_url;
			 	//add giphy
			 	var newImg = $("<img>");
			 	newImg.attr("src", imgUrl);
			 	newImg.attr("data-animate", imgUrl);
			 	newImg.attr("data-still", response.data.fixed_height_small_still_url);
			 	newImg.attr("data-state", "animate");
			 	newImg.addClass("newImg");
			 	//create on click event "pause" for giphy
		
			 	//add giphy to "giphy" div
			 	$("#giphyDiv").append(newImg);

					$(".newImg").on("click", function pause() {
					 		var animationState = $(this).attr("data-state");
					 		console.log(animationState);


					 		//if the giphy is animated...
					 		if (animationState === "animate"){
					 			//change the state to "still"
					 			$(this).attr("src", $(this).attr("data-still"));
					 			$(this).attr("data-state", "still");

					 		}

					 		else{
					 			//if giphy is paused/still change the state to animate
					 			$(this).attr("src", $(this).attr("data-animate"));
					 			//change the state to "animate"
					 			$(this).attr("data-state", "animate");
					 		}
				 	})
				})
		
		})
	}

	

})

