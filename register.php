<?php


/**
 * Default tab page
 */
$thisPage = "register";
require './config.php';
require './template/ValidateFormModel.php';
require './template/header.php';
// require './template/navigation.php';

?>

<div class = "api-container">
<button class="api">GET LOCATIONS</button>      
</div>
<!--<div id="instafeed">
</div>
<div class="app-wrapper">
	<div class="reg__bg-wrapper">
		<div class = "reg__registration">
			<div class="reg__instructions">
				<div class = "steps">
					<img src = "./assets/images/enterdetails1.png"> <span class = "step step1text">PLEASE LIKE OUR FACEBOOK PAGE.</span> 
						<div class = "reg__button-container">
							<span class="btn-fb-like">
								<div class="fb-like" data-href="https://facebook.com/thomascook" data-layout="button" data-action="like" data-show-faces="false" data-share="false">
								</div>
							</span>
							<dd class="reg__unlike-warning">You have unliked our Facebook page, please Like again.</dd>
						</div>
						<img class = "step2" src = "./assets/images/enterdetails2.png"> <span class = "step">CONFIRM YOUR DETAILS:
						</span> 
						
				</div>
			</div>
				
			<form id="registerForm" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="POST" class="form-horizontal" role="form">
				<div class = "reg__form-container">	
						<input type="text" name="first_name" id="firstNameField" placeholder="First Name" class="reg__form">
						<input type="text" name="last_name" id="lastNameField" placeholder="Last Name" class="reg__form">
							<input type="text" name="email" id="emailField" placeholder="Email" class="reg__form">
			
					<!--<div class="form-group">
						<label class="sr-only" for="emailField">Phone</label>
						<div class="col-sm-6 col-sm-offset-3">
							<input type="text" name="phone" id="phoneField" placeholder="Phone" class="form-control">
						</div>
					</div> 
						<p class = "reg__mn-message">Cracked the <span class = "bold">code</span> already? Insert it below:</p>
						<div class = "reg__mystery-numbers">
							<input id = "num1" class = "reg__mystery-number-form" type = "text" pattern="[0-9]" placeholder = "?" maxlength = "1" >
							<input id = "num2" class = "reg__mystery-number-form" type = "text" pattern="[0-9]" placeholder = "?" maxlength = "1" >
							<input id = "num3" class = "reg__mystery-number-form" type = "text" pattern="[0-9]" placeholder = "?" maxlength = "1"  >
							<input id = "num4" class = "reg__mystery-number-form" type = "text" pattern="[0-9]" placeholder = "?" maxlength = "1" >
							<input id = "num5" class = "reg__mystery-number-form" type = "text" pattern="[0-9]" placeholder = "?" maxlength = "1" >
							<input id = "num6" class = "reg__mystery-number-form" type = "text" pattern="[0-9]" placeholder = "?" maxlength = "1" >	
						</div>
					</div>	
						<div class = "reg__checkbox-container">
							<div class="reg__checkbox">
								<label>
									<input type="checkbox" checked name="dubaiparks_subscription" id="dubaiparksSubscriptionField"> I want to receive emails from Dubai Parks and Resorts
								</label>
							</div>
							<div class="reg__checkbox">
								<label>		
									<input type="checkbox" checked name="tc_subscription" id="tcSubscriptionField"> I want to sign up to receive marketing emails from Thomas Cook. 
									We will not pass on your data to third parties for marketing. 
									<a class = "txt-highlight" href="https://www.thomascook.com/privacy-policy/" target="_blank">View Privacy Policy</a>
								</label>
							</div>
						</div>
					</div>
				

					<div class = "reg__btn-container">
						<div class="text-center">
							<input type="text" class="app-cabacha" name="cabacha_<?php echo sha1(time()); ?>" value="">
							<input type="hidden" name="cabacha" value="cabacha_<?php echo sha1(time()); ?>">
							<input type="hidden" name="fbid" value="" id="fbidField">
							<input type="submit" name="submit" value="Confirm" id="reg__submitBtn" class="button">

						</div> 
					</form>
					</div>
					<div class="reg__container-tc-priv">
				<div class="tc">
					<a target="_blank" href="<?php echo AppConfig::get('app_terms'); ?>">Terms &amp; Conditions</a>
				</div>

				<div class="privacy">
					<a target="_blank" href="<?php echo AppConfig::get('app_privacy'); ?>">Privacy Policy</a>
				</div>
		</div>
					</div>
				
				

			</div>
			
			
        </div>
</div>-->


	 <?php require './template/footer.php'; ?> 
