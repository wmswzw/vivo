$("#footer").load("public/footer.html");
$("#header").load("public/header.html");
$("#rotation").load("home/rotation.html");
$("#prolist").load("home/prolist.html");
$("#fixbar").load("public/fixbar.html");
$("#vshopping").load("home/vshopping.html");
$(document).ready(function () {
  var purl = '';
  var flag = true;
  $(".li1").mouseenter(function () {
    purl = "data/phone.json";
    req(purl);
  });
  $(".li2").mouseenter(function () {
    purl = "data/charge.json";
    req(purl);
  });
  $(".li3").mouseenter(function () {
    purl = "data/parts.json";
    req(purl);
  });
  $(".li4").mouseenter(function () {
    purl = "data/headset.json";
    req(purl);
  });
  $(".li5").mouseenter(function () {
    purl = "data/smart.json";
    req(purl);
  });
  $(".li6").mouseenter(function () {
    purl = "data/gamephoto.json";
    req(purl);
  });
  $(".li7").mouseenter(function () {
    purl = "data/daily.json";
    req(purl);
  });

  $(".broul").mouseenter(function () {
    $(".plug").stop().fadeIn(200);
  })
  $(".broul").mouseleave(function () {
    $(".plug").stop().fadeOut(200);
  })

  // 若plug非broul子标签的实现方法，但这两者必须相邻或一部分重合
  // $(".broul").hover(function () {
  //     $(".plug").stop().fadeIn(200);
  // }, function () {
  //     $(".plug").stop().fadeOut(200)
  // })
  // $(".plug").hover(function () {
  //     $(".plug").stop().show;
  // }, function () {
  //     $(".plug").stop().fadeOut(200)
  // })
  var req = function (purl) {
    $.ajax({
      url: purl,
      success: function (res) {
        res = JSON.parse(res);
        $(".plug").stop().fadeIn(200);
        // console.log(purl);
        $(".plug").css('display', 'flex');
        var str = "";
        // 遍历数据
        for (var i = 0; i < 2; i++) {
          str = str + `<a href="detail/detail.html#${res[i].proId}"><div class="pro">
                            <img src="${res[i].src}" alt="">
                            <p>${res[i].name}</p>
                        </div></a>`
        }
        $(".plug").html(str);
      },
      dataType: "text"
    })
  };
});