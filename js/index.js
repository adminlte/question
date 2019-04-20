var list = [
  {
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
    A: '滴眼药水',
    B: '滴专业润眼液',
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

function showIndex() {
  $('.loading').hide()
  $('.index').fadeIn('800')
}
function renderQuestion(page) {
  showPage('question-content')
  var html = ''
  html += '<div class="question question'+ page +' full-screen">'
  // html += '<img src="./img/q'+page+'-bg.png" alt="" class="question-bg question-bg'+page+'">'
  html += '<img src="./img/q'+page+'-title.png" alt="" class="question-title question-title'+page+'">'
  html += '<ul class="answer-list">'
  var questionList = list[page - 1]
  for (var i in questionList) {
    if (i == 'key') {
      break
    } else {
      html += '<li class="answer-item button-active transition" page="'+page+'" index="'+i+'" key="'+questionList['key']+'">'
      html += '<i>'+i+'.</i><span>'+questionList[i]+'</span>'
      html += '</li>'
    }
  }
  html +='</ul>'
  html +='</div>'
  $('.question-content').html(html)
}
function renderTips(page) {
  showPage('tips-content')
  var html = ''
  html += '<div class="tips tips'+ page +' full-screen"><div class="tip-cover absolute">'
  html += '<img src="./img/t'+ page +'.png" alt="" class="t-c">'
  if (page == 6) {
    html += '<img src="./img/submit-button.png" alt="" class="submit-button button-active transition">'
  } else {
    html += '<img src="./img/next-button.png" alt="" class="next-button button-active transition" page="'+page+'">'
  }
  html += '</div>'
  html += '</div>'
  $('.tips-content').html(html)
}
function renderResult(count) {
  showPage('result-content')
  var html = ''
  html += '<div class="result result'+ count +' full-screen"><div class="result-cover absolute">'
  html += '<span class="name">' + $('.input-name').val()+'</span>'
  html += '<img src="./img/r'+ count +'.png" alt="" class="r-c">'
  html += '<img src="./img/draw-button.png" alt="" class="draw-button button-active transition">'
  html += '</div>'
  html += '</div>'
  $('.result-content').html(html)
}
function checkoutPage(page) {
  isReady = true
  renderTips(page)
}
$('.question-content').on('click', '.answer-item', function(e) {
  if (isReady) {
    isReady = false
    if ($(this).attr('key') == $(this).attr('index')) {
      count++
      console.log(count)
    }
    checkoutPage($(this).attr('page'))
  }
})

function musicControl() {
  var music = $("audio")[0];
  music.src = "../music/music.mp3"
  document.addEventListener("WeixinJSBridgeReady", function () {
    music.src = "../music/music.mp3"
    music.play()
  }, false)
  $(window).one('touchstart', function () {
    music.play()
  })
  
  // 播放音乐
  $('.music').click(function () {
    $(this).toggleClass('music-pause')
    if (music.paused) {
      music.play()
    } else {
      music.pause()
    }
  })
}

$(function () {
  var imgs = $('img')
  var num = 0
  imgs.each(function (index) {
    var oimg = new Image()
    oimg.onload = function () {
      num++
      var count = parseInt((num / imgs.length) * 100)
      $('.load').css('width', count+'%')
      if (count == 99 || count == 100) {
        showIndex()
        musicControl()
      }
    }
    oimg.src = imgs[index].src
  })
})
$('.index-begin').on('click', function (params) {
  console.log('begin')
  showPage('input-content')
})
$('.test-button').on('click', function(){
  var val = $('.input-name').val()
  if (val) {
    renderQuestion(page)
  } else {
    $('.input-name').attr('placeholder','请输入名字')
  }
})
$('.tips-content').on('click', '.next-button', function() {
  console.log(page)
  renderQuestion($(this).attr('page') - 0 + 1)
})
$('.tips-content').on('click', '.submit-button', function () {
  var result = 0
  switch (count) {
    case 0:
      result = 1
      break
    case 1:
      result = 1
      break
    case 2:
      result = 2
      break
    case 3:
      result = 2
      break
    case 4:
      result = 3
      break
    case 5:
      result = 3
      break
    case 6:
      result = 4
      break
  }
  console.log(result)
  renderResult(result)
})
function showPage(className) {
  setTimeout(() => {
    $('.loading').hide()
    $('.index').hide()
    $('.input-content').hide()
    $('.question-content').hide()
    $('.tips-content').hide()
    $('.result-content').hide()
    $('.' + className).fadeIn('800')
  }, 200)
}
function __init__() {
  // $('.loading').hide()
  $('.index').hide()
  $('.input-content').hide()
  $('.question-content').hide()
  $('.tips-content').hide()
  $('.result-content').hide()
}
__init__()