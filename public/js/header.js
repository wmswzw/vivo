// window.addEventListener('load', function () {

$(".middle").hover(function () {
  $(".hide").stop().slideDown(200);
}, function () {
  $(".hide").stop().slideUp(200);
})
$(".hide").hover(function () {
  $(".hide").stop().show;
}, function () {
  $(".hide").stop().slideUp(200);
})
$(".middle").mouseenter(function () {
  // window.location.reload(); 
  req();
});


var req = function () {
  $.ajax({
    url: "../../data/phone.json",
    success: function (res) {
      res = JSON.parse(res);
      $(".hide").css('display', 'flex');
      var str = "";
      // 遍历数据
      for (var i = 0; i < 4; i++) {
        str = str + `<div class="hidepro"><a  href="../../detail/detail.html#${res[i].proId}">
                                <img src="${res[i].src}" alt="">
                                <p>${res[i].name}</p>
                                <p>${res[i].info}</p>
                            </a></div>`
      }
      $(".hide").html(str);
    },
    dataType: "text"
  })
};
$(".hide").on("click", ".hidepro", function () {
  setTimeout(function () {
    window.location.reload();
  }, 300);
});

// 读用户信息
var uMsg = localStorage.getItem("userMsg");
// 解析用户信息
if (uMsg === null) {
  uMsg = [];
} else {
  uMsg = JSON.parse(uMsg);
}
// 判断是否有登录用户
var onoff = false;
for (var i = 0; i < uMsg.length; i++) {
  if (uMsg[i].isLogin === "ok") {
    onoff = true;
    break;
  }
}
// 没有登录用户，回到首页，因为没有登录，不能打开购物车
if (onoff) {
  $(".login").html(uMsg[i].un + "(前往购物车)");
} else {
  $(".login").html("立即登录");
}

$(".father-login").mouseenter(function () {
  if ($(".login").html() !== "立即登录") {
    $(".float-login").stop().fadeIn(200);
  }

});
$(".father-login").mouseleave(function () {
  $(".float-login").stop().fadeOut(200);
});
$(".float-login").find("a").click(function () {
  // 将登录标志，清空
  uMsg[i].isLogin = "";
  // 将数据覆盖回去
  localStorage.setItem("userMsg", JSON.stringify(uMsg));
  // 判断当前页面是否在购物车页面，如果在购物车页面，那么退出之后，自动回到首页，非购物车页面，无序切换到首页
  localStorage.removeItem("proMsg");
  if (location.pathname.includes("cart")) {
    location.href = "../../login/index.html";
  } else {
    $(".login").html("立即登录");
    $(".float-login").hide();
  }



});
if (location.pathname.includes("login")) {
  $(".login").html("");
}

if ($(".login").html() === "立即登录") {
  // console.log('立即登录');
  $(".login").parent().attr('href', '../../login/index.html');
} else {
  // console.log('前往购物车');
  $(".login").parent().attr('href', '../../cart/index.html');
}
// })