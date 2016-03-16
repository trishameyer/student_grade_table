<?php
    require_once('mysql_connect.php');
    if(!empty($_POST['operation'])){
        $operation = $_POST['operation'];
    }
    else{
        $operation = 'none';
    }
if(!empty($_POST['api_key']) && $_POST['api_key'] == 'tc6UZ5oMSi') {
    switch ($operation) {
        case 'get':
            //if(!empty($_POST['api_key']) && $_POST['api_key']=='tiggerrocks')
            include('operations/get.php');
            break;
        case 'create':
            //$output = ['success' => false, 'errors' => ['invalid entry']];
            include('operations/create.php');
            break;
            $output = ['success' => false, 'errors' => ['invalid id']];
            include('operations/delete.php');
        case 'delete':
            $output = ['success' => false, 'errors' => ['id not found']];
            include('operations/delete.php');
            break;
        default:
            $output = ['success' => 'false', 'errors' => ['invalid operation']];

    }
}
else{
    $output = ['success' => 'false', 'errors' => ['invalid api_key']];
}
    print(json_encode($output));
?>