window.addEventListener('load', function () {
    var info_left = document.querySelector('.info_left');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    var bigimg = document.querySelector('.bigImg');
    info_left.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    info_left.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    info_left.addEventListener('mousemove', function (e) {
        var x = e.pageX - info_left.offsetLeft;
        var y = e.pageY - info_left.offsetTop;
        maskX = x - mask.offsetWidth / 2;
        maskY = y - mask.offsetHeight / 2;
        var maskmax = info_left.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskmax) {
            maskX = maskmax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskmax) {
            maskY = maskmax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        var bigmax = bigimg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigmax / maskmax;
        var bigY = maskY * bigmax / maskmax;
        bigimg.style.left = -bigX + 'px';
        bigimg.style.top = -bigY + 'px';
    })
})

