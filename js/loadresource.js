var game;
(function (game) {
    //资源集合
    var source = (function () {
        function source() {
        }
        source.images = {};
        return source;
    })();
    game.source = source;
    //资源加载器
    var load = (function () {
        function load() {
        }
        load.image = function (key, src) {
            source.images[key] = null;
            //加载图片
            common.convertImgToBase64(src, function (img, base64) {
                source.images[key] = {
                    img: img,
                    base64: base64
                };
                console.log("load complete:", key);
                //检查所有资源加载没完
                for (var imgSource in source.images) {
                    if (!source.images[imgSource]) {
                        return;
                    }
                }
                load.onload && load.onload();
            });
        };
        load.onload = null;
        return load;
    })();
    game.load = load;
})(game || (game = {}));
