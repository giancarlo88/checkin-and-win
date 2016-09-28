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
		userid: ""
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
		framework.getLocations(response);

		// Invite friends via FB
		//framework.inviteViaFacebook(response);

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
					console.log(framework.userid)
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

	framework.getLocations = function(response){
		if (!$(".info").length) return;
				FB.api("me/tagged_places", function(data){
			var locations = data.data.map((item) => {
			return item.place.name})
			nextLink = data.paging.next
			$(".info").html(locations)
			if (locations.indexOf("Outfit") > -1){
				$(".info-success").show();
			} else {
				$(".info-no-checkin").show();
			}
		
		});
	}
		

	/**
	 * Register form prefil
	 */
	framework.prefilRegisterForm = function(response) {

		if (!$('[id=registerForm]').length) return;
		if (response && response.status === 'connected') {
			var formFields = {
				firstNameField: $('[id=firstNameField]'),
				lastNameField: $('[id=lastNameField]'),
				emailField: $('[id=emailField]'),
				phoneField: $('[id=phoneField]'),
				fbidField: $('[id=fbidField]'),
				num1: $('[id=num1]'),
				num2: $('[id=num2]'),
				num3: $('[id=num3]'),
				num4: $('[id=num4]'),
				num5: $('[id=num5]'),
				num6: $('[id=num6]'),
				submitBtn: $('[id=reg__submitBtn]')
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
		console.log("login")
		return FB.login(callback, {
			scope: 'email,user_tagged_places',
			return_scopes: true
		});
	};



	/**
	 * Register form validation
	 */



	framework.validateRegisterForm = function(formFields) {
		formFields.submitBtn.on('click', function(e) {
			var numbers = {
				1: formFields.num1.val(),
				2: formFields.num2.val(),
				3: formFields.num3.val(),
				4: formFields.num4.val(),
				5: formFields.num5.val(),
				6: formFields.num6.val()
			}

			var combinedNumbers = numbers[1].concat(numbers[2], numbers[3], numbers[4], numbers[5], numbers[6]);

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
			else if (combinedNumbers.length != 0 && combinedNumbers.length != 6) {
				alert("Please enter the complete code.")
			} else if (combinedNumbers.length != 0 && (!$.isNumeric(numbers[1]) || !$.isNumeric(numbers[2]) || !$.isNumeric(numbers[3]) || !$.isNumeric(numbers[4]) || !$.isNumeric(numbers[5]) || !$.isNumeric(numbers[6]))) {
				alert("Please enter numbers only.")
			} else if (combinedNumbers.length == 6 && combinedNumbers !== "311016" && mnTries < 3) {
				mnTries++;
				if (mnTries >= 3) {
					return true
				} else {
					alert("Sorry, your code is incorrect. Try again!");
				}
			} else if (combinedNumbers == "311016") {
				scrollY(0);
				
				setTimeout(function() {
					self.location.href = "./thank-you.php"
						
				}, 1000);
				return e.preventDefault;
			} else {
				return e.preventDefault;
			}
			return e.preventDefault();
		});

		var unlikeWarning = $('.reg__unlike-warning');
		if (unlikeWarning.length) {
			FB.Event.subscribe('edge.remove', function(url, el) {
				unlikeWarning.fadeIn();
			});

			FB.Event.subscribe('edge.create', function(url, el) {
				if (!unlikeWarning.is(':hidden')) {
					unlikeWarning.fadeOut();
				}
			});
		}
	};


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

$(".reg__mystery-number-form").on("focus", function() {
	if ($(this).val() === "" && $(this).attr("placeholder", "?")) {
		$(this).removeAttr("placeholder");
	}
})

$(".reg__mystery-number-form").on("focusout", function() {
	if ($(this).val() === "" && !$(this).attr("placeholder", "?")) {
		$(this).attr("placeholder", "?")
	}
})

$(".reg__mystery-number-form").keyup(function() {
	if (this.value.length == this.maxLength) {
		$(this).next('.reg__mystery-number-form').focus();
	}
});

