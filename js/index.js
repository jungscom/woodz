const albumTracks = [
  {
    title: "Archive. 1",
    tracks: [
      { title: "00:30", video: "https://www.youtube.com/embed/Dcj7IpAljyA" },
      { title: "Super Lazy", video: "https://www.youtube.com/embed/8rwTD02SJrc" },
      { title: "하루살이", video: "https://www.youtube.com/embed/3sPuxzR9ThE" },
      { title: "화근", video: "https://www.youtube.com/embed/MYE5IOcmuaE" },
      { title: "Human Extinction", video: "https://www.youtube.com/embed/elyhLAHsXGg" },
      { title: "비행", video: "https://www.youtube.com/embed/2XwHWfssPfs" },
      { title: "Bloodline", video: "" },
      { title: "Downtown", video: "" },
      { title: "STOP THAT", video: "" },
      { title: "NA NA NA", video: "https://www.youtube.com/embed/ZyICn69p7WE" },
      { title: "몸부림", video: "" },
      { title: "BEEP", video: "" },
      { title: "Plastic", video: "" },
      { title: "GLASS", video: "" },
      { title: "CINEMA", video: "" },
      { title: "사모", video: "" },
      { title: "To My January", video: "" },
    ]
  },
  {
    title: "I'll Never Love Again",
    tracks: [
      { title: "I'll Never Love Again", video: "https://www.youtube.com/embed/4V9isfZVjnI" },
      { title: "Smashing Concrete", video: "https://www.youtube.com/embed/im6Df9xTRno" },
    ]
  },
  {
    title: "AMNESIA",
    tracks: [
      { title: "AMNESIA", video: "" },
      { title: "비하인드", video: "" },
    ]
  },
  {
    title: "OO-LI",
    tracks: [
      { title: "Deep Deep Sleep", video: "https://www.youtube.com/embed/t6Nq1dGcrIY" },
      { title: "Journey", video: "" },
      { title: "Drowning", video: "https://www.youtube.com/embed/NbKH4iZqq1Y" },
      { title: "Busted", video: "" },
      { title: "Who Knows", video: "" },
      { title: "Ready to Fight", video: "" },
      { title: "심연", video: "" },
    ]
  },
  {
    title: "COLORFUL TRAUMA",
    tracks: [
      { title: "Dirt on my leather", video: "" },
      { title: "HIJACK", video: "" },
      { title: "난 너 없이 (I hate you)", video: "" },
      { title: "Better and better", video: "https://www.youtube.com/embed/vGvUA2vKl68" },
      { title: "안녕이란 말도 함께 (Hope to be like you)", video: "" },
    ]
  },
  {
    title: "ONLY LOVERS LEFT",
    tracks: [
      { title: "Multiply", video: "https://www.youtube.com/embed/qmSOA2sPHUU" },
      { title: "Thinkin bout you", video: "" },
      { title: "Sour candy", video: "" },
      { title: "Kiss of fire", video: "" },
      { title: "Chaser", video: "" },
      { title: "WAITING", video: "" },
    ]
  },
  {
    title: "WOOPS!",
    tracks: [
      { title: "방아쇠 (Trigger)", video: "" },
      { title: "BUMP BUMP", video: "https://www.youtube.com/embed/h1ee4sPdaLI" },
      { title: "내맘대로 (On my own)", video: "" },
      { title: "Thanks to", video: "" },
      { title: "Sweater (Feat. 제이미)", video: "" },
      { title: "Tide", video: "" },
    ]
  },
  {
    title: "EQUAL",
    tracks: [
      { title: "LIFT UP", video: "" },
      { title: "Accident", video: "" },
      { title: "파랗게", video: "" },
      { title: "NOID", video: "" },
      { title: "Waikiki (Feat. Colde)", video: "" },
      { title: "BUCK (Feat. 펀치넬로)", video: "" },
      { title: "주마등", video: "" },
    ]
  }
];

