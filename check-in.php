<?php


/**
 * Default tab page
 */
$thisPage = "checkIn";
require './config.php';
//require './template/ValidateFormModel.php';
require './template/header.php';
// require './template/navigation.php';

?>
	<!--<div class = "info"></div>-->
	<div class="app-wrapper">
		<form id="photo-upload" class="photo-upload form-container" name="photo-upload" method="post" enctype="multipart/form-data">
			<div class="info2">Store location:
				<span class="location">
				<div class="spinner">
					<div class="rect1"></div>
					<div class="rect2"></div>
					<div class="rect3"></div>
					<div class="rect4"></div>
					<div class="rect5"></div>
				</div>
			</span><br>
			</div>
			<label>1. Open a picture to upload:</label><br>
			<input class="" id="file" type="file" name="file">
			<img class="previewing"><br>
			<label>2. Confirm your details:</label>
			<input type="hidden" class="app-cabacha" name="cabacha_<?php echo sha1(time()); ?>" value="">
			<input type="hidden" name="cabacha" value="cabacha_<?php echo sha1(time()); ?>">
			<input type="hidden" name="fbid" value="" id="fbidField">
			<input type="hidden" name = "location" id="locationField" placeholder="location" class="reg__form">
			<div class="form-container">
				<input type="text" name="first_name" id="firstNameField" placeholder="First Name" class="reg__form">
				<input type="text" name="last_name" id="lastNameField" placeholder="Last Name" class="reg__form">
				<input type="text" name="email" id="emailField" placeholder="Email" class="reg__form">
				<div class="reg__checkbox-container">
					<div class="reg__checkbox">
						<label>
									<input type="checkbox" checked name="outfit_subscription" id="outfit_SubscriptionField"> I want to receive emails from Outfit
								</label>
					</div>
					<!--<div class="reg__checkbox">
						<label>		
									<input type="checkbox" checked name="tc_subscription" id="tcSubscriptionField"> I want to sign up to receive marketing emails from Thomas Cook. 
									We will not pass on your data to third parties for marketing. 
									<a class = "txt-highlight" href="https://www.thomascook.com/privacy-policy/" target="_blank">View Privacy Policy</a>
								</label> -->
					</div>
					<label>3. Click below to upload the photo of your fave Outfit item to Facebook!</label>
			<input type="button" class="confirm btn" value="Upload" disabled>
			<div id="modal1" data-backdrop="static" class="scr__modal modal fade" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						
						<div class="modal-body">
							<img class="previewing" src="">
							<p>You're about to upload this photo to Facebook. Is that ok?</p>
						</div>
						<div class="modal-footer">
							<input type="submit" name="submit" id="submit" class="btn button submit" value="Yes"></input>
							<button class="btn no button" data-dismiss="modal">No</button>
		</form>
		</div>
		</div>
		<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
	</div>






	<!--<div class = "info-no-checkin">
<p>Sorry, we couldn't find your check-in at an Outfit store. Please try again.</p>


</div> -



	<div class = "info-success">
		<p>Great! We've registered your check-in! Please fill out the form below to enter the contest</p>

	<div class="reg__bg-wrapper">
		<div class = "reg__registration">
			<div class="reg__instructions">
				<!--<div class = "steps">
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
		</div>
			<form id="registerForm" action="<?php echo htmlentities($_SERVER['PHP_SELF']); ?>" method="POST" class="form-horizontal" role="form">
			
				

					<div class = "reg__btn-container">
					
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
		-->
	</div>


	<?php require './template/footer.php'; ?>