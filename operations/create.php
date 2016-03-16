<?php
    //require_once('../mysql_connect.php');
    $userInputCourse = $_POST['course'];
    $userInputName = $_POST['name'];
    $userInputGrade = $_POST['grade'];
    $checkInput = true;

    if(!preg_match('/^[a-zA-Z]*$/',$userInputName) || empty($userInputName)){
        $output['errors'][] = 'Invalid Name Entry';
        $checkInput = false;
    }
    else if(!preg_match('/^[0-9]{1,3}?$/',$userInputGrade) || empty($userInputGrade)){
        $output ['errors'][] = 'Invalid Grade Entry';
        $checkInput = false;

    }
    else if(!preg_match('/^[a-zA-Z]*$/',$userInputCourse) || empty($userInputCourse)){
        $output['errors'][] = 'Invalid Course Entry';
        $checkInput = false;
    }

    if($checkInput === true) {
        $query = "INSERT INTO `Student Table`(`id`, `course`, `grade`, `name`, `Teacher ID`, `Date Added`, `Date Modified`, `Status`) VALUES ('','$userInputCourse','$userInputGrade','$userInputName','0999','3/15/2016','3/15/2016','1')";
        $result = mysqli_query($conn, $query);
        //print(print_r($result));
        //print(mysqli_affected_rows($conn));
        $newID = mysqli_insert_id($conn);
        if (mysqli_affected_rows($conn) > 0) {
            $output = ['success' => true, 'new_id' => $newID];
        }
    }
?>


