function set(target,value){
    sessionStorage.setItem(target.toString(),value.toString());
}

function get(target){
    return sessionStorage.getItem(target.toString());
}

function load_checkout_details(){
    let cartString=get("cartItems");

    if(cartString!=null && cartString!=undefined){
        let cart=cartString.split(",");
        const table=document.getElementById("table_body");
        for(let x in cart){
            const tr=document.createElement("tr");

            // 1st table data
            const td1=document.createElement("td");
            td1.textContent=get(cart[x]+"_name");

            // 2nd table data
            const td2=document.createElement("td");
            td2.textContent=parseInt(get(cart[x]+"_cc"))*parseInt(get(cart[x]+"_rate"));

            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
        }
    }

    document.getElementById("total_sum").textContent=get("total_cost");
    document.getElementById("cart_count").textContent=get("total_count");
}

function openCartPage(){
    window.location.href="/e_commerce/html/cart.html";
}

function pay(){
    // alert("Order placed successfully.\nCHECK YOUR EMAIL.");
    sessionStorage.clear();
    window.location.href="/e_commerce/";
}