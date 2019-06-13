require(['config'],()=>{
    require(['template','url','pagination','header','footer'],(template,url)=>{
        class List{
            constructor(){
                this.pagination();
                this.render(1);
                this.bindEvent();
            }
            pagination(){
                let _this=this;
                $.get(url.ajaxData+'list2',data=>{
                    let totalData=data.res_body.length;
                    $('.M-box11').pagination({
                        mode: 'fixed',
                        totalData:totalData,//数据总条数
                        pageCount:totalData/4,//总页数
                        current:1,//当前第几页
                        showData:8,	//每页显示的条数
                        callback:function (api) {
                            //api.setPageCount(page);//设置总页数
                            console.log(api.getCurrent());//获取当前页是第几页
                            var current=api.getCurrent();
                            _this.render(current);
                            //api.getPageCount();//获取总页数
                        }
                    });
                })
                
            }
            render(current){
                $.get(url.ajaxData+'list2',data=>{
                    if(data.res_code===1){
                        let html=template("moduleRender",{list:data.res_body.slice((current-1)*8,(current-1)*8+8)});
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