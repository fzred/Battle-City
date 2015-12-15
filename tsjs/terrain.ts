module game {
    export class terrain extends spirit {
        constructor(imgKey: string, point: point, opt?) {

            super(imgKey, point)
            opt && common.extend(this, opt);

        }
        isPenetrate = false; //子弹是否可穿过
        armor = 1; //护甲  子弹攻击力低无视伤害
        troops: config.troops = config.troops.neutral
        draw(canvas: CanvasRenderingContext2D) {
            super.draw(canvas);

        }
    }
}