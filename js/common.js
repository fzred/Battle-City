var common;
(function (common) {
    var id = 1;
    function newId() {
        return +new Date + "" + id++;
    }
    common.newId = newId;
    function convertImgToBase64(url, callback, outputFormat) {
        var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d'), img = new Image, dataURL;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat || 'image/png');
            canvas = ctx = null;
            img.onload = null;
            callback(img, dataURL);
        };
        img.src = url;
    }
    common.convertImgToBase64 = convertImgToBase64;
    //简单copy ,用于简单的对象, 会抛弃对象的constructor , 另外诸如RegExp对象是无法通过这种方式深复制的
    function simpleClone(source) {
        return JSON.parse(JSON.stringify(source));
        ;
    }
    common.simpleClone = simpleClone;
    function deepCopy(source) {
        var result = {};
        for (var key in source) {
            result[key] = typeof source[key] === 'object' ? common.deepCopy(source[key]) : source[key];
        }
        return result;
    }
    common.deepCopy = deepCopy;
    function getRandomNum(min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }
    common.getRandomNum = getRandomNum;
    function extend(target, source) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        return target;
    }
    common.extend = extend;
    ;
})(common || (common = {}));
