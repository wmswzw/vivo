$("#footer").load("../public/footer.html");
$("#header").load("../public/header.html");
$("#fixbar").load("../public/fixbar.html");

const hash = location.hash.slice(1);
$.ajax({
  url: "../data/all.json",
  dataType: "text",
  success: function (res) {
    res = JSON.parse(res);
    for (let i = 0; i < res.length; i++) {
      if (res[i].proId === hash) {
        $(".info_left").find("img").attr("src", res[i].src);
        $(".info_right").find("h3").html(res[i].name);
        $(".info_right").find("p").eq(0).html(res[i].info);
        $(".info_right").find("p").eq(1).html(res[i].price);
        $(".big").find("img").attr("src", res[i].src);
      }
    }
  }
})

// 加入购物车功能
// 存数据
// 一个购物车可以存储多个商品
// [{id:"1233",num:3},{id:"jg234",num:5},{id:"871rj",num:1}...]

// 提前读取数据:proMsg
// 读取将来计划要存的名字:proMsg
var msg = localStorage.getItem("proMsg");
// 判断是否曾经存过数据
if (msg === null) {
  // 没有存过，设置空数组
  msg = [];
} else {
  // 存过，转成数组
  msg = JSON.parse(msg);
}
// 点击按钮
$(".addPro").click(function () {

  var uMsg = localStorage.getItem("userMsg");
  // 解析用户信息
  if (uMsg === null) {
    uMsg = [];
  } else {
    uMsg = JSON.parse(uMsg);
  }
  // 判断是否有登录用户
  var flag = false;
  for (var i = 0; i < uMsg.length; i++) {
    if (uMsg[i].isLogin === "ok") {
      flag = true;
      break;
    }
  }
  // 加入购物车时，也需要判断是否登录，没有登录，不能加入购物车
  if (flag) {
    // 判断数组是否是空
    if (msg.length < 1) {
      // 如果是空，第一次存：直接存
      msg.push({
        id: location.hash.slice(1),
        num: 1,
        flag: true,
        price: $(".findBug").html()
      })
      // 存储到localstorage
      localStorage.setItem("proMsg", JSON.stringify(msg))
    } else {
      // 如果不是空，非第一次存：判断这次的数据是不是新的
      // 记录是否是老商品的状态
      var onoff = false;
      // 遍历数据
      for (var i = 0; i < msg.length; i++) {
        // 判断当前点击的商品是否在数据中找到
        if (msg[i].id === location.hash.slice(1)) {
          // 如果找到了，记录下来
          onoff = true
          // 停止遍历
          break;
        }
      }
      // 循环结束，判断状态是否被记录
      if (onoff) {
        // 如果状态记录了，老的数据，增加老数据的数量
        msg[i].num++;
      } else {
        // 如果状态没有记录，新的数据，增加一个新数据
        msg.push({
          id: location.hash.slice(1),
          num: 1,
          flag: true,
          price: $(".findBug").html()
        })
      }
      // 存储到localstorage
      localStorage.setItem("proMsg", JSON.stringify(msg));
    }
    alert('该商品添加成功');
    location.reload()

  } else {
    location.href = "../login/index.html";
  }

})

$(".gotoCart").click(function () {

  var uMsg = localStorage.getItem("userMsg");
  // 解析用户信息
  if (uMsg === null) {
    uMsg = [];
  } else {
    uMsg = JSON.parse(uMsg);
  }
  // 判断是否有登录用户
  var flag = false;
  for (var i = 0; i < uMsg.length; i++) {
    if (uMsg[i].isLogin === "ok") {
      flag = true;
      break;
    }
  }
  // 加入购物车时，也需要判断是否登录，没有登录，不能进入购物车
  if (flag) {
    location.href = "../cart/index.html";
  } else {
    location.href = "../login/index.html";
  }
})