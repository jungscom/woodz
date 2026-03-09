$(function(){
  // menu
  const btn = $('.menu_btn');

  $(btn).on('click',function(){
    $('.menu_wrap').toggleClass('open');
    $(this).toggleClass('on');
  });

  // main banner
  var bannerSwiper = new Swiper(".bannerSwiper", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
  });

  // album list
  var albumSwiper = new Swiper(".albumSwiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 0,
    grabCursor: true,
    speed: 800,
    
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: -80,
      depth: 500,
      modifier: 1.2,
      slideShadows: false,
    },
    
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
  });
  
  // header event
  function handleHeader(){
    if(window.innerWidth <= 768){
      $('#top').removeClass('top_on');
      return;
    }

    let scroll = $(window).scrollTop();

    if(scroll > 100){
      $('#top').addClass('top_on');
    }else{
      $('#top').removeClass('top_on');
    }
  }

  $(window).on('scroll', handleHeader);
  $(window).on('resize', handleHeader);

  $(window).on('resize', function(){
    if(window.innerWidth > 768){
      $('.menu_wrap').removeClass('open');
      $('.menu_btn').removeClass('on');
    }
  });
});
