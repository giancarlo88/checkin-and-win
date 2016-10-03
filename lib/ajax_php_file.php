<?php
require_once("../config.php");

$current_timestamp = time();
$fb_id = $_POST["fbid"];

if ($fb_id) {
    $img_src = $current_timestamp . "_" . $fb_id;
} else {
    $img_src = $current_timestamp . "_no_fb_id";
}

if(isset($_FILES["file"]["type"]))
{
    $validextensions = array("jpeg", "jpg", "png");
    $temporary = explode(".", $_FILES["file"]["name"]);
    $file_extension = end($temporary);
    
    if ((($_FILES["file"]["type"] == "image/png") ||
         ($_FILES["file"]["type"] == "image/jpg") || 
         ($_FILES["file"]["type"] == "image/jpeg")
         ) &&  ($_FILES["file"]["size"] < 10000000) && in_array($file_extension, $validextensions)) {
            
            if ($_FILES["file"]["error"] > 0) {
                echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
            } else {
                    
                    $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
                    $file_name = $img_src . "." . $file_extension;                   
                    
                    if ($file_extension == "jpg" || $file_extension == "jpeg"){
                        $image = new Imagick($sourcePath); 
	                    $image->setImageCompressionQuality(20);
	                    $image->writeImage("../upload/fb_" . $file_name); //Save a version with the "fb" prefix, which isn't rotated
                        echo "fb_".$file_name; //Send to API to be uploaded to Facebook.
                        autoRotateImage($image); //Rotate the image so it appears properly on the slideshow.
	                    file_put_contents("../upload/".$file_name, $image); //Save another copy of the image in the folder.
                    } else {
                       
                        $file_name = $img_src . "." . $file_extension; //Other formats are not generated from mobile camera
                        move_uploaded_file($sourcePath, $targetPath); //so workaround isn't required.
                        echo $file_name;
                    }
                    
                    $_POST["file"] = $file_name; //Saves data in the form so it can be passed to the database.
                    require_once("../template/ValidateFormModel.php"); //Validate the form and send data to the database.
            }
    } else {
        echo "<span id='invalid'>***Invalid file Size or Type***<span>";
    }
}

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


?>