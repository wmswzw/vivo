$("#footer").load("../public/footer.html");
$("#header").load("../public/header.html");

// 读用户信息
var uMsg = localStorage.getItem("userMsg");
// 解析用户信息
if (uMsg === null) {
  uMsg = [];
} else {
  uMsg = JSON.parse(uMsg);
}
// 查找是否有登录用户
var onoff = false;
for (var i = 0; i < uMsg.length; i++) {
  if (uMsg[i].isLogin === "ok") {
    onoff = true;
    break;
  }
}
// 有登录用户，没有必要重复登录
if (onoff) {
  // 回到首页
  location.href = "../index.html";
}

// 先读数据（读到了，不是第一次，没读到是第一次）
var uMsg = localStorage.getItem("userMsg");
if (uMsg === null) {
  uMsg = [];
} else {
  uMsg = JSON.parse(uMsg);
}

function check_login() {
  var onoff = false
  // 遍历数据
  for (var i = 0; i < uMsg.length; i++) {
    // 比对用户名
    if (uMsg[i].un === $("#user_name").val()) {
      onoff = true
      break;
    }
  }
  // 用户名比对成功
  if (onoff) {
    // 判断密码
    if (uMsg[i].pw === $("#password").val()) {
      alert('登录成功,即将为您调转')
      location.href = '../index.html';
      // 修改当前登录账号的登录状态
      uMsg[i].isLogin = "ok";
      // 以上只是在操作数组，并没有操作数据，重新设置导到覆盖的目的
      localStorage.setItem("userMsg", JSON.stringify(uMsg));
      $("#user_name").val("");
      $("#password").val("");

    }
    else {
      $("#login_form").removeClass('shake_effect');
      setTimeout(function () {
        $("#login_form").addClass('shake_effect')
      }, 1);
      $("#user_name").val("");
      $("#password").val("");

    }
  } else {
    $("#user_name").val("");
    $("#password").val("");
    alert('用户名不存在，请先注册')
    $('form').animate({
      height: 'toggle',
      opacity: 'toggle'
    }, 'slow');
  }
}
function check_register() {
  // 存数据
  if (uMsg.length < 1) {
    // 第一次注册，直接存
    uMsg.push({
      un: $("#r_user_name").val(),
      pw: $("#r_password").val(),
      // em: $("#r_email").val(),
      isLogin: ""
    })
    alert('注册成功,请登录')
    $("#r_user_name").val("")
    $("#r_password").val("")
    $('form').animate({
      height: 'toggle',
      opacity: 'toggle'
    }, 'slow');
  } else {
    // 不是第一次，判断或用户名有没有重复
    var onoff = false;
    for (var i = 0; i < uMsg.length; i++) {
      if (uMsg[i].un === $("#r_user_name").val()) {
        onoff = true;
        break;
      }
    }
    if (onoff) {
      // 重复：注册失败，用户名重复
      alert("注册失败，用户名重复，请换一个")
      $("#r_user_name").val("")
      $("#r_password").val("")
      // $("#r_email").val("")
    } else {
      // 不重复：直接存，注册成功
      uMsg.push({
        un: $("#r_user_name").val(),
        pw: $("#r_password").val(),
        isLogin: ""
      })
      $("#r_user_name").val("")
      $("#r_password").val("")
      alert("注册成功，请登录");
      $('form').animate({
        height: 'toggle',
        opacity: 'toggle'
      }, 'slow');
    }
  }
  localStorage.setItem("userMsg", JSON.stringify(uMsg));
}



$(function () {
  $("#create").click(function () {
    check_register();
    return false;
  })
  $("#login").click(function () {
    check_login();
    return false;
  })
  $('.message a').click(function () {
    $('form').animate({
      height: 'toggle',
      opacity: 'toggle'
    }, 'slow');
  });
})