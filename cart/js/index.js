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
if (!onoff) {
  location.href = "../login/index.html";
}

$("#header").load("../public/header.html");
$("#footer").load("../public/footer.html");
// $("#fixbar").load("../public/fixbar.html");

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

// 根据数组的长度，判断，不为空，再进行下一步请求数据
if (msg.length > 0) {
  // 开启请求
  $.ajax({
    url: "../data/all.json",     // 要请求的数据的地址
    dataType: "text",            // 要请求的数据的格式
    success: function (res) {      // 请求成功拿到数据
      // 解析数据
      res = JSON.parse(res)
      // 同时拿到请求的数据和购物车的数据
      // console.log(res)
      // console.log(msg);
      render(res, msg)
    }
  })
}

function delsFn(res, msg) {
  // 点击删除按钮时，删除选中的商品
  $(".dels").click(function () {
    // 创建一个新数组，准备存放剩余数据
    var newMsg = [];
    // 遍历老数据
    for (var i = 0; i < msg.length; i++) {
      // 将flag为false的数据（未选中）放在新数组中
      if (!msg[i].flag) {
        newMsg.push(msg[i]);
      }
    }
    // 将新数据覆盖到localStorage中的数据
    localStorage.setItem("proMsg", JSON.stringify(newMsg));
    // 根据新数据，重新渲染表格的数据区域
    render(res, newMsg);
  })
}
function selAllFn(msg) {
  // 2. 根据全选的状态，决定单个复选框是否被选中
  // 绑定全选的修改事件
  $(".selAll").on("input", function () {
    // 将全选的状态，全部同步给单个复选框的状态
    for (var i = 0; i < msg.length; i++) {
      msg[i].flag = this.checked;
    }

    // 根据全选的状态，决定单个复选框身上的select属性是否为ok
    if (this.checked) {
      $(".selPro").attr("select", "ok");
    } else {
      $(".selPro").attr("select", "");
    }
    // 根据select的状态，决定复选框是否被选中
    isSelect(msg);

    // 以上操作，要同步覆盖到localStorage中的数据
    localStorage.setItem("proMsg", JSON.stringify(msg));

    // 计算总价和总数量
    allPro(msg);
  })
}

function selProFn(msg) {
  // 每次更新选中状态后，一定要同步到数据
  // 单个复选框添加修改事件
  $(".selPro").on("input", function () {
    // 更新数据中的选中状态
    var that = this;
    updateLocal(that, function (i) {
      msg[i].flag = that.checked;
    }, msg)

    // 3. 当所有单个复选框被选中，或有一个未被选中，更新全选的状态
    selectAll(msg)


    // 计算总价和总数量
    allPro(msg);
  })
}

function setFn(msg) {
  // 修改
  $(".set").on("input", function () {
    // 更新数据中的数量
    var that = this;
    updateLocal(that, function (i) {
      msg[i].num = $(that).val();
    }, msg)

    // 计算小计
    $(this).parent().next("td").html('￥' + $(that).val() * $(this).parent().prev().find("span").html());

    // 计算总价和总数量
    allPro(msg);
  })
}

