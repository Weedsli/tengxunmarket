require(['config'],()=>{
    require(['template','url','swiper','header','footer'],(template,url,Swiper)=>{
        class Index{
            constructor(){
                this.banner();
                this.render();
                this.bindEvent();
            }
            banner(){
                // 首页轮播图
                var mySwiper = new Swiper ('.swiper-container', {
                  autoplay: true,
                  loop: true, // 循环模式选项
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true
                },
                
                // 如果需要前进后退按钮
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                  
                }
      
                })
                
            }
            render(){
                $.get(url.ajaxData+'list',data=>{
                    if(data.res_code===1){
                        //console.log(data.res_body);
                        let html=template("moduleRender", {list:data.res_body});
                        $(".bottom").html(html);
                    }
                })
            }
            bindEvent(){
                $(".bottom").on("click","li",function(){
                  let id=$(this).attr("data-id");
                  //console.log(id);
                  let url = '/html/detail.html?id='+id;
                  window.location.href=url;
                })
            } 
        }
        new Index();
    })
})