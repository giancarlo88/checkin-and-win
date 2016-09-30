var mnTries = 0;

(function(root, factory) {
	window.GIS = window.GIS || factory;

})(this, (function() {

	/**
	 * Define framework object
	 *
	 * All methods, variables, values
	 * goes inside this object
	 */
	var framework = {
		version: '4.0.0',
		fbappid: '255255454870700',
		max_recipients: 150,
		exclude_ids: [],
		userid: "",
		locationName: "",
		locationCode: ""
		};


	/**
	 * Default methods call
	 */
	framework.init = function() {

		// Facebook object
		framework.facebook = new Socialmedia.Facebook({
			appid: framework.fbappid,
			callback: framework.fbCallbacks
		});

		// Twitter object
		framework.twitter = new Socialmedia.Twitter();

		// Google Plus object
		framework.gplus = new Socialmedia.GooglePlus();
	};


	/**
	 * Facebook callbacks
	 */
	framework.fbCallbacks = function(response) {

		// Setup get started user permissions
		framework.getUserPermissions(response);

		// Register form prefil
		framework.prefilRegisterForm(response);

		// Setup social sharing methods
		framework.enableSocialShare(response);

		// Setup getting locations
		//framework.getLocations(response);

		// Check In
		//framework.checkIn(response);

		//
		framework.getClosestStore(response);

		//Upload photo
		framework.uploadPhoto(response);
		// Invite friends via FB
		//framework.inviteViaEmail(response);
	};

	/**
	 * Enable social share methods
	 */
	framework.enableSocialShare = function(response) {
		var fbShareBtn = $('.ss-facebook'),
			twttrShareBtn = $('.ss-twitter');

		if (!fbShareBtn.length) return;

		// Facebook Share
		fbShareBtn.on('click', function(e) {
			var $this = $(this),
				$title = $this.data('title'),
				$link = $this.data('link'),
				$picture = $this.data('picture'),
				$caption = $this.data('caption'),
				$description = $this.data('description');

			framework.facebook.Feed({
				name: $title,
				link: $link,
				picture: $picture,
				caption: $caption,
				description: $description
			});

			e.preventDefault();
		});

	};



	/**
	 * Setup get started user permissions
	 */
	framework.getUserPermissions = function(response) {

		var getStartedBtn = $('.tab__fb-login');

		if (!getStartedBtn.length) return;

		$(document).on('click', '.tab__fb-login, .hd__register', function(e) {

			var $this = $(this);

			if (response && response.status === 'connected') {
				FB.api('/me', function(info) {
					framework.userid = info.id
					
					return self.location.href = 'check-in.php?fbid=' + framework.userid
				});
			} else {
				framework.fbLogin(function(response) {
					if (response && response.status === 'connected') {
						FB.api('/me', function(info) {
							framework.userid = info.id
							return self.location.href = 'check-in.php?fbid=' + framework.userid
						});
					}
				});
			}

			return e.preventDefault();
		});

	};

	// framework.checkIn = function(response){
	// 	$(document).on("click", ".checkIn", function() {
			
	// };

	// framework.getLocations = function(response){
	// 	if (!$(".info").length) return;
	// 			FB.api("me/tagged_places",
	// 			{
	// 				"limit":"1000"
	// 			},
	// 			function(data){
	// 				var locations = data.data.map((item) => {
	// 					return item.place.name
	// 				})			
	// 			$(".info").html("User locations: "+locations.join("; "))
	// 		if (locations.indexOf("Outfit") > -1){ //Need to change this
	// 			$(".info-success").show();
	// 		} else {
	// 			$(".info-no-checkin").show();
	// 		}
		
	// 	});
	// }
		
	framework.getClosestStore = function(response){
		if (!$(".info2").length) return;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(UserLocation);
			}
			// Default to London, UK
			else
				NearestCity(51.5074, 0.1278);
			
			// Callback function for asynchronous call to HTML5 geolocation
			function UserLocation(position) {
			NearestCity(position.coords.latitude, position.coords.longitude);
			}

			// Convert Degress to Radians
			function Deg2Rad(deg) {
			return deg * Math.PI / 180;
			}

			function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
			lat1 = Deg2Rad(lat1);
			lat2 = Deg2Rad(lat2);
			lon1 = Deg2Rad(lon1);
			lon2 = Deg2Rad(lon2);
			var R = 6371; // km
			var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
			var y = (lat2 - lat1);
			var d = Math.sqrt(x * x + y * y) * R;
			return d;
			}

			var lat = 20; // user's latitude
			var lon = 40; // user's longitude

			var cities = [
			["Outfit Charleton", 51.4888611, 0.024549600000000282, "103671223034376"],
			["Outfit Hereford", 52.0585736, -2.716745400000036, "1315587778458087"],
			["Outfit Croydon", 51.3791266, -0.1265542999999525, "125698574148059"],
			["Outfit Halfhide", 51.7206409,-0.03667880000000423, "1692924027639710"],
			["Outfit Kent", 51.35949189999999, 1.39294110000003, "734068616727732"],
			];

			function NearestCity(latitude, longitude) {
			var mindif = 99999;
			var closest;

			for (index = 0; index < cities.length; ++index) {
				var dif = PythagorasEquirectangular(latitude, longitude, cities[index][1], cities[index][2]);
				if (dif < mindif) {
				closest = index;
				mindif = dif;
				}
			}
			
			framework.locationName = [cities[closest][0]][0];
			framework.locationCode = [cities[closest][3]][0];
			$(".location").html(framework.locationName);
			$("#locationField").val(framework.locationName);
			}

			
	}

	framework.uploadPhoto = function(response){ 
		$(".confirm").on("click", function(e) {
			$("#modal1").modal("show");
		})

		$("#photo-upload").on('submit', function(e) {
			$(".submit, .no ").attr("disabled", true);
			formData = new FormData(this);
			formData.append(submit, "submit")
			console.log(formData)
        	$.ajax({
            url: "ajax_php_file.php", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function(data) // A function to be called if request succeeds
                {
                    photoUrl = "http://www.united-agency-server.co.uk/outfit/checkin_and_win/upload/"+data;
                    $(".picture-message").html(data);
			        FB.api(
  						'/photos/',
  						'POST',
  						{
							"place":framework.locationCode,
							"url": photoUrl
						},
  						function(response) {
							
      						self.location.href ="thank-you.php?fbid="+$("#fbidField").val();
 						}	
					);
				}
			})
			return e.preventDefault();
		})
	

	
    //Function to preview image after validation
        $("#file").change(function() {
            $(".message").empty(); // To remove the previous error message
            var file = this.files[0];
            var imagefile = file.type;
            var match = ["image/jpeg", "image/png", "image/jpg"];
            if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
                $('.previewing').attr('src', 'noimage.png');
                $(".message").html("<p id='error'>Please Select A valid Image File</p>" + "<h4>Note</h4>" + "<span id='error_message'>Only jpeg, jpg and png Images type allowed</span>");
                return false;
            } else {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
                
            }
        });

		function imageIsLoaded(e) {
			$("#file").css("color", "green");
			$('.image_preview').css("display", "block");
			$('.previewing').attr('src', e.target.result);
			$('.previewing').attr('width', '50px');
			$('.previewing').attr('height', '50px');
			$('.confirm').attr('disabled', false);
		};
				
	}

	/**
	 * Register form prefil
	 */
	framework.prefilRegisterForm = function(response) {

		if (!$('[id="photo-upload"]').length) return;
		if (response && response.status === 'connected') {
			var formFields = {
				firstNameField: $('[id=firstNameField]'),
				lastNameField: $('[id=lastNameField]'),
				emailField: $('[id=emailField]'),
				//phoneField: $('[id=phoneField]'),
				fbidField: $('[id=fbidField]'),
				//num1: $('[id=num1]'),
				//num2: $('[id=num2]'),
				//num3: $('[id=num3]'),
				//num4: $('[id=num4]'),
				//num5: $('[id=num5]'),
				//num6: $('[id=num6]'),
				submitBtn: $('[id=yes]')
			};

			FB.api('/me?fields=first_name,last_name,email', function(info) {
				formFields.firstNameField.val(info.first_name);
				formFields.lastNameField.val(info.last_name);
				formFields.emailField.val(info.email);
				formFields.fbidField.val(info.id);
			});

			return framework.validateRegisterForm(formFields);
		} else {
			framework.fbLogin(function(response) {
				if (response && response.status === 'connected') {
					return framework.getLocations(response);
				} else {
					self.location.href = 'tab.php?auth=0'
				}
			});
		}
	};


	/**
	 * FB Login helper method
	 */
	framework.fbLogin = function(callback) {
		return FB.login(callback, {
			scope: 'email,user_tagged_places,publish_actions',
			return_scopes: true
		});
	};



	/**
	 * Register form validation
	 */



	framework.validateRegisterForm = function(formFields) {
	 	formFields.submitBtn.on('click', function(e) {
	// 		var numbers = {
	// 			1: formFields.num1.val(),
	// 			2: formFields.num2.val(),
	// 			3: formFields.num3.val(),
	// 			4: formFields.num4.val(),
	// 			5: formFields.num5.val(),
	// 			6: formFields.num6.val()
	// 		}

	// 		var combinedNumbers = numbers[1].concat(numbers[2], numbers[3], numbers[4], numbers[5], numbers[6]);

	 		if (formFields.firstNameField.val() == '') {
				alert('First Name is required.');
				formFields.firstNameField.focus();
			} else if (formFields.firstNameField.val().length > 100) {
				alert('Please enter a valid first name.');
				formFields.firstNameField.focus();
			} else if (formFields.lastNameField.val() == '') {
				alert('Last name is required.');
				formFields.lastNameField.focus();
			} else if (formFields.lastNameField.val().length > 100) {
				alert('Please enter a valid last name.');
				formFields.lastNameField.focus();
			} else if (formFields.emailField.val() == '') {
				alert('E-mail address is required.');
				formFields.emailField.focus();
			} else if (!framework.isValidEmail(formFields.emailField.val()) || (formFields.emailField.val().length > 255)) {
				alert('Please enter a valid e-mail address.');
				formFields.emailField.focus();
			}
	// 		else if (combinedNumbers.length != 0 && combinedNumbers.length != 6) {
	// 			alert("Please enter the complete code.")
	// 		} else if (combinedNumbers.length != 0 && (!$.isNumeric(numbers[1]) || !$.isNumeric(numbers[2]) || !$.isNumeric(numbers[3]) || !$.isNumeric(numbers[4]) || !$.isNumeric(numbers[5]) || !$.isNumeric(numbers[6]))) {
	// 			alert("Please enter numbers only.")
	// 		} else if (combinedNumbers.length == 6 && combinedNumbers !== "311016" && mnTries < 3) {
	// 			mnTries++;
	// 			if (mnTries >= 3) {
	// 				return true
	// 			} else {
	// 				alert("Sorry, your code is incorrect. Try again!");
	// 			}
	// 		} else if (combinedNumbers == "311016") {
	// 			scrollY(0);
				
	// 			setTimeout(function() {
	// 				self.location.href = "./thank-you.php"
						
	// 			}, 1000);
	//		return e.preventDefault;
			 else {
				return e.preventDefault;
			}
			return e.preventDefault();
		});
	}
	// 	var unlikeWarning = $('.reg__unlike-warning');
	// 	if (unlikeWarning.length) {
	// 		FB.Event.subscribe('edge.remove', function(url, el) {
	// 			unlikeWarning.fadeIn();
	// 		});

	// 		FB.Event.subscribe('edge.create', function(url, el) {
	// 			if (!unlikeWarning.is(':hidden')) {
	// 				unlikeWarning.fadeOut();
	// 			}
	// 		});
	// 	}
	// };


	/**
	 * Email validation
	 */
	framework.isValidEmail = function(email) {
		if (typeof email !== 'string' || email === '')
			return false;

		var has_at = new RegExp(/@/);
		var has_dot = new RegExp(/\./);
		var dot_at_end = new RegExp(/\./);

		return (has_at.test(email) && has_dot.test(email) && !dot_at_end.test(email.substr(email.length - 1)));
	};


	/**
	 * Return all methods as single object
	 */
	return framework;

})());

/**
 * Initiate all default methods
 */
$(document).ready(function() {
	GIS.init();
});

/**
 * Event Handlers
 */

// $(".reg__mystery-number-form").on("focus", function() {
// 	if ($(this).val() === "" && $(this).attr("placeholder", "?")) {
// 		$(this).removeAttr("placeholder");
// 	}
// })

// $(".reg__mystery-number-form").on("focusout", function() {
// 	if ($(this).val() === "" && !$(this).attr("placeholder", "?")) {
// 		$(this).attr("placeholder", "?")
// 	}
// })

// $(".reg__mystery-number-form").keyup(function() {
// 	if (this.value.length == this.maxLength) {
// 		$(this).next('.reg__mystery-number-form').focus();
// 	}
// });

