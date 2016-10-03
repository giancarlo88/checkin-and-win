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
			<div class="thumbnails">  
				<div id="lightSlider">

<?php
$dir = "./upload/";
$files = scandir($dir, 1); 
for ($i=3; $i<24; $i++) { //Take the latest 20 files from the upload directory.

	$extension = pathinfo($files[$i], PATHINFO_EXTENSION);
	if ($extension == "jpg" || $extension == "jpeg" || $extension == "png") {

	/**
	 *	Fix for rotation issues when displaying images in the gallery:
	 *	Images with the "fb" prefix are not auto-rotated when they are uploaded.
	 *	These should be used when uploading to Facebook or when displayed on a mobile device. 
	 *	On desktops, the images need to be rotated as the browser won't read the EXIF orientation data when 
	 *	the image is in an <img> tag. They will otherwise appear incorrectly oriented when uploaded from a mobile browser.
	 *	The other alternative to solve the issue is the "-image-orientation: from-image" CSS declaration, but this only works on Firefox.
	 */
		if (! $detect->isMobile() ){
				if (substr($files[$i], 0, 2) !== "fb"){
					echo "<li><img class='slideshow-image' src='upload/".$files[$i]."'></li>";
					}
			} else {
				if (substr($files[$i], 0, 2) == "fb"){ //**This means that mobile browswers will only load jpg files to the gallery
					echo "<li><img class='slideshow-image' src='upload/".$files[$i]."'></li>";
				} 
			}
		}
	}		
?>

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
	
		<div class="tab__container-tc-priv-mobile">
			<div class="tc">
				<a target="_blank" href="<?php echo AppConfig::get('app_terms'); ?>">Terms &amp; Conditions</a>
			</div>
			<div class="privacy">
				<a target="_blank" href="<?php echo AppConfig::get('app_privacy'); ?>">Privacy Policy</a>
			</div> 
		</div> -->
	</div>
</div>
<script type="text/javascript" src="assets/js/slideshow.js"></script>

<?php require './template/footer.php'; ?>