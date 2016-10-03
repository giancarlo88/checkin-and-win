<?php
/**
 * Setup user journey for existing users
 */

if ( isset($_GET['fbid']) && $_GET['fbid'] ) {
	$fbid = isset($_GET['fbid']) && $_GET['fbid'] ? $_GET['fbid'] : '';

	$isMember = User::getAll( array(
			'limit' => 1,
			'conditions' => array(
				'fbid' => $fbid
			)
		)
	);

	if ( $isMember ) {
		header('Location: thank-you.php?uid=' . $isMember['data'][0]->id);
	}
}


/**
 * Form validation
 */
	$cabacha = isset($_POST[$_POST['cabacha']]) && $_POST[$_POST['cabacha']] ? $_POST[$_POST['cabacha']] : '';
	$first_name = isset($_POST['first_name']) && $_POST['first_name'] ? $_POST['first_name'] : '';
	$last_name = isset($_POST['last_name']) && $_POST['last_name'] ? $_POST['last_name'] : '';
	$email = isset($_POST['email']) && $_POST['email'] ? $_POST['email'] : '';
	$location = isset($_POST['location']) && $_POST['location'] ? $_POST['location'] : '';
	$photo = isset($_POST['file']) && $_POST['file'] ? $_POST['file'] : '';
	$fbid = isset($_POST['fbid']) && $_POST['fbid'] ? $_POST['fbid'] : '';
	$outfit_subscription = isset($_POST['outfit_subscription']) && $_POST['outfit_subscription'] === 'on' ? true : false;

	if ( ! empty($cabacha) ) {
		$error = 'Potential bot detected from IP: ' . AppFunction::getIP();
	}
	else {
		if ( empty($first_name) ) {
			$error = 'First name is required.';
		}
		elseif ( ! empty($first_name) && strlen($first_name) > 100 ) {
			$error = 'A valid first name is required.';
		}
		elseif ( empty($last_name) ) {
			$error = 'Last name is required.';
		}
		elseif ( ! empty($last_name) && strlen($last_name) > 100 ) {
			$error = 'A valid last name is required.';
		}
		elseif ( empty($email) ) {
			$error = 'Email is required.';
		}
		elseif ( ! empty($email) && ( !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 255) ) {
			$error = 'A valid email is required.';
		}
		else {

			$config = array(
					'limit' => 1,
					'type' => 'OR',
					'conditions' => array(
						'email' => $email,
						'fbid' => $fbid
					)
				);

			$isMember = User::getAll( $config );

			if ( ! $isMember ) {
				$detect = new Mobile_Detect;
				$user = new User;
				$user->fbid = $fbid;
				$user->first_name = $first_name;
				$user->last_name = $last_name;
				$user->email = $email;
				$user->location = $location;
				$user->photo = $photo;
				$user->outfit_subscription = $outfit_subscription;
				$user->from_mobile = $detect->isMobile();
				$user->from_tablet = $detect->isTablet();

				if ( $user->save() ) {
					//header('Location: thank-you.php?uid=' . $user->id);
					//header('Location: invite.php?uid=' . $user->id);
				}
				else {
					$error = 'Error saving user data.';
				}
			}
			else {
				//header('Location: thank-you.php?uid=' . $isMember['data'][0]->id);
				//header('Location: invite.php?uid=' . $isMember['data'][0]->id);
			}
		}
	}

if ( isset($error) ) error_log($error . ' from IP: ' . AppFunction::getIP());
