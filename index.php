<?php
    require_once('mysql_connect.php');
    if(!empty($_POST['operation'])){
        $operation = $_POST['operation'];
    }
    else{
        $operation = 'none';
    }

    switch($operation){
        case 'get':
            //if(!empty($_POST['api_key']) && $_POST['api_key']=='tiggerrocks')
            include('operations/get.php');
            break;
        case 'create':
            $output = ['success' => false,'errors'=>['invalid entry']];
            include('operations/create.php');
            break;
        case 'delete':
            break;
        case 'update':
            break;
        default:
            $output = ['success'=>'false','errors'=>['invalid operation']];
    }
    print(json_encode($output));
?>