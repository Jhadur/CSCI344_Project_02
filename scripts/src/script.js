/**
 * This is the entry point for our JavaScript program
 */

function main1() {
  //alert("hi there, and welcome to my page!");
}  

function addParagraph()  {
  //$("body").append("<p>WHAT'S GOOD!!!</p>");
  var p = $("<p>WHAT'S GOOD!!!</p>");
  p.hide();
  $("body").append(p);
  //p.fadeIn();
  p.slideDown();

}

function addAnswer() {
	var sum = 0;
		for (var i = 1; i < 1000; i++){
            if (i%3==0 || i%5==0) {
				sum+=i;
			}
		}
	$("#result").append(sum + " ");
	var sum = $("<p>" + sum + " </p>");
	sum.hide();
	$("body").append(sum);
	sum.slideDown();
}

function addAnswer2() {
	var sum2 = 0;
		for (var i = 1; i < 1000; i++){
            sum2=sum2+i;
		}
	$("#result2").append(sum2 + " ");
	var sum2 = $("<p>" + sum2 + " </p>");
	sum2.hide();
	$("body").prepend(sum2);
	sum2.fadeIn();
}

function addHeader() {
	$("body").prepend("<h1>New Header</h1>");
}

main1();

function main() {
    //your code goes here
    //alert("hello world!");


    //your tasks

    //1. Create a spotter and get it to insert tweets into the DOM
	
	var count = 0;
	var limit = false;
	var s = new Spotter("twitter.search", 
						{q: "#unca", period:120},
						{buffer:true, bufferTimeout:750}
					    );
					   
	s.register(function(tweet) {
	
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
	
    //3. Make the tweets occur so the most recent are at the top
    //4. Make the tweets slide down
    //5. Alternate the colors or the background of the tweets
    //6. Show a maximum of 10 tweets at a time (remove old tweets from the dom)

}


main();
