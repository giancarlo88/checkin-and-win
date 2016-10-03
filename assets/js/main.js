(function (root, factory) {
	window.GIS = window.GIS || factory;

})(this, (function () {

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
	framework.init = function () {

		// Facebook object
		framework.facebook = new Socialmedia.Facebook({
			appid: framework.fbappid,
			callback: framework.fbCallbacks
		});

		// Twitter object
		framework.twitter = new Socialmedia.Twitter();
	};


	/**
	 * Facebook callbacks
	 */
	framework.fbCallbacks = function (response) {

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

		// Store Locator
		framework.getClosestStore(response);

		// Upload photo
		framework.uploadPhoto(response);
		
		// Invite friends via FB
		//framework.inviteViaEmail(response);
	};

	/**
	 * Enable social share methods
	 */
	framework.enableSocialShare = function (response) {
		var fbShareBtn = $('.ss-facebook'),
			twttrShareBtn = $('.ss-twitter');

		if (!fbShareBtn.length) return;

		// Facebook Share
		fbShareBtn.on('click', function (e) {
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
	framework.getUserPermissions = function (response) {

		var getStartedBtn = $('.tab__fb-login');

		if (!getStartedBtn.length) return;

		$(document).on('click', '.tab__fb-login, .hd__register', function (e) {

			var $this = $(this);

			if (response && response.status === 'connected') {
				FB.api('/me', function (info) {
					framework.userid = info.id
					return self.location.href = 'check-in.php?fbid=' + framework.userid
				});
			} else {
				framework.fbLogin(function (response) {
					if (response && response.status === 'connected') {
						FB.api('/me', function (info) {
							framework.userid = info.id
							return self.location.href = 'check-in.php?fbid=' + framework.userid
						});
					}
				});
			}
			return e.preventDefault();
		});

	};

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

	framework.getClosestStore = function (response) {
		if (!$(".upload-info").length) return;
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

		var stores = [
			["Outfit Greenwich", 51.4888611, 0.024549600000000282, "103671223034376"],
			["Outfit Hereford", 52.0585736, -2.716745400000036, "1315587778458087"],
			["Outfit Croydon", 51.3791266, -0.1265542999999525, "125698574148059"],
			["Outfit Halfhide", 51.7206409, -0.03667880000000423, "1692924027639710"],
			["Outfit Kent", 51.35949189999999, 1.39294110000003, "734068616727732"],
			["Outfit Slough", 51.51983540000001, -0.6316656000000194, "204941969525415"]
		];

		function NearestCity(latitude, longitude) {
			var mindif = 99999;
			var closest;

			for (index = 0; index < stores.length; ++index) {
				var dif = PythagorasEquirectangular(latitude, longitude, stores[index][1], stores[index][2]);
				if (dif < mindif) {
					closest = index;
					mindif = dif;
				}
			}

			framework.locationName = [stores[closest][0]][0];
			framework.locationCode = [stores[closest][3]][0];
			$(".location").html(framework.locationName);
			$("#locationField").val(framework.locationName);
		}
	}

	framework.uploadPhoto = function (response) {
		$(".confirm").on("click", function (e) {
			$("#modal1").modal("show");
		})

		// Animated CSS graphic
		var loading = `<div class="modal-loading"> 
							<div class="spinner">
								<div class="rect1"></div>
								<div class="rect2"></div>
								<div class="rect3"></div>
								<div class="rect4"></div>
								<div class="rect5"></div>
							</div>
						</div>`

		$("#photo-upload").on('submit', function (e) {
			$(".modal-body").html(loading);
			$(".submit, .no").attr("disabled", true);
			formData = new FormData(this);
			formData.append(submit, "submit")
			$.ajax({
				url: "lib/ajax_php_file.php", // Url to which the request is send
				type: "POST", // Type of request to be send, called as method
				data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
				contentType: false, // The content type used when sending data to the server.
				cache: false, // To unable request pages to be cached
				processData: false, // To send DOMDocument or non processed data file it is set to false
				success: function (data) // A function to be called if request succeeds
				{
					photoUrl = "http://www.united-agency-server.co.uk/outfit/checkin_and_win/upload/" + data;
					$(".picture-message").html(data);
					FB.api(
						'/photos/',
						'POST',
						{
							"place": framework.locationCode,
							"url": photoUrl
						},
						function (response) {
							self.location.href = "thank-you.php?fbid=" + $("#fbidField").val();
						}
					);
				}
			})
			return e.preventDefault();
		})

		//Function to preview image
        $("#file").change(function () {
            $(".message").empty(); // To remove the previous error message
			$(".previewing").attr("src", "");
            var file = this.files[0];
            var imagefile = file.type;
            var match = ["image/jpeg", "image/png", "image/jpg"];
            if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
                //$('.previewing').attr('src', 'noimage.png');
                $(".message").html("<p id='error'>Invalid image. Please use either .png or .jpg format.</p>")
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
			$('.confirm').attr('disabled', false);
		};

	}

	/**
	 * Register form prefil
	 */
	framework.prefilRegisterForm = function (response) {

		if (!$('[id="photo-upload"]').length) return;
		if (response && response.status === 'connected') {
			var formFields = {
				firstNameField: $('[id=firstNameField]'),
				lastNameField: $('[id=lastNameField]'),
				emailField: $('[id=emailField]'),
				fbidField: $('[id=fbidField]'),
				submitBtn: $('[id=yes]')
			};

			FB.api('/me?fields=first_name,last_name,email', function (info) {
				formFields.firstNameField.val(info.first_name);
				formFields.lastNameField.val(info.last_name);
				formFields.emailField.val(info.email);
				formFields.fbidField.val(info.id);
			});

			return framework.validateRegisterForm(formFields);
		} else {
			framework.fbLogin(function (response) {
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
	framework.fbLogin = function (callback) {
		return FB.login(callback, {
			scope: 'email,user_tagged_places,publish_actions',
			return_scopes: true
		});
	};



	/**
	 * Register form validation
	 */
	framework.validateRegisterForm = function (formFields) {
		
		formFields.submitBtn.on('click', function (e) {
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
			} else {
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
	framework.isValidEmail = function (email) {
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
$(document).ready(function () {
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

