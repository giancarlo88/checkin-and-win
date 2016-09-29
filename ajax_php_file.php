<?php
require_once("./config.php");


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
    
    if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
        ) && ($_FILES["file"]["size"] < 1000000)
            && in_array($file_extension, $validextensions)) {
            if ($_FILES["file"]["error"] > 0)
            {
                echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
            } else {
                    $file_name = $img_src . "." . $file_extension;
                    $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
                    $targetPath = __DIR__."/upload/" . $file_name; // Target path where file is to be stored
                    move_uploaded_file($sourcePath, $targetPath) ; // Moving Uploaded file
                    echo $file_name;
                    require_once("./template/ValidateFormModel.php");
                    }
                
    } else {
        echo "<span id='invalid'>***Invalid file Size or Type***<span>";
    }
}

?>