require(['config'],()=>{
    require(["template","header","footer"],(template,header)=>{
        class Cart{
            constructor(){
                this.container=$(".cart-list");
                this.render();
                this.checkChange();
                this.edit();
                this.allCheck();
            }
            render(){
                let data=localStorage.getItem('cart');
                if(data){
                    data=JSON.parse(data);
                    //console.log(data);
                    this.container.html(template("cart-item",{data}));
                    $('.checkboxBtn').each(function(){
                        let str=$(this).parents(".cart-item").attr("check-id");
                        //console.log(typeof(str))//String
                        if(str ==='false') str = false;
                        //console.log(typeof(str))//boolean
                        $(this).prop('checked',str);
                    })
                }else{
                    this.container.html(`<p class="cart-item qiong"><a href="/">购物车什么也没有，快去找点宝贝吧~</a></p>`)
                }
                header.calcCart();
                this.calcTotal();
            }
            checkChange(){
                let _this=this;
                this.container.on("change",".checkboxBtn",function(){
                    _this.calcTotal();
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let id = $(this).parents('.cart-item').attr('data-id');
                    let index = -1;
                    cart.some((shop,i)=>{
                        index = i ;
                        return shop.id == id;
                    });
                    cart[index].checked = !cart[index].checked;
                    localStorage.setItem('cart',JSON.stringify(cart));
                })
            }
            allCheck(){
                let _this = this;              
                $('.allcheckBtn').on('change',function(){
                    let allChecked = $('.allcheckBtn').prop('checked');
                    let checkedBtns = $('.checkboxBtn');
                    checkedBtns.each(function(){
                        $(this).prop('checked',allChecked);        
                    })
                    let cart = localStorage.getItem('cart');
                    if(cart){
                        cart = JSON.parse(cart);
                        cart.forEach(data=>{
                            data.checked = allChecked;
                        })
                    }
                    localStorage.setItem('cart',JSON.stringify(cart));
                    _this.calcTotal();
                })
            }
            calcTotal(){
                let allNum = 0;
                let allPrice = 0.00;
                let _this = this;
                this.count = 0;
                $(".cart-item").each(function(){
                    if($(this).find(".checkboxBtn").prop('checked')){
                        allPrice += ($(this).find(".xiaoji").html()-0);
                        allNum += ($(this).find(".number").val()-0);
                        _this.count++;
                    }
                })
                $('#allNum').html(allNum);
                $('#allPrice').html((allPrice).toFixed(2));
                let cart = localStorage.getItem('cart');
                if(cart){
                    cart = JSON.parse(cart);
                    if(this.count == cart.length){
                        $('.allcheckBtn').prop('checked',true);
                    }else{
                        $('.allcheckBtn').prop('checked',false);
                    }
                }else{
                    $('.allcheckBtn').prop('checked',false);
                } 
            }
            edit(){
                let _this = this;
                this.container.on("click",".Jia",function(){
                    let num=$(this).prev().val();
                    let price=$(this).parents(".cart-item").find(".price").html();
                    num++;
                    $(this).prev().val(num);
                    $(this).parents(".cart-item").find(".xiaoji").html((num*price).toFixed(2));
                    _this.calcTotal();
                    let data = JSON.parse(localStorage.getItem('cart'));
                    let id = $(this).parents('.cart-item').attr('data-id');
                    let index = -1;
                    data.some((shop,i)=>{
                        index = i ;
                        return shop.id == id;
                    })
                    data[index].num = num;
                    localStorage.setItem('cart',JSON.stringify(data));
                    header.calcCart();
                })
                this.container.on("click",".Jan",function(){
                    let num=$(this).next().val();
                    let price=$(this).parents(".cart-item").find(".price").html();
                    num--;
                    if(num===0) num=1;
                    $(this).next().val(num);
                    $(this).parents(".cart-item").find(".xiaoji").html((num*price).toFixed(2));
                    _this.calcTotal();
                    let data = JSON.parse(localStorage.getItem('cart'));
                    let id = $(this).parents('.cart-item').attr('data-id');
                    let index = -1;
                    data.some((shop,i)=>{
                        index = i ;
                        return shop.id == id;
                    })
                    data[index].num = num;
                    localStorage.setItem('cart',JSON.stringify(data));
                    header.calcCart();
                })
                this.container.on("click",".delShop",function(){
                    if(confirm("确认删除该商品吗？")){
                        let data=JSON.parse(localStorage.getItem('cart'));
                        let id=$(this).parents(".cart-item").attr("data-id");
                        let index =-1;
                        data.some((shop,i)=>{
                            index=i;
                            return shop.id==id;
                        })
                        data.splice(index,1);
                        localStorage.setItem("cart",JSON.stringify(data));
                        $(this).parents(".cart-item").remove();
                        if(data.length === 0){
                            localStorage.clear();
                            _this.render();   
                        }
                        header.calcCart();
                        _this.calcTotal();
                    }
                })
            }
            
        }
        new Cart();
    })
})