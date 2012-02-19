/**
 * This is the entry point for our JavaScript program
 */

 
$(function () {
	
	
	
	var count = 0;
	var limit = false;
	//var tweetsearch = $("#text_phrase-input")
	var s
	//$("#search_btn").click(function() {
	
	alert("hello!");
	
	$("#search_btn").click(function() {
		
		var tweetsearch = $("#text_phrase-input").val();
		
	alert("hello Jason!");
	
	
	s = new Spotter("twitter.search", 
						{q:tweetsearch, period:120},
						{buffer:true, bufferTimeout:750}
					    );
	
	
	s.register(function(tweet) {
	
	
	//alert("hello world!");
	
	//$("#tweets").append("<p>"+tweet.text+"</p>");
	
    //2. Add profile images (tweet.profile_image_url)
	
	/*var profile_image = "<img src='"+tweet.profile_image_url+"' />";
	profile_image.hide();
	$("#tweets").prepend("<p>"+profile_image+tweet.text+"</p>");
	profile_image.slideDown();*/
	//"<li style='display:none;color:blue;background-color:white;'>"
	
	
	count++;
	
		if (count === 11)
		{ if (limit === false)
			{limit = true;
			}
			count = 1;
		}
		if (limit === true)
		{
	
			$("#tweets p:gt(9)").fadeOut (100, function(){
				$("#tweets p:gt(9)").remove();
			});
		
		}
		
		
	var color;
		
	if (count % 2 === 0) {
		color = "red";
	}
	else {
		color = "blue";
	}
	var profile_image="<img src='"+tweet.profile_image_url+"' />";
	var slide = $("<p class='"+color+" id="+count+"'>"+profile_image+tweet.text+"</p>");
		slide.hide();
		$("#tweets").prepend(slide);
		slide.slideDown();
	});
	
	s.start();
	
	});
    //3. Make the tweets occur so the most recent are at the top
    //4. Make the tweets slide down
    //5. Alternate the colors or the background of the tweets
    //6. Show a maximum of 10 tweets at a time (remove old tweets from the dom)
	
	

});

