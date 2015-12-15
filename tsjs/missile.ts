module game {
    export class missile extends spirit {
        constructor(direc: direction, point: point, opt?) {
            super("tankmissile", point);
            opt && common.extend(this, opt);
            this.runingDirection = direc;
        }
        troops: config.troops
        tankId: string;
        draw(canvas: CanvasRenderingContext2D) {
            this.testOutBorderAndOverlap();

            var t = +new Date - this.lastUpdateTime,
                result = t / 1000 * this.run.speed;
            switch (this.runingDirection) {
                case direction.D:
                    this.point.y += result;
                    break;
                case direction.U:
                    this.point.y -= result;
                    break;
                case direction.L:
                    this.point.x -= result;
                    break;
                case direction.R:
                    this.point.x += result;
                    break;
            }
            super.draw(canvas);

            if (scene.testOutBorder(this)) {
                //超出边界，删除
                this.isDel = true;
                return;
            }
            this.testOutBorderAndOverlap();

        }
        runingDirection: direction;
        ATK = 1; //攻击力
        run = {
            speed: 200  //每秒走多少像素
        }

        //测试是否会超出边界或碰撞
        testOutBorderAndOverlap = (): boolean => {
            if (scene.testOutBorder(this)) return;
            var one = this, two, isOverlap;
            for (var t = 0, tlen = scene.spirits.length; t < tlen; t++) {
                two = scene.spirits[t];
                isOverlap = scene.testOverlap(one, two);
                if (two.troops === this.troops && two.constructor !== game.terrain) {
                    //无视与自己队伍的精灵及子弹相撞  但可以破坏自己的基地
                    continue;
                }
                if (two.constructor === game.missile && two.troops !== this.troops && isOverlap) {
                    //双方子弹相撞
                    one.isDel = true;
                    two.isDel = true;
                }
                if (two.constructor === game.tank && two.troops !== this.troops && isOverlap) {
                    //攻击坦克
                    one.isDel = true;
                    two.isDel = true;
                }
                if (two.constructor === game.terrain && isOverlap) {
                    //打到墙壁
                    if (two.isPenetrate) {
                        continue;
                    }
                    if (two.armor > one.ATK) {
                        one.isDel = true;
                        continue;
                    }
                    one.isDel = true;
                    two.isDel = true;
                }
                if (one !== two && scene.testOverlap(one, two)) {
                }
            }

        }
    }
}