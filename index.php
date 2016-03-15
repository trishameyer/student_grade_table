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
            //print("conn: "); print_r($conn);
            $query = 'SELECT * FROM `Student Table`';
            //WHERE user_id=101';
            $result = mysqli_query($conn, $query);
            //print("<br><br><pre>".print_r($result).'</pre>');
            $output = ['success' => false];
            if (mysqli_num_rows($result) > 0) {
                $output['success'] = true;
                $output['data'] = [];
                while ($row = mysqli_fetch_assoc($result)) {
                    $output['data'][] = $row;
                    //print_r($output);
                }
            }
            //print_r($output);
            break;
        case 'create':
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