<?php
    /* todo: change to mongo db */
    // dependency files
    require "vendor/autoload.php";

    // connecting with mongoDB-online
    $serverApi=new \MongoDB\Driver\ServerApi(\MongoDB\Driver\ServerApi::V1);
    $client = new \MongoDB\Client(
        "mongodb+srv://aysyasin29:devrevproject@cluster0.7xwxazl.mongodb.net/test",[],["serverApi" => $serverApi]
    );

    // database selection
    $db = $client->product_details;
    $collection=$db->deals;

    $record=$collection->find();
    $arr=array();
    foreach ($record as $result){
        array_push($arr,$result);
    }
    echo json_encode($arr);


    // // linking to mysql-offline
    // $conn=new mysqli("localhost","root","tiger","products");
    // if ($conn->connect_error) {
    //     die("Connection failed: " . $conn->connect_error);
    // }

    // $getQuery=$conn->prepare("SELECT path FROM deals");
    // $getQuery->execute();

    // $result=$getQuery->get_result();
    // $row=$result->fetch_all();
    // $arr=array();

    // foreach($row as $x => $x_value){
    //     array_push($arr,$x_value);
    // }
    
    // echo json_encode($arr);
?>