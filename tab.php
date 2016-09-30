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
function autoRotateImage($image) {
    $orientation = $image->getImageOrientation();
    switch($orientation) {
        case imagick::ORIENTATION_BOTTOMRIGHT:
            $image->rotateimage("#000", 180); // rotate 180 degrees
        break;

        case imagick::ORIENTATION_RIGHTTOP:
            $image->rotateimage("#000", 90); // rotate 90 degrees CW
        break;

        case imagick::ORIENTATION_LEFTBOTTOM:
            $image->rotateimage("#000", -90); // rotate 90 degrees CCW
        break;
    }
}
for ($i=3; $i<20; $i++) {
	$dir = "./upload/";
	$files = scandir($dir, 1);
	// $temporary = explode(".", $files[$i]);
    // $file_extension = end($temporary);
	// if ($file_extension === "jpeg" || $file_extension === "jpg") { 
	// $image = new Imagick("./upload/".$files[$i]);
	// $image->setImageCompressionQuality(20);
	// autoRotateImage($image);
	// $image->writeImage("./upload/".$files[$i]."_r"); 
	// echo "<li><img class='slideshow-image' src='upload/".$image."'></li>";
	// } else {
	echo "<li><img class='slideshow-image' src='upload/".$files[$i]."'></li>";
	}
	?>
      <!--<li>
          <img src="upload/<?php echo $files[3]?>">
      </li>
       <li>
          <img src="upload/<?php echo $files[3]?>">
      </li>
	    <li>
          <img src="upload/<?php echo $files[3]?>">
      </li>
	    <li>
          <img src="upload/<?php echo $files[3]?>">
      </li>
	    <li>
          <img src="upload/<?php echo $files[3]?>">
      </li>
	    <li>
          <img src="upload/<?php echo $files[3]?>">
      </li>
	   <li>
          <img src="upload/<?php echo $files[3]?>">
      </li>
	    <li>
          <img src="upload/<?php echo $files[3]?>">
      </li>
		<li>
          <img src="upload/<?php echo $files[3]?>">
      </li>-->
</ul>
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
<script type="text/javascript" src="assets/js/slideshow.js"></script>

<?php require './template/footer.php'; ?>