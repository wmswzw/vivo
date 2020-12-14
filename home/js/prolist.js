// 根据数据渲染页面中的商品结构

// 开启数据请求，准备请求商品数据
$.ajax({
  url: "data/phone.json",    // 指定商品数据的地址或文件
  success: function (res) {  // 请求成功之后要执行的功能
    // res就是请求成功之后拿到的数据
    // 注意解析
    res = JSON.parse(res);
    // console.log(res);
    // 动态创建结构：字符方式
    // 提前准备一个字符容器，用来存放拼接的字符
    var str = "";
    // 遍历数据
    for (var i = 0; i < res.length; i++) {
      // 不断的累加数据拼接之后的字符
      // 使用了反引号`包裹字符，可以实现字符的换行
      // 反引号字符中的变量，使用固定格式 ${} 包裹
      // 在拼接字符的过程中，将解析出的数据，放在字符的指定位置
      str = str + `<div class="smallPro"><a href="detail/detail.html#${res[i].proId}">
                              <img src="${res[i].src}" alt="">
                              <p>${res[i].name}</p>
                              <p>${res[i].info}</p>
                              <p>￥${res[i].price}</p>
                          </a></div>`
    }
    // console.log(str);
    // 获取原容器的内容
    var d = $(".proCont").html()
    // 将原容器的内容，加上现拼接好的结构，一起放回原容器
    $(".proCont").html(d + str);
  },
  dataType: "text"     // 表示请求的数据，绝对是字符
})