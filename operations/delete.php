<?php
    //require_once ('../mysql_connect.php');
    $ID = 49;
    $query = "DELETE FROM `Student Table` WHERE `Unique_ID` = $ID";
    $result = mysqli_query($conn, $query);
    if(mysqli_affected_rows($conn) > 0){
        $output = ['success' => true];
    }
//    $output = ['success' => false];
//    if (mysqli_num_rows($result) > 0) {
//        $output['success'] = true;
//        $output['data'] = [];
//        while ($row = mysqli_fetch_assoc($result)) {
//            $output['data'][] = $row;
//        }
//    }

?>
