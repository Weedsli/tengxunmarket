require(['config'],()=>{
    require(['template','url','header','footer'],(template,url)=>{
        class List{
            constructor(){
                this.render();
                this.bindEvent();
            }
            render(){
                $.get(url.ajaxData+'list2',data=>{
                    if(data.res_code===1){
                        let html=template("moduleRender",{list:data.res_body});
                        $(".bottom").html(html);
                    }
                })
            }
            bindEvent(){
                $(".bottom").on("click","li",function(){
                    let id=$(this).attr("data-id");
                    console.log(id);
                    let url = '/html/detail.html?id='+id;
                    window.location.href=url;
                  })
            }
        }
        new List();
    })
})