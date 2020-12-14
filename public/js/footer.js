// window.addEventListener('load', function () {
$(document).ready(function () {
  $(".p2").on({
    mouseenter: function () {
      $('.wx').stop().fadeIn(200);
    },
    mouseout: function () {
      $('.wx').stop().fadeOut(200);
    }
  });
  $(".p3").on({
    mouseenter: function () {
      $('.zfb').stop().fadeIn(200);
    },
    mouseout: function () {
      $('.zfb').stop().fadeOut(200);
    }
  });
  $(".p4").on({
    mouseenter: function () {
      $('.xcx').stop().fadeIn(200);
    },
    mouseout: function () {
      $('.xcx').stop().fadeOut(200);
    }
  });
});
// })