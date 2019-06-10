define(['template','jquery','cookie'],(template)=>{
    class Header{
        constructor(){
            this.container=$("header");
            this.load().then(()=>{
               this.search();
               this.isLogin();
               this.calcCart();
            });
        }
        load(){
            return new Promise(resolve=>{
                this.container.load('/html/modules/header.html',()=>{
                    //console.log(123);
                    resolve();
                })
            })
        }
        search(){
            let searchInput=$(".searchInput");
            let  _this=this;
            searchInput.on("keyup",function(){
                let value=$(this).val();
                $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+value, data=>{
                    console.log(data.s);
                    _this.renderSearchList(data.s);
                })
            })
        }
        renderSearchList(list){//list是个数组
            let html=template("searchRender",{list:list});
            console.log(html);
            $(".searchlist").html(html);
        }
        isLogin(){
            let username=$.cookie('username');
            //console.log(username);
            this.login=$("#loginbox");
            this.unlogin=$("#unloginbox");
            this.showname=$("#showname");
            this.loginout = $("#loginout");
            if(username){
                this.login.show();
                this.unlogin.hide();
                this.showname.html(username);
            }
            this.loginout.on('click',()=>{
                if(confirm("确认要退出吗？")){
                    $.removeCookie("username",{path:'/'});
                    this.load();
                }
            })

        }
        calcCart(){
            let cart=localStorage.getItem('cart');
            let num=0;
            if(cart){
                cart=JSON.parse(cart);
                num=cart.reduce((n,shop)=>{
                    return n+shop.num;

                },0);
            }
            $('#calcCart').html(num);
        }

    }
    //console.log(new Header());
    return new Header();
})
