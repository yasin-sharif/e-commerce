// global elements
let category,id,product,available;
let res={};

function get(target){
    return sessionStorage.getItem(target.toString());
}
function load_product_detail(){
    // getting the product id from the url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    product = urlParams.get('id');
    category=product.slice(0,3);
    id=product.slice(3);

    // loading image
    const ele=document.getElementById("img");
    const node=document.createElement("img");
    node.setAttribute("src",sessionStorage.getItem("imgSrc"));
    node.setAttribute("class","product_img m-5");
    ele.appendChild(node);

    // updating the cart count
    let cart=sessionStorage.getItem("cartItems");
    if(cart==undefined || cart==null){
        document.getElementById("cart_count").textContent=0;
    }
    else{
        let total_count=get("total_count");
        if (total_count!=null && total_count!=undefined){
            document.getElementById("cart_count").textContent=parseInt(total_count);
        }
        else{
            document.getElementById("cart_count").textContent=(cart.split(",")).length;
        }
    }

    $.ajax({ 
        url: '/e_commerce/php/product.php', 
        type: 'POST', 
        data: jQuery.param({p_category:category,unique:id}),
        success: function(response){
            console.log(response);
            res=JSON.parse(response);

            // setting prduct details
            available=res[0]["available"];
            document.getElementById("stock_count").textContent="Stocks Available: "+available;
            const h1=document.getElementById("title");
            h1.textContent=res[0]["brand"]+" "+res[0]["name"];
            const ul=document.getElementById("details");
            for(let x in res[0]["details"]){
                const li=document.createElement("li");
                li.textContent=res[0]["details"][x]+" "+x;
                ul.append(li);
            }
            sessionStorage.setItem(category+id+"_rate",res[0]["details"]["price"]);

            document.getElementById("validate").removeAttribute("hidden");
        }
    });
}

let flag=0;
function isEqual(value,index,array){
    if((value.toString()) == (product.toString())){
        flag=1;
    }
}

function addToCart(){
    let result=sessionStorage.getItem("cartItems");
    let cart=[];
    
    // already a product is added to the cart
    if(result!=undefined && result!=null){
        cart=result.split(",");
        cart.forEach(isEqual);
    }

    console.log("cart is "+cart);
    // to prevent adding same product again in the product page
    if(flag==0){
        console.log("product is "+product);
        cart.push(product);
        console.log(cart.length);
        sessionStorage.setItem("cartItems",cart.toString());
        document.getElementById("cart_count").textContent=cart.length;
        sessionStorage.setItem(product+"_tc",available);
        sessionStorage.setItem(product+"_cc",1);
        sessionStorage.setItem(product+"_name",res[0]["brand"]+" "+res[0]["name"]);
        console.log(sessionStorage);
    }
    else{
        alert("already added to cart, to add extra visit cart page");   
    }
}

function openCartPage(){
    if(parseInt(document.getElementById("cart_count").textContent)>0){
        window.location.href="/e_commerce/html/cart.html";
    }
    else{
        alert("add a product to cart to see cart page");
    }
}