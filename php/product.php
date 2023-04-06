<?php
    // dependency files
    require "vendor/autoload.php";

    // connecting with mongoDB-online
    $serverApi=new \MongoDB\Driver\ServerApi(\MongoDB\Driver\ServerApi::V1);
    $client = new \MongoDB\Client(
        "mongodb+srv://aysyasin29:devrevproject@cluster0.7xwxazl.mongodb.net/test",[],["serverApi" => $serverApi]
    );

    // database selection
    $db = $client->product_details;
    $category=$_POST["p_category"];
    $unique=$_POST["unique"];
    $collection;

    // based on the product id corresponding collection is choosed
    switch($category){
        case "mob":
            $collection=$db->mobile;
            break;
        case "lap":
            $collection=$db->lap;
            break;
    }

    // getting all details about the product
    $record=$collection->find(["unique"=>$unique]);
    $arr=array();
    foreach ($record as $result){
        array_push($arr,$result);
    }
    echo json_encode($arr);
?>