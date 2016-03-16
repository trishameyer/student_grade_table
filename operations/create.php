<?php
    //require_once('../mysql_connect.php');
    $userInputCourse = $_POST['course'];
    $userInputName = $_POST['name'];
    $userInputGrade = $_POST['grade'];
    $query = "INSERT INTO `Student Table`(`Unique_ID`, `Course`, `Grade`, `Name`, `Teacher ID`, `Date Added`, `Date Modified`, `Status`) VALUES ('','$userInputCourse','$userInputGrade','$userInputName','0999','3/15/2016','3/15/2016','1')";
    $result = mysqli_query($conn, $query);
    //print(print_r($result));
    print(mysqli_affected_rows($conn));
    if (mysqli_affected_rows($conn) > 0) {
        $output = ['success' => true];
    }
?>


