<?php
$thisPage = "register";
/**
 * Default tab page
 */

require './config.php';
require './template/header.php';
require './modals.php'; 

// require './template/navigation.php';


?>
<script src="assets/js/scratch.js"></script>

<div class="app-wrapper">
<div class="scr__instructions-numbers">
<div class = "scr__instructions">
		SCRATCH EACH SECTION TO DISCOVER THE <span class="bolded txt-highlight">
		6 AMAZING EXPERIENCES</span> DUBAI PARKS AND RESORTS HAS TO OFFER. 
		ONCE THE OPENING DATE HAS BEEN REVEALED, YOU WILL THEN BE ENTERED INTO THE PRIZE DRAW. 
		<!--<p>SCRATCH EACH PART OF AMAZING TO <span class = "txt-highlight">CRACK THE CODE</span>. 
		ONCE ALL <span class = "bolded">6 NUMBERS</span> HAVE BEEN REVEALED YOU WILL 
		THEN BE ENTERED INTO THE PRIZE DRAW.-->
</div>
	<div class="scr__mystery-number-row">
		<div class = "scr__logo-number-container">
			<img class = "ty__mg-logo" src = "./assets/images/motiongate_logo.png">
			<div class = "scr__mystery-number scr__mystery-box1"><span class = "scr__mystery-number-text" id = "scr__mystery-number1"></span></div>
		</div>
		<div class = "scr__logo-number-container">
			<img src = "./assets/images/bollywood_parks_logo.png">
			<div class = "scr__mystery-number scr__mystery-box2"><span class = "scr__mystery-number-text" id = "scr__mystery-number2">&nbsp;</span></div>
		</div>
			<span class = "scr__big-slash">/</span>
		<div class = "scr__logo-number-container">
			<img src = "./assets/images/riverland_logo.png">
			<div class = "scr__mystery-number scr__mystery-box3"><span class = "scr__mystery-number-text" id = "scr__mystery-number3">&nbsp;</span></div>
		</div>
		<div class = "scr__logo-number-container">
			<img src = "./assets/images/legoland_waterpark_logo.png">
			<div class = "scr__mystery-number scr__mystery-box4"><span class = "scr__mystery-number-text" id = "scr__mystery-number4">&nbsp;</span></div>
		</div>
		<span class = "scr__big-slash">/</span>
		<div class = "scr__logo-number-container">
			<img src = "./assets/images/legoland_logo.png">
			<div class = "scr__mystery-number scr__mystery-box5"><span class = "scr__mystery-number-text" id = "scr__mystery-number5">&nbsp;</span></div>
		</div>
		
		<div class = "scr__logo-number-container">
			<img src = "./assets/images/lapita_logo.png">
			<div class = "scr__mystery-number scr__mystery-box6"><span class = "scr__mystery-number-text" id = "scr__mystery-number6">&nbsp;</span></div>
	</div>
</div>	
</div>
	<div class = "s-wrapper">
	
	<div class="scr__scratch-container" id="js-container">
	<div class ="scr__scratch-overlay"><img id ="scr__scratch-overlay" src = "overlay_v2.png"></div>
	<canvas class="scr__canvas" id="js-canvas1" ></canvas>
	<canvas class="scr__canvas" id="js-canvas2" ></canvas> 
	<canvas class="scr__canvas" id="js-canvas3" ></canvas> 
	<canvas class="scr__canvas" id="js-canvas4" ></canvas> 
	<canvas class="scr__canvas" id="js-canvas5" ></canvas> 
	<canvas class="scr__canvas" id="js-canvas6" ></canvas>
	<img id = "scr__scratch-underlay" class = "scr__scratch-underlay" src = "underlay_v2.png">
	</div>
	</div>
</div>
</div>
</div>


<?php

require './template/footer.php';

?>