function delFn(msg) {
  // 只有在此处，才能获得删除按钮，才能给删除按钮绑定事件
  $(".del").click(function () {
    // 更新数据中的商品数据
    updateLocal(this, function (i) {
      msg.splice(i, 1);
    }, msg)

    // 删除页面中的元素
    $(this).parent().parent().remove();

    // 计算总价和总数量
    allPro(msg);
    if (msg.length == 0) {
      $("tbody").html(`<tr>
                   <td colspan="7">购物车中无商品，请<a href="../index.html">继续购物</a>...</td>
                   </tr>`
      );
    }
    selectAll(msg);
  })
}
function render(res, msg) {
  // 准备字符容器，用来存放页面结构
  var str = "";
  // 遍历请求到的数据
  for (var i = 0; i < res.length; i++) {
    // 遍历购物车数据
    for (var j = 0; j < msg.length; j++) {
      // 将请求到的数据中的proId和购物车的id作比较
      // 如果id一致，说明当前数据就是需要的商品数据
      if (res[i].proId === msg[j].id) {
        // 拼接商品数据
        str = str + `<tr index="${res[i].proId}">
               <td width=80><input class="selPro" type="checkbox" select="${msg[j].flag ? 'ok' : ''}"></td>
               <td width=100 align="center"><img src="${res[i].src}" alt=""></td>
               <td width=550><a href="http://127.0.0.1:5501/detail/detail.html#${res[i].proId}">${res[i].name}</a></td>
               <td width=150 align="center">￥<span>${res[i].price}</span></td>
               <td width=50 align="center"><input type="number" value="${msg[j].num}" class="set" min=1></td>
               <td width=200 align="center">￥${res[i].price * msg[j].num}</td>
               <td width=70 align="center"><input type="button" value="删除" class="del"></td>
           </tr>`
      }
    }
  }
  // 将拼好之后的商品数据，放入页面指定区域
  $("tbody").html(str);

  if (msg.length == 0) {
    $("tbody").html(`<tr>
                   <td colspan="7">购物车中无商品，请<a href="../index.html">继续购物</a>...</td>
                   </tr>`
    );

  }
  delFn(msg);
  setFn(msg);
  selProFn(msg);
  selAllFn(msg);
  delsFn(res, msg);

  // 选中
  // 1. 初始打开页面时，立即根据数据，渲染选中状态
  // 因为提前在渲染结构时，根据数据中的flag属性，决定当前复选框身上是否有select=ok的属性
  // 选中所有的复选框后，遍历，判断自身是否具有select=ok的属性
  isSelect(msg);

  selectAll(msg);

  // 计算总价和总数量
  allPro(msg);
}

function selectAll(msg) {
  // console.log(msg);
  var onoff = true;
  if (msg.length == 0) {
    $(".selAll")[0].checked = false;
  } else {
    for (var i = 0; i < msg.length; i++) {
      if (!msg[i].flag) {
        onoff = false;
      }
    }
    if (onoff) {
      $(".selAll")[0].checked = true;
    } else {
      $(".selAll")[0].checked = false;
    }
  }


}

// 根据复选框身上的selete是否为ok，决定是否选中当前复选框
function isSelect() {
  for (var i = 0; i < $(".selPro").length; i++) {
    if ($($(".selPro")[i]).attr("select") === "ok") {
      // 如果有，设置当前复选框的状态为选中状态
      $(".selPro")[i].checked = true;
    } else {
      // 如果没有，设置当前复选框的状态为未选中状态
      $(".selPro")[i].checked = false;
    }
  }
}

// 根据传入的元素找到localstorage中对应的数据，执行传入的更新操作
function updateLocal(element, fn, msg) {
  // 获取到当前复选框的商品id
  var id = $(element).parent().parent().attr("index");

  // 从数据中找到当前id所在的索引
  for (var i = 0; i < msg.length; i++) {
    if (msg[i].id === id) {
      break;
    }
  }
  // 根据索引，更新对应的数据
  fn(i);
  // 覆盖localstorage中的数据
  localStorage.setItem("proMsg", JSON.stringify(msg));
}

// 计算总数量和总价功能
function allPro(m) {
  // 初始打开页面就需要计算总数和总价格
  // 定义总数量的初始变量
  var sum = 0;
  // 定义总价的初始变量
  var allPrice = 0;
  // 遍历数据
  for (var i = 0; i < m.length; i++) {
    // 判断选中状态
    if (m[i].flag) {
      // 计算总数量
      sum = sum + m[i].num * 1;
      // 计算总价
      allPrice = allPrice + (m[i].num * m[i].price);
    }
  }
  // 将总数量设置到对应元素内
  $(".sum").find("span").html(sum);
  // 将总价设置到对应元素内
  $(".allPrice").find("span").html(allPrice);

}