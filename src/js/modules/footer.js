
define(['jquery'],()=>{
    class Footer{
        constructor(){
            this.container=$("footer");
            this.load().then(()=>{
               
            })
        }
        load(){
            return new Promise(resolve=>{
                this.container.load('/html/modules/footer.html',()=>{
                    console.log(456);
                })
            })
        }


    }
    
    return new Footer()
})