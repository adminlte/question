
var OpenId = getQueryString('id')
var url = '#' // 跳转链接
var list = [{
    A: '起床后立刻戴镜',
    B: '洗净双手后，妆前戴镜',
    C: '化完全妆后，妆后戴镜',
    key: 'B'
  },
  {
    A: '检查镜片是否有破损和污物',
    B: '确认镜片的正反面',
    C: '用自来水清洗镜片',
    key: 'C'
  },
  {
    A: '不在意柳絮飘落',
    B: '柳絮进眼睛用手揉揉就好',
    C: '戴上太阳镜遮挡',
    key: 'C'
  },
  {
    A: '滴隐形眼镜护理液',
    B: '眨眼缓解',
    C: '闭目休息 ',
    key: 'A'
  },
  {
    A: '直接戴着隐形眼镜蒸桑拿',
    B: '随意，摘不摘都可以',
    C: '摘下隐形眼镜，再蒸桑拿 ',
    key: 'C'
  },
  {
    A: '直接将镜片完全浸泡于 多功能护理液中',
    B: '用多功能护理液搓洗 至少20秒后浸泡于适量护理液',
    C: '将镜片直接放入 “免搓揉”护理液',
    key: 'B'
  },
]
var count = 0
var page = 1
var isReady = true
var isReadyDirect = true

function showIndex() {
  $('.loading').hide()
  // 图片加载完打开的页面
  $('.index').fadeIn('800')
  
  // showPage('lucky-content')
}
function renderQuestion(page) {
  showPage('question-content')
  var html = ''
  html += '<div class="question question' + page + ' full-screen"><div class="main-content">'
  // html += '<img src="./img/q'+page+'-bg.png" alt="" class="question-bg question-bg'+page+'">'
  html += '<img src="./img/q' + page + '-title.png" alt="" class="question-title question-title' + page + '">'
  html += '<ul class="answer-list">'
  var questionList = list[page - 1]
  for (var i in questionList) {
    if (i == 'key') {
      break
    } else {
      html += '<li class="answer-item button-active transition" page="' + page + '" index="' + i + '" key="' + questionList['key'] + '">'
      html += '<i>' + i + '.</i><span>' + questionList[i] + '</span>'
      html += '</li>'
    }
  }
  html += '</ul>'
  html += '</div>'
  html += '</div>'
  $('.question-content').html(html)
}

function roundTips() {
  var list = ['bounceInRight', 'bounceInLeft', 'bounceInUp', 'bounceInDown']
  return list[Math.floor(Math.random() * 3)]
}

function renderTips(page) {
  showPage('tips-content', true)
  var html = ''
  html += '<div class="tips tips' + page + ' full-screen"><div class="main-content"><div class="tip-cover ' + roundTips() + ' absolute">'
  html += '<img src="./img/t' + page + '.png" alt="" class="t-c">'
  if (page == 6) {
    html += '<img src="./img/submit-button.png" alt="" class="submit-button button-active transition">'
  } else {
    html += '<img src="./img/next-button.png" alt="" class="next-button button-active transition" page="' + page + '">'
  }
  html += '</div>'
  html += '</div>'
  html += '</div>'
  $('.tips-content').html(html)
}

function renderResult(count) {
  showPage('result-content', true)
  var html = ''
  html += '<div class="result result' + count + ' full-screen"><div class="main-content"><div class="result-cover absolute">'
  html += '<span class="name">' + $('.input-name').val() + '</span>'
  html += '<img src="./img/r' + count + '.png" alt="" class="r-c">'
  html += '<img src="./img/draw-button.png" alt="" class="url draw-button button-active transition">'
  html += '<img src="./img/qrcode.png" alt="" class="qrcode">'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  $('.result-content').html(html)
}

function checkoutPage(page) {
  isReady = true
  renderTips(page)
}
$('.question-content').on('click', '.answer-item', function (e) {
  if (isReady) {
    isReady = false
    if ($(this).attr('key') == $(this).attr('index')) {
      count++
    }
    checkoutPage($(this).attr('page'))
  }
})

function musicControl() {
  var music = $("audio")[0];
  music.src = "./music/music.mp3"
  music.addEventListener('canplaythrough', function(e){
    music.play()
  }, false);
  document.addEventListener("WeixinJSBridgeReady", function () {
    music.src = "./music/music.mp3"
    music.play()
  }, false)
  $(window).one('click', function () {
    music.play()
    $('.music').removeClass('music-pause')
  })

  if (music.paused) {
    $('.music').removeClass('music-pause')
  } else {
    $('.music').addClass('music-pause')
  }
}