$(function(){
  let currentTrack = null;

  // menu btn
  $('.menu_btn').on('click',function(){
    $('.menu_wrap').toggleClass('open');
    $(this).toggleClass('on');
  });

  // menu close
  $('.gnb a').on('click', function(){
    $('.menu_wrap').removeClass('open');
    $('.menu_btn').removeClass('on');
  });

  // header event
  function handleHeader(){
    if(window.innerWidth <= 768){
      $('#top').removeClass('top_on');
      return;
    }

    let scroll = $(window).scrollTop();

    if(scroll > 50){
      $('#top').addClass('top_on');
    }else{
      $('#top').removeClass('top_on');
    }
  }

  $(window).on('scroll', handleHeader);
  $(window).on('resize', handleHeader);

  handleHeader();

  $(window).on('resize', function(){
    if(window.innerWidth > 768){
      $('.menu_wrap').removeClass('open');
      $('.menu_btn').removeClass('on');
    }
  });

  // main banner
  var bannerSwiper = new Swiper(".bannerSwiper", {
    loop: true,
    speed: 1200,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    }
  });

  // album list
  var albumSwiper = new Swiper(".albumSwiper", {
    loop: true,
    centeredSlides: true,
    slidesPerView: 3,
    grabCursor: true,
    speed: 900,
    slideToClickedSlide: true,
    
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: -80,
      depth: 300,
      modifier: 1.2,
      slideShadows: false,
    },
    
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
  });

  renderTracklist(0);

  // 슬라이드 작동 시 트랙리스트 생성
  albumSwiper.on('slideChange', function () {
    let index = albumSwiper.realIndex;

    renderTracklist(index);

    $('.trackList').hide();

    // 슬라이드 시 음악 멈춤
    $('#musicPlayer').attr('src','');
    currentTrack = null;

    $('.albumSlide').removeClass('playing');
    $('.trackList li').removeClass('active');
  });

  function renderTracklist(index){
    const album = albumTracks[index];

    $('.albumTitle').text(album.title);
    let html = "";

    album.tracks.forEach((track, i) => {
      let num = String(i + 1).padStart(2, '0');

      html += `
        <li data-video="${track.video || ""}">
          <span class="trackIcon">
            <span class="trackNum">${num}</span>
            <span class="trackPlay">▶</span>
          </span>
          <span class="trackTitle">${track.title}</span>
        </li>`;
    });

    $('.trackList').html(html);

    // 트랙 7개 이상 2열
    if(album.tracks.length > 10){
      $('.trackList').addClass('twoCol');
    }else{
      $('.trackList').removeClass('twoCol');
    }
  }

  $('.trackToggle').on('click', function(){
    const list = $('.trackList');
    list.stop().slideToggle(300, function(){
    });
  });

  // 음악재생
  $(document).on('click', '.trackList li', function () {
    const video = $(this).data('video');
    const clicked = $(this);

    // 한번 더 클릭 시 정지
    if (currentTrack === clicked[0]){
      $('#musicPlayer').attr('src','');
      currentTrack = null;

      $('.albumSlide').removeClass('playing');

      clicked.removeClass('active');
      clicked.find('.trackPlay').text('▶');

      return;
    }

    // 새 곡 재생
    if(video){
      $('#musicPlayer').attr('src', video + "?autoplay=1");
    }

    $('.trackList li').removeClass('active');
    clicked.addClass('active');

    $('.trackList li .trackPlay').text('▶'); 
    clicked.find('.trackPlay').text('❚ ❚');

    $('.albumSlide').removeClass('playing');
    $('.swiper-slide-active').addClass('playing');

    currentTrack = clicked[0];
  });

  AOS.init({
    duration: 500,  // 애니메이션 지속 시간 (밀리초)
    easing: 'ease-in-out',  // 애니메이션의 이징 함수
    delay: 100,  // 애니메이션 지연 시간 (밀리초)
    offset: 120,  // 스크롤 감지의 시작 위치 (픽셀)
  });
});
