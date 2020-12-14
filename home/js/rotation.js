// 用来标记当前图片的索引
var i = 0;
// 用来保存计时器，方便清除
var t = null;
// 获取当前图片的总数
var len = $(".roimg").find("img").length;
// 开启自动播放
autoPlay();

// =========================

// 提前创建小圆点的容器
var bList = $("<ul class='roimgList'>");
// 根据图片的个数，创建对应个小圆点
for (var j = 0; j < len; j++) {
  bList.append($("<li>"));
}
// 将小圆点的容器，放置在轮播图的容器中
$(".roimg").append(bList);
// 设置小圆点的默认样式
setActive();

// =========================

// 添加小圆点的点击事件
bList.children("li").click(function () {
  // 点击时获取点击的小圆点的索引
  var index = $(this).index();

  // 设置要隐藏的图片的效果
  $(".roimg").find("img").eq(i).stop().fadeOut();
  // 设置要显示的图片的效果
  $(".roimg").find("img").eq(index).stop().fadeIn();

  // 点击之后，当前这次的点击的索引，就是下次要离开的图片的索引
  i = index;

  // 修改小圆点的样式
  setActive();
})

// =========================

// 鼠标进入停止
$(".roimg").mouseenter(function () {
  // 清除计时器
  clearInterval(t);
})
// 鼠标离开继续
$(".roimg").mouseleave(function () {
  // 重新开启自动播放
  autoPlay()
})


// 拓展作业：给每个小圆点添加事件，点击可以切换对应的图片


// 自动播放的功能
function autoPlay() {
  clearInterval(t);
  // 开启计时器
  t = setInterval(function () {
    // 计算索引
    if (i === len - 1) {    // 如果索引已经是最后一张
      // 下次要还原成第一张
      i = 0;
    } else {
      // 默认索引增加
      i++;
    }

    // 设置要隐藏的图片的效果
    $(".roimg").find("img").eq(i - 1).stop().fadeOut();
    // 设置要显示的图片的效果
    $(".roimg").find("img").eq(i).stop().fadeIn();

    // 修改小圆点的默认样式
    setActive()

  }, 4000);
}

// 设置默认样式的功能
function setActive() {
  // 找到当前小圆点，设置成白色
  bList.children("li").eq(i).css({
    background: "#fff"
  }).siblings("li").css({ // 找到其他小圆点，设置成灰色
    background: "rgba(200,200,200,0.5)"
  })
}