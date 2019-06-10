require.config({
    baseUrl : "/",
    paths : {
      jquery:'libs/jquery/jquery-3.2.1.min',
      header:'js/modules/header',
      footer:'js/modules/footer',
      swiper:'libs/swiper/js/swiper.min',
      template: 'libs/art-template/template-web',
      url: 'js/modules/url',
      cookie:'libs/jquery-plugins/jquery.cookie',
      fly:'libs/jquery-plugins/jquery.fly.min',
      zoom:'libs/jquery-plugins/jquery.elevateZoom-3.0.8.min'
    },
    shim:{
      cookie:{
        deps:['jquery']
      },
      zoom:{
        deps:['jquery']
      },
      fly:{
        deps:['jquery']
      }
    }
  })