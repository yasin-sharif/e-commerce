<?php
    // dependency files
    require "vendor/autoload.php";

    // connecting with mongoDB-online
    $serverApi=new \MongoDB\Driver\ServerApi(\MongoDB\Driver\ServerApi::V1);
    $client = new \MongoDB\Client(
        "mongodb+srv://aysyasin29:devrevproject@cluster0.7xwxazl.mongodb.net/test",[],["serverApi" => $serverApi]
    );

    $db = $client->credentials;
    $collection=$db->customers;

    $email=$_POST["email"];
    $password=$_POST["password"];

    $record=$collection->find(["email"=>$email]);  

    if($record==NULL){
        echo "login_fail";
    }
    else{
        foreach ($record as $result){
            if($result!=NULL){
                if($result["pwd"]==$password){
                    echo "login_success";
                }
                else{
                    echo "login_fail";
                }
            }
            else{
                echo "login_fail"; 
            }
        }
    }
?>