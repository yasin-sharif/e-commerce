function get(target){
	return sessionStorage.getItem(target.toString());
}

function load_home_products(){
	let total_count=get("total_count");
	let cartString=get("cartItems");
	if(total_count!=null && total_count!=undefined){
		document.getElementById("cart_count").textContent=total_count;
	}
	else if(cartString!=null && cartString!=undefined){
		document.getElementById("cart_count").textContent=cartString.split(",").length;
	}
	else{
		document.getElementById("cart_count").textContent=0;
	}

	/* jquery ajax to commmunicate with server */
    $.ajax({ 
		url: 'php/home.php', 
		type: 'POST', 
		success: function(response){
			var res=JSON.parse(response);
			setCarousel(res);
		}
	});
}

function setCarousel(res){
	console.log(res);
	const ele=document.getElementById("carousel_target");
	for(let i=0;i<res.length;i++){
		const node=document.createElement("div");
		/* HTML element to be created
			<div class="carousel-item">
				<img src="..." class="d-block w-100" alt="...">
			</div>
		*/
		if(i==0){
			node.setAttribute("class","carousel-item active");
		}
		else{
			node.setAttribute("class","carousel-item");
		}
		const image=document.createElement("img");
		image.setAttribute("src",res[i]["path"]);
		image.setAttribute("class","d-block w-30");
		node.appendChild(image);
		ele.appendChild(node);
	}
}

function showProduct(ele,id){
	sessionStorage.setItem("imgSrc","/e_commerce/"+ele.getAttribute("src"));	
	window.location.href="html/product.html?id="+id;	
}

function openCartPage(){
	let cartItems=sessionStorage.getItem("cartItems");
    if(cartItems!=null && cartItems!=undefined){
        window.location.href="/e_commerce/html/cart.html";
    }
    else{
        alert("add a product to cart to see cart page");
    }
}