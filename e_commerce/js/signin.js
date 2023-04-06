function login_check(){
    let email=document.getElementById("email");
    let password=document.getElementById("password");
    $.ajax({ 
        url: '/e_commerce/php/signin.php', 
        type: 'POST', 
        data: jQuery.param({ email:$("#email").val(),password:$("#password").val()}),
        success: function(response){
            if(response.toString()=="login_success"){
                sessionStorage.setItem("user_id",$("#email").val());
                alert("Valid login :-)");
            }
            else if(response.toString()=="login_fail"){
                alert("Invalid Login");
            }
            else{
                console.log(response);
            }
        }
    });
}