var luckyIndex = 7; // 中奖位置
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

function roll() {
  lucky.times += 1;
  lucky.roll(); // 转动过程调用的是lucky的roll方法，这里是第一次调用初始化
  if (lucky.times > lucky.cycle + 10 && lucky.prize == lucky.index) {
    clearTimeout(lucky.timer);
    lucky.prize = -1;
    lucky.times = 0;
    click = false;
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
  click = true; //一次抽奖完成后，设置click为true，可继续抽奖
  return false;
}
window.onload = function () {
  lucky.init('lucky-board');
  $(".begin-draw").click(function () {
    if (click) { // click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
      return false;
    } else {
      // 这里可以添加请求获取奖品数字
      beginDraw()
    }
  });
};