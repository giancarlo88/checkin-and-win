<?php
$thisPage = "tab";
/**
 * Default tab page
 */

require './config.php';
require './template/header.php';
require './vendor/mobiledetect/mobiledetectlib/Mobile_Detect.php';
$detect = new Mobile_Detect;

// require './template/navigation.php';


?>

	<div class="app-wrapper">
		<div>
			<div class="tab__inner">

				
				<div class="container tab__overlay">
					<h2>Check in and <span class="bolded">WIN!</span></h2>
					<p class="tab__byline"> Login below, then post a picture of your favourite Outfit item to enter the contest!
					</p>
					<a class="tab__fb-login" href="check-in.php"><img src="./assets/images/login_btn.png"></a>
				</div>




				<!--<div class="tab__container-tc-priv">
					<div class="tc">
						<a target="_blank" href="<?php echo AppConfig::get('app_terms'); ?>">Terms &amp; Conditions</a>
					</div>
					<div class="privacy">
						<a target="_blank" href="<?php echo AppConfig::get('app_privacy'); ?>">Privacy Policy</a>
					</div>
				</div>
			</div>
		</div>
	
		<!--<div class="tab__container-tc-priv-mobile">
			<div class="tc">
				<a target="_blank" href="<?php echo AppConfig::get('app_terms'); ?>">Terms &amp; Conditions</a>
			</div>
			<div class="privacy">
				<a target="_blank" href="<?php echo AppConfig::get('app_privacy'); ?>">Privacy Policy</a>
			</div> 
		</div> -->
	</div>
</div>
<?php
require './template/footer.php';
?>