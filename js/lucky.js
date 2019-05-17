var OpenId = getQueryString('id')
var degreeList = [-100, -125, -150, -175, -200, -225, -250, -275, -300, -325, -350, -375, -400, -425, -450, -475, -500, -525, -575, -600, -650, -700, -800, -850, -900, -950, -1000]
var luckyIndex = 1; // 中奖位置
// 谢谢 0 2 4 6
// 天天抛 1
// 月抛 3
// 50积分 5
// 护理液 7
var lucky = {
  index: -1, //当前转动到哪个位置，起点位置
  count: 0, //总共有多少个位置
  timer: 0, //setTimeout的ID，用clearTimeout清除
  speed: 20, //初始转动速度
  times: 0, //转动次数
  cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
  prize: -1, //中奖位置
  init: function (id) {
    if ($("#" + id).find(".board-item").length > 0) {
      var $lucky = $("#" + id);
      var $units = $lucky.find(".board-item");
      this.obj = $lucky;
      this.count = $units.length;
      $lucky.find(".board-item" + this.index).addClass("board-active");
    };
  },
  roll: function () {
    var index = this.index;
    var count = this.count;
    var lucky = this.obj;
    $(lucky).find(".board-item" + index).removeClass("board-active");
    index += 1;
    if (index > count - 1) {
      index = 0;
    };
    $(lucky).find(".board-item" + index).addClass("board-active");
    this.index = index;
    return false;
  },
  stop: function (index) {
    this.prize = index;
    return false;
  }
};
function showDegree() {
  $('.degree').show()
  $('.address').addClass('address-more')
  renderDegree('#left')
  renderDegree('#right')
}
function renderDegree(id) {
  var html = ''
  for (var i of degreeList) {
    html += '<option value="'+ i +'">'+ i +'</option>'
  }
  $(id).html(html)
}
function showLuckyResult() {
  console.log('奖品下标=====>', lucky.prize)
  $('.lucky-cover').show()
  $('.degree').hide()
  $('.address').removeClass('address-more')
  switch (lucky.prize) {
    case 0:
      $('.prize-result').hide();
      $('.prize-result0').show();
      console.log('未中奖')
      break;
    case 1:
      $('.prize-result').hide();
      $('.prize-result3').show();
      showDegree()
      console.log('天天抛')
      break;
    case 2:
      $('.prize-result').hide();
      $('.prize-result0').show();
      console.log('未中奖')
      break;
    case 3:
      $('.prize-result').hide();
      $('.prize-result1').show();
      showDegree()
      console.log('月抛')
      break;
    case 4:
      $('.prize-result').hide();
      $('.prize-result0').show();
      console.log('未中奖')
      break;
    case 5:
      // 抽奖抽到积分调用方法
      // $.post(url, {OpenId: OpenId, credits: 50}, function(res) {
      //   $('.prize-result').hide();
      //   $('.prize-result4').show();
      // })
      $('.prize-result').hide();
      $('.prize-result4').show();
      console.log('50积分')
      break;
    case 6:
      $('.prize-result').hide();
      $('.prize-result0').show();
      console.log('未中奖')
      break;
    case 7:
      $('.prize-result').hide();
      $('.prize-result2').show();
      // showDegree()
      console.log('护理液')
      break;
  }
}
function roll() {
  lucky.times += 1;
  lucky.roll(); // 转动过程调用的是lucky的roll方法，这里是第一次调用初始化
  if (lucky.times > lucky.cycle + 10 && lucky.prize == lucky.index) {
    clearTimeout(lucky.timer);
    setTimeout(function() {
      showLuckyResult();
      lucky.prize = -1;
      lucky.times = 0;
    }, 300)
    // click = false; // 只能抽一次
  } else {
    if (lucky.times < lucky.cycle) {
      lucky.speed -= 10;
    } else if (lucky.times == lucky.cycle) {
      // luckyIndex = luckyIndex | Math.random()*(lucky.count);// 中奖物品通过一个随机数生成
      lucky.prize = luckyIndex;
    } else {
      if (lucky.times > lucky.cycle + 10 && ((lucky.prize == 0 && lucky.index == 7) || lucky.prize == lucky.index + 1)) {
        lucky.speed += 110;
      } else {
        lucky.speed += 20;
      }
    }
    if (lucky.speed < 40) {
      lucky.speed = 40;
    };
    lucky.timer = setTimeout(roll, lucky.speed); //循环调用
  }
  return false;
}

var click = false;

function beginDraw() {
  lucky.speed = 100;
  roll(); // 转圈过程不响应click事件，会将click置为false
  click = true;
  return false;
}

window.onload = function () {
  lucky.init('lucky-board');
  $(".begin-draw").click(function () {
    if (click) { // click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
      return false;
    } else {
      // 获奖内容
      // $.post(url, {OpenId: OpenId}, function(res) {
      //   luckyIndex = res.prizeId || 0
      //   beginDraw() // 成功后开始转
      // })
      beginDraw()
    }
  });
  // 确认提交收获信息
  $('.addr-submit').on('click', function() {
    var form = {
      OpenId: OpenId,
      prizeId: luckyIndex,
      name: $('.recipient-name').val(),
      phone: $('.recipient-phone').val(),
      province: $("#expressArea").attr('province') || '',
      city: $("#expressArea").attr('city') || '',
      district: $("#expressArea").attr('district') || '',
      address: $('.detail-addr').val(),
      leftMyopicBrightness: $('#left').val() || '',
      rightMyopicBrightness: $('#right').val() || ''
    }
    // 奖品邮寄信息保存
    $.post({
      url: url,
      data: form,
      success: function(res) {
        $('.lucky-cover').hide()
        $('.address').hide()
      }
    })
    console.log(form)
    // setTimeout(function(){
    //   $('.lucky-cover').hide()
    //   $('.address').hide()
    // }, 300)
  })
};
