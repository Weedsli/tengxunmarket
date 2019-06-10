require(['config'],()=>{
    require(["template","url","header","footer","zoom","fly"],(template,url,header)=>{
        class Detail{
            constructor(){
                this.render();
            }
            render(){
                $.get(url.ajaxData+'detail',data=>{
                    let id=location.search.slice(4);
                    this.data={...data.res_body[0],id};
                    if(data.res_code===1){
                        let html=template('detailContainer',{data:data.res_body[0]});//{data:data}
                        $(".mainContainer").html(html);
                        this.zoom();
                        this.addCart();
                    }
                })
            }
            zoom (){
                // 放大镜插件
                $(".zoom-img").elevateZoom({
                  gallery:'gal1',
                  cursor: 'pointer',
                  galleryActiveClass: 'active',
                  borderSize:'1',    
                  borderColor:'#888'
                });
            }
            addCart(){
                $(".addCart").on("click",(e)=>{
                    $(`<button class="addCart" style='width:20px;height:20px;background:red;border-radius:50%;border:none'>`).fly({
                        start: {
                            left: e.clientX,
                            top: e.clientY
                          },
                          end: {
                            left: $(".cart").offset().left,
                            top: $(".cart").offset().top
                          },
                          onEnd: function () {
                            this.destroy(); //销毁抛物体
                            header.calcCart(); // 调用一次计算购物车数量的方法
                          }
                    });
                    let cartList=localStorage.getItem('cart');
                    // 把数据存localStorage
                    // 先取出来，判断是否为空
                    let num=parseInt($("#number").val());
                    //console.log(num);
                    //console.log(cartList);
                    if(cartList){
                          // 购物车已经存在数据了
                        cartList = JSON.parse(cartList);
        
                        // 判断cartList有没有当前数据
                        // i就是cartList用来存已经存在的这条商品的下标
                        let i = -1;
                        let isExist = cartList.some((cart, index) => {
                        // 每遍历一次i的值都重新赋值为当前下标，直到找到了这条商品，some结束，这个时候i的值就是当前商品这个下标
                        i = index;
                        //console.log(cart);
                        return cart.id === this.data.id;
                        })
                        if (isExist) {
                        // 这条商品已经加过购物车了
                        // 数量累加
                        cartList[i].num += num;
                        } else {
                        // 这条商品还没有加过购物车
                        cartList.push({...this.data,num});
                        }
                        // 逻辑处理完成以后把cartList重新存localStorage里，覆盖之前的
                        localStorage.setItem('cart', JSON.stringify(cartList));
                        //header.calcCart();
                        
                    } else {
                        // 没有存过，购物车为空
                        // var arr = [];
                        // arr[0] = this.detail
                        // let str = JSON.stringify(arr)
                        // localStorage.setItem('cart', str)
                        this.data={...this.data,num};
                        localStorage.setItem('cart', JSON.stringify([this.data]));
                        // header.calcCart();
                    } 
                })
            }
        }
        new Detail();
    })
})