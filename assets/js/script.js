let heart = document.querySelectorAll(".addBtn")

document.addEventListener("DOMContentLoaded",function(){
    if (localStorage.getItem("basket")!== null) {
        calcCount();
    }
})

let basket = [];

heart.forEach((btn) => {
    btn.addEventListener("click",function(e){
        e.preventDefault();

        if(localStorage.getItem("basket")!== null){
            basket = JSON.parse(localStorage.getItem("basket"));
        }
        let model = this.parentNode.querySelector("p").innerText;
        let image = this.parentNode.previousElementSibling;
        let price = this.parentNode.querySelector("strong").innerText;
        let id = this.getAttribute("data-id");
        let existed = basket.find(x=> x.id == id);
        
        if(existed === undefined){
            let product = {
                id,
                model,
                image,
                price,
                count:1
            };
            basket.push(product);

        }else{
            existed.count++;
        }
        localStorage.setItem("basket",JSON.stringify(basket))
        calcCount();

    })
});

function calcCount(){
    let basket = JSON.parse(localStorage.getItem("basket"))
    let count = basket.reduce((t,val)=>{
        return(t+=val.count);
    },0);
    let countValue = document.querySelector("sup");
    countValue.innerText = count;
}