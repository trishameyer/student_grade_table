<?php
    require_once('../mysql_connect.php');
    $query = "INSERT INTO `Student Table`(`Unique_ID`, `Course`, `Grade`, `Name`, `Teacher ID`, `Date Added`, `Date Modified`, `Status`) VALUES ('','History 101','12','Kobe Bryant','0999','3/15/2016','3/15/2016','1')";
    $result = mysqli_query($conn, $query);
    if (mysqli_affected_rows($conn) > 0) {
        $output = ['success' => true];
    }
?>