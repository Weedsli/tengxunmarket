require(['config'],()=>{
    require(['url','header','footer'],(url)=>{
        class Register{
            constructor(){
                this.username=$("#username");
                this.password=$("#password");
                this.registerBtn=$("#register");
                this.init();
            }
            init(){
                this.registerBtn.on("click",()=>{
                    let username=this.username.val();
                    let password=this.password.val();
                    if(username!==""&&password!==""){
                        $.ajax({
                            url:url.ajaxPhp+"register.php",
                            type:"post",
                            data:{username,password},
                            success:data=>{
                                if(data.res_code===1){
                                    alert(data.res_message);
                                    location.href="/html/login.html";
                                }else{
                                    alert(data.res_message);
                                    location.href="/html/register.html";
                                }
                            },
                            dataType:'json'
                        })
                    }else{
                        alert("用户名和密码不能为空！");
                        location.href="/html/register.html";
                    }
                    
                    return false;//阻止默认
                })
            }
        }
        new Register();
    })
})