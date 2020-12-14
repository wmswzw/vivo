// window.addEventListener('load', function () {
$(function () {
  var boxTop = $(window).height()
  console.log(boxTop);


  $(window).scroll(function () {
    if ($(document).scrollTop() >= boxTop) {
      $(".fixpart4").height(30);
      $(".fixpart4").css("background", "rgba(255, 255, 255, 0.7)");
      $(".fixpart4").mouseenter(function () {
        $(this).css('background', "#eaeaea");
        $(this).css('cursor', "pointer");
      })
    } else {
      $(".fixpart4").height(0).unbind('mouseenter');
      $(".fixpart4").mouseleave(function () {
        $(this).css("background", "rgba(255, 255, 255, 0.7)");
      })
    }
  });
  $(".fixpart4").on("click", function () {
    $("html").stop().animate({
      scrollTop: 0
    });
  });
})

// if(!location.pathname.includes("cart")){
$(".father-plug").mouseenter(function () {
  $(".cart-plugs").stop().fadeIn();
})
$(".father-plug").mouseleave(function () {
  $(".cart-plugs").stop().fadeOut();
})
// console.log("不是");


// 先读取本地存储中的购物车数据
var msg = localStorage.getItem("proMsg");
// 立即判断，决定数据的解析方式
if (msg === null) {
  // 如果为空，设置空数组
  msg = [];
} else {
  // 如果不为空，解析购物车数据，成数组
  msg = JSON.parse(msg)
  // console.log("msg:"+msg);
}
if (msg.length > 2) {
  $(".s-hide").show();
} else {
  $(".s-hide").hide();
}

// 根据数组的长度，判断，不为空，再进行下一步请求数据
if (msg.length > 0) {
  // 开启请求
  console.log("有数据");
  $.ajax({
    url: "../../data/all.json",     // 要请求的数据的地址
    dataType: "text",            // 要请求的数据的格式
    success: function (res) {      // 请求成功拿到数据
      // 解析数据
      res = JSON.parse(res)
      // 同时拿到请求的数据和购物车的数据
      // console.log("res:"+res)
      // console.log(msg.length);
      var str = ``;
      let msglengh = 2;
      if (msg.length < 2) {
        msglengh = msg.length;
      } else {
        msglengh = 2;
      }
      // 遍历请求到的数据
      for (var i = 0; i < res.length; i++) {
        // 遍历购物车数据
        for (var j = 0; j < msglengh; j++) {
          // 将请求到的数据中的proId和购物车的id作比较
          // 如果id一致，说明当前数据就是需要的商品数据
          // console.log('res',res[i].proId);
          // console.log('msg',msg[j].id);
          if (res[i].proId === msg[j].id) {
            // console.log("执行了if");
            // 拼接商品数据
            str = str + `<tr index="${res[i].proId}">
                                            <td><img src="${res[i].src}" alt=""></td>
                                            <td><span>￥</span>${res[i].price}</td>
                                            <td><span>*</span>${msg[j].num}</td>
                                        </tr>`
          }
        }
      }
      // console.log("str:"+str);
      // 将拼好之后的商品数据，放入页面指定区域
      $(".plug-cart").html(str);
    }
  })
}


  // location.href = "http://localhost/元培学院计科大前端实训/NZ001/index.html";
  // }else{
  //     console.log("是");
  // }

// })