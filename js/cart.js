// global values
let count=0;
let total_cost=0;
let res;
let cart_count_ele;
let total_product_ele;
let total_cost_ele;
let cartArr;

function load_stats(){
    let width=window.innerWidth;

    console.log(width*0.9);
}


/**
 * Set session storage value
 */
function set(target,value){
    sessionStorage.setItem(target.toString(),value.toString());
}

/**
 * Get session storage value
 */
function get(target){
    return sessionStorage.getItem(target.toString());
}


function load_cart_details(){

    cart_count_ele=document.getElementById("cart_count");
    total_product_ele=document.getElementById("total_product");
    total_cost_ele=document.getElementById("total_cost");

    // initializing the cart count
    let cart=sessionStorage.getItem("cartItems");
    if(cart!=undefined && cart==null){
       document.getElementById("cart_count").textContent=0;
    }
    else{
        cartArr=cart.split(",");
        document.getElementById("cart_count").textContent=(cart.split(",")).length;
    }

    // to keep track of total cost and count
    sessionStorage.setItem("total_cost","0");
    sessionStorage.setItem("total_count","0");
    
    // element to be created
    // <tr>
    //     <td>mob 1</td>
    //     <td>
    //         <button id="b_add" onClick="increase('mob1')">+</button>
    //         <span id="mob1_count"></span>
    //         <button id="b_sub" onClick="decrease('mob1')">-</button>
    //     </td>
    //     <td>40000</td>
    //     <td id="mob1_multiplied">40000</td>
    // </tr>

    const table=document.getElementById("table_body");
    if(parseInt(document.getElementById("cart_count").textContent)>0){
        // getting the cart items to an array
        // cartItems is an object(associative)
        const cartItems=sessionStorage.getItem("cartItems").split(",");

        // iterating cartItems arrayq
        for(let x in cartItems){
            const tr=document.createElement("tr");

            // 1st table data
            const td1=document.createElement("td");
            td1.textContent=sessionStorage.getItem(cartItems[x]+"_name");
            
            // 2nd table data
            const td2=document.createElement("td");
            const btn_inc=document.createElement("button");

            btn_inc.setAttribute("id","b_add");
            btn_inc.setAttribute("onClick","increase('"+cartItems[x]+"')");
            btn_inc.textContent="+";

            const btn_dec=document.createElement("button");
            btn_dec.setAttribute("id","b_sub");
            btn_dec.setAttribute("onClick","decrease('"+cartItems[x]+"')");
            btn_dec.textContent="-";

            const span=document.createElement("span");
            span.setAttribute("id",cartItems[x]+"_count");
            span.textContent=sessionStorage.getItem(cartItems[x]+"_cc");
            count+=parseInt(sessionStorage.getItem(cartItems[x]+"_cc"));

            td2.appendChild(btn_dec);
            td2.appendChild(span);
            td2.appendChild(btn_inc);

            // 3rd table data
            const td3=document.createElement("td");
            td3.textContent=sessionStorage.getItem(cartItems[x]+"_rate");

            // 4th table data
            const td4=document.createElement("td");
            td4.setAttribute("id",cartItems[x]+"_multiplied");

            // calculating the multiplied amount
            let current_total=parseInt(sessionStorage.getItem(cartItems[x]+"_rate"))*parseInt(sessionStorage.getItem(cartItems[x]+"_cc"));
            td4.textContent=current_total;
            let total=parseInt(sessionStorage.getItem("total_cost"))+current_total;
            sessionStorage.setItem("total_cost",total.toString());

            // appending all the td's to tr
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            table.appendChild(tr);

            // updating the count after table creation
            document.getElementById("cart_count").textContent=count;
        }
    }
    document.getElementById("total_product").textContent=count;
    total_cost=parseInt(sessionStorage.getItem("total_cost"));
    document.getElementById("total_cost").textContent=total_cost;
    sessionStorage.setItem("total_count",count.toString());

    load_stats();
}


// function to increase product count
function increase(id){
    let cc=parseInt(sessionStorage.getItem(id+"_cc"));
    let tc=parseInt(sessionStorage.getItem(id+"_tc"));

    // increase if the current count is less than the vailable count
    if(cc<tc){
        // adding the current product id if the cc is 0 and it is increased
        if(cc==0){
            cartArr.push(id);
            set("cartItems",cartArr);
        }

        // updating the table data, session data
        count++;
        set(id+"_cc",cc+1);
        document.getElementById(id+"_count").textContent=parseInt(document.getElementById(id+"_count").textContent)+1;;
        cart_count_ele.textContent=count;
        document.getElementById(id+"_multiplied").textContent=parseInt(get(id+"_rate"))*parseInt(get(id+"_cc"));
        total_cost+=parseInt(get(id+"_rate"));
        total_cost_ele.textContent=total_cost;
        total_product_ele.textContent=count;
        set("total_count",count);
        set("total_cost",total_cost);

        // sessionStorage.setItem(id+"_cc",(cc+1).toString());
        // document.getElementById(id+"_count").textContent=parseInt(document.getElementById(id+"_count").textContent)+1;
        // document.getElementById("cart_count").textContent=count;
        // document.getElementById(id+"_multiplied").textContent=parseInt(sessionStorage.getItem(id+"_rate"))*parseInt(sessionStorage.getItem(id+"_cc"));
        // total_cost+=parseInt(sessionStorage.getItem(id+"_rate"))
        // document.getElementById("total_cost").textContent=total_cost;
        // document.getElementById("total_product").textContent=count;
        // sessionStorage.setItem("total_count",count.toString());
        // sessionStorage.setItem("total_cost",total_cost.toString());
    }
    else{
        alert("stock is limited to "+tc);
    }
}





// function to increase product count
function decrease(id){
    let cc=parseInt(sessionStorage.getItem(id+"_cc"));
    let tc=parseInt(sessionStorage.getItem(id+"_tc"));

    // not to go below 0
    if(cc>0){
        count--;    
        if(cc-1==0){
            // const cart=sessionStorage.getItem("cartItems").split(",");
            let newArr=[];
            for(let val in cartArr){
                if(cartArr[val].toString() != id.toString()){
                    newArr.push(cartArr[val]);
                }
            }
            cartArr=newArr;
            console.log(newArr);
            set("cartItems",cartArr);
        }

        sessionStorage.setItem(id+"_cc",(cc-1).toString());
        document.getElementById(id+"_count").textContent=parseInt(document.getElementById(id+"_count").textContent)-1;;
        cart_count_ele.textContent=count;
        document.getElementById(id+"_multiplied").textContent=parseInt(sessionStorage.getItem(id+"_rate"))*parseInt(sessionStorage.getItem(id+"_cc"));
        
        total_product_ele.textContent=count;
        total_cost-=parseInt(sessionStorage.getItem(id+"_rate"));
        sessionStorage.setItem("total_cost",total_cost.toString());
        total_cost_ele.textContent=total_cost;    
        sessionStorage.setItem("total_count",count.toString());
    }
}

function open_checkout(){
    if(get("total_count")!="0"){
        window.location.href="/e_commerce/html/checkout.html";
    }
    else{
        alert("No item in the cart to pay!");
    }
}

