module game {
    export interface imgSource {
        img: HTMLImageElement
        base64: string
    }
    export interface imgsSource {
        [index: string]: imgSource
    }
    //资源集合
    export class source {
        static images: imgsSource = {};
    }
    //资源加载器
    export class load {
        static image = function (key: string, src: string) {
            source.images[key] = null;
            //加载图片
            common.convertImgToBase64(src, function (img, base64) {
                source.images[key] = {
                    img: img,
                    base64: base64
                }
                console.log("load complete:", key);
                //检查所有资源加载没完
                for (var imgSource in source.images) {
                    if (!source.images[imgSource]) {
                        return;
                    }
                }
                load.onload && load.onload();
            });

        }
        static onload: Function = null;
    }
}
