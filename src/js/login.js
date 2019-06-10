require(["config"], () => {
    require(["url","jquery","cookie","header","footer"], (url,$) => {
        class Login{
            constructor(){
                this.nameInput = $("#username");
                this.pwdInput = $("#password");
                this.loginBtn = $("#login");
                this.init();
            }
            init(){
                this.loginBtn.on("click",()=>{
                    let username = this.nameInput.val(),
                        password = this.pwdInput.val();
                    $.ajax({
                        url:url.ajaxPhp + "login.php",
                        type : "post",
                        data :{username,password},
                        success : data => {
                                if(data.res_code ===1){
                                    //alert(data.res_message + ",即将跳转到主页面");
                                    // location.href="index.html";
                                    this.loginSuccess(username);
                                    console.log(username);
                                }else{
                                    alert(data.res_message+",请重新输入用户名或密码")
                                }
                        },
                        dataType : 'json'
                    })
                    return false;
                })
            }
            loginSuccess(username){
                let check = $("#checkbox").prop('checked');
                let expires = check ? {expires : 7} : {};
                expires = Object.assign({path: "/"}, expires);
                $.cookie('username', username, expires);
                alert('登录成功，即将跳转首页');
                location.href = "/";
            }
        }
        new Login();
    })
})