<?php

/**
 * Thank you page
 */
$thisPage = "register";
require './config.php';
require './template/UserEntriesModel.php';
require './template/header.php';
// require './template/navigation.php';

?>

<div id="ty" class="app-wrapper">
	Congrats! You've entered our contest! 
	<!--<div class="ty__bg-wrapper">
		<div class="ty__overlay">
			<div class="ty__text">
				<h2>Congratulations. You have cracked the code.</h2>
				<h2>The grand opening date of Dubai Parks and Resorts is </h2>
				<h1><span class="ty__date txt-highlight bolded">31/10/16</span></h1>
				<h2>You have been entered into the prize draw to win a holiday to Dubai for two adults & two children, and tickets to Amazing.</h2>
				<p>Share for an additional entry</p>
				<p style="display: none" class="text-center">You have invited <?php echo isset($userTotalInvites) ? $userTotalInvites . ((int)$userTotalInvites === 1 ? ' friend' : ' friends' ) : '0 friends'; ?> and you now <span class="line-break">have <?php echo isset($userTotalEntries) ? $userTotalEntries . ((int)$userTotalEntries === 1 ? ' entry' : ' entries') : '0 entries'; ?>.</span></p>-->
			</div>

			<div class="social-share clearfix">
				<ul class="list-inline text-center">
					<li>
						<a class="ss-facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(AppFunction::getAppUrl()); ?>" data-title="<?php echo AppConfig::get('app_title'); ?>" data-link="http://unitedapps.co/ticket-to-amazing" data-picture="<?php echo AppFunction::getFeaturedImage(); ?>"
						data-caption="<?php echo AppFunction::getAppUrl(); ?>" data-description="<?php echo AppConfig::get('facebook_share_message') ?>">
						<span>
						<img class="ty__sm-icon" src = "./assets/images/fb_icon.png">
						</span>
						</a>
					</li>
					<li>
						<a class="ss-twitter" href="https://twitter.com/intent/tweet?text=<?php echo urlencode(AppConfig::get('twitter_tweet')); ?>&url=<?php echo urlencode(AppConfig::get('twitter_url')); ?>">
							<span>
							<img class="ty__sm-icon sm-twitter" src = "./assets/images/twitter_icon.png">
						</span>
						</a>
					</li>
				</ul>
			</div>
			<div class="ty__container-tc-priv">
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
<?php
require './template/footer.php';
?>