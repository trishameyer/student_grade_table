<?php
    //require_once ('../mysql_connect.php');
    $query = 'SELECT `id`,`course`,`name`,`grade` FROM `Student Table`';
    $result = mysqli_query($conn, $query);
    $output = ['success' => false];
    if (mysqli_num_rows($result) > 0) {
        $output['success'] = true;
        $output['data'] = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $output['data'][] = $row;
        }
    }
    //print_r($output);
?>