$(function () {
  var imgs = $('img');
  var num = 0;
  imgs.each(function (index) {
    var oimg = new Image();
    oimg.onload = function () {
      num++;
      var count = parseInt((num / imgs.length) * 100);
      $('.load').css('width', count + '%');
      if (count > 95) {
        showIndex()
        musicControl()
      }
    };
    oimg.src = imgs[index].src
  })
  // 播放音乐
  $('.music').on('click', function (e) {
    e.stopPropagation()
    console.log('music')
    if (music.paused) {
      music.play()
      $(this).removeClass('music-pause')
    } else {
      music.pause()
      $(this).addClass('music-pause')
    }
  })
});
$('.index-begin').on('click', function (params) {
  console.log('begin');
  showPage('input-content', true)
});

// 即刻测试护眼值
$('.test-button').on('click', function () {
  var val = $('.input-name').val();
  console.log("OpenId",OpenId)
  if (val) {
    var userData={
      openid:OpenId,
      activeId: "2",
      name: val,
    }
    $.ajax({
      type:"POST",
      contentType: 'application/json;charset=UTF-8',
      data:JSON.stringify(userData),
      url:"http://jiyong.peyesight.cn/view/we_chat/save_junxin",
      datatype: "json ", 
      success:function(data){
        console.log(data)
        renderQuestion(page)
      }, 
      error:function(){
          console.log("失败了")
      }         
   });
   // renderQuestion(page)
  } else {
    $('.input-name').attr('placeholder', '请输入名字')
  }
});
$('.tips-content').on('click', '.next-button', function () {
  console.log(page);
  renderQuestion($(this).attr('page') - 0 + 1)
});
$('.tips-content').on('click', '.submit-button', function () {
  var result = 0;
  switch (count) {
    case 0:
      result = 1
      break
    case 1:
      result = 1;
      break;
    case 2:
      result = 2;
      break;
    case 3:
      result = 2;
      break;
    case 4:
      result = 3;
      break;
    case 5:
      result = 3;
      break;
    case 6:
      result = 4;
      break;
  }
  renderResult(result)
});
$('body').on('touchstart', '.button-active', function () {
  $(this).addClass('button-start')
});
$('body').on('touchend', '.button-active', function () {
  var that = $(this);
  setTimeout(function () {
    that.removeClass('button-start');
  }, 100)
});
$('.result-content').on('touchend', '.draw-button', function () {
  var luckyContent={
    openid: OpenId,
    activeId: 2,
    userId: 13
  }
  $.ajax({
    type:"POST",
    contentType: 'application/json;charset=UTF-8',
    data:JSON.stringify(luckyContent),
    url:"http://jiyong.peyesight.cn/dt1520/startLottery",
    datatype: "json ", 
    success:function(data){
      console.log(data)
      showPage('lucky-content')
    }, 
    error:function(){
        console.log("zcxasdres")
    }         
});


  if (isReadyDirect) {
    showPage('lucky-content')
  }
});
function resetPrizeResult() {
  $('.prize-result0').hide()
  $('.prize-result1').hide()
  $('.prize-result2').hide()
  $('.prize-result3').hide()
  $('.prize-result4').hide()
}
// 关闭转盘结果
$('.close-luck-btn').on('click', function() {
  setTimeout(function(){
    $('.lucky-cover').hide()
    resetPrizeResult()
  }, 300)
})
// 领取礼品
$('.get-luck-btn').on('click', function() {
  console.log('奖品', $(this).data('prize'))
  setTimeout(function(){
    $('.address').show()
    resetPrizeResult()
  }, 300)
})
function showPage(className, showLogo) {
  setTimeout(() => {
    $('.loading').hide()
    $('.index').hide()
    $('.input-content').hide()
    $('.question-content').hide()
    $('.tips-content').hide()
    $('.result-content').hide()
    $('.logo').hide()
    if (showLogo) {
      $('.logo').show()
    }
    $('.' + className).fadeIn('800')
  }, 260)
}
// 输入框弹起软键盘的解决方案
function inputScroll() {
  var bfscrolltop = document.body.scrollTop;
  $('input').focus(function () {
    document.body.scrollTop = document.body.scrollHeight;
  }).blur(function () {
    document.body.scrollTop = bfscrolltop;
  })
}

function __init__() {
  inputScroll();
  // $('.loading').hide()
  $('.index').hide();
  $('.input-content').hide();
  $('.question-content').hide();
  $('.tips-content').hide();
  $('.result-content').hide();
}
__init__();
