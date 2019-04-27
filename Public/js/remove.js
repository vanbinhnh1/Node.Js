/*var mqtt=require("mqtt")

client.on("message", function(topic, message) {
	switch(topic) {      
		case "led1":
		{
			if("message"==0) 
				$(document).ready(function(){               
					$("#div1").load(on())
				})
			
			if("message"==1)  
				$(document).ready(function(){
					$("#div1").load(off())
				})
		}
	}
})
*/

$(document).ready(() => {
	$(document).on('click', '.s-on', () => {
		$.ajax({
			url: "/on",
			type: "POST",
			success: () => {
				on()
			},
			error: (err) => {
				console.log(err)
			}
		})
	})
	$(document).on('click', '.s-off', () => {
		$.ajax({
			url: "/off",
			type: "POST",
			success: () => {
				off()
			},
			error: (err) => {
				console.log(err)
			}
		})
	})
	/*
	$("button").click(function(){
		$("#div1").load("demo_test.txt", function(responseTxt, statusTxt, xhr){
			if(statusTxt == "success")
				alert("External content loaded successfully!");
			if(statusTxt == "error")
				alert("Error: " + xhr.status + ": " + xhr.statusText);
		});
	});
	*/
})
	const on = () => {
		$(".s-on").click(function(){
			$(".tat").hide();
		});
		$(".s-on").click(function(){
			$(".sang").show();
		});
		
	}

	const off = () => {
		$(".s-off").click(function(){
			$(".sang").hide();
		});
		$(".s-off").click(function(){
			$(".tat").show();
		})
	}


	/*
	const updateUI = (status) => {
		if (status) {
			$('.wrapper').removeClass('off').addClass('on')
			$('.switch').html('<button class="s-button off-button">OFF</button>')
		} else {
			$('.wrapper').removeClass('on').addClass('off')
			$('.switch').html('<button class="s-button on-button">ON</button>')
		}
	}
	*/
	/*
	const on = (status) => {
		if (status==true) {
			
		} else {
			$("h1").toggleClass("blue");
		}
	}
	*/