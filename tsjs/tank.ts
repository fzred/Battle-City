module game {
    export enum direction {
        U,
        D,
        R,
        L
    }
    export class tank extends spirit {
        troops: config.troops
        ATK = 1; //攻击力
        constructor(imgKey: string, troops: config.troops, point: point, opt?) {
            super(imgKey, point);
            opt && common.extend(this, opt);
            this.run.speed = this.point.width / 2;
            this.troops = troops;
        }


        draw(canvas: CanvasRenderingContext2D) {
            if (this.run.isRuning) {

                var t = +new Date() - this.run.startRunTime,  //花的时间
                    result,
                    isComplete = false;
                if (t > this.run.sTime) {
                    result = this.run.endPoint;

                    isComplete = true;
                } else {
                    result = this.run.speed * t / this.run.sTime;
                    if (this.run.endPoint < this.run.startPoint) {
                        result = this.run.startPoint - result;
                    } else {
                        result = this.run.startPoint + result;
                    }
                }


                if (this.runingDirection === direction.R || this.runingDirection === direction.L) {
                    this.point.x = result;
                }
                if (this.runingDirection === direction.U || this.runingDirection === direction.D) {
                    this.point.y = result;
                }
                if (isComplete) {
                    //每次走完，执行下一次路程
                    this.run.isRuning = false;
                    if (this.nextMove) {
                        //this.nextMove();
                        this.nextMove = null;
                    }
                }


            }

            if (this.troops === config.troops.scourge) {
                //天灾军团... 电脑玩家

                //保持直线前进，发生碰撞时转弯
                if (this.runingDirection === direction.R) {
                    this.moveR();
                }
                if (this.runingDirection === direction.L) {
                    this.moveL();
                }
                if (this.runingDirection === direction.U) {
                    this.moveU();
                }
                if (this.runingDirection === direction.D) {
                    this.moveD();
                }
                //发射子弹
                this.attack();
            }
            super.draw(canvas);
        }

        //#region 移动


        run = {
            speed: 0,  //每步走多少像素
            sTime: 200,//每步需要多少时间
            startPoint: 0,
            endPoint: 0,
            startRunTime: 0,
            isRuning: false
        }

        runingDirection = direction.U;
        moveL() {
            if (this.run.isRuning) {
                this.nextMove = this.moveL;
                return;
            }
            this.rotate = 270;
            this.move(this.point.x, -this.run.speed, direction.L);
        }

        moveR() {
            if (this.run.isRuning) {
                this.nextMove = this.moveR;
                return;
            }
            this.rotate = 90;
            this.move(this.point.x, this.run.speed, direction.R);
        }

        moveU() {
            if (this.run.isRuning) {
                this.nextMove = this.moveU;
                return;
            }
            this.rotate = 0;
            this.move(this.point.y, -this.run.speed, direction.U);
        }

        moveD() {
            if (this.run.isRuning) {
                this.nextMove = this.moveD;
                return;
            }
            this.rotate = 180;
            this.move(this.point.y, this.run.speed, direction.D);
        }
        private nextMove;
        private move(start, speed, direc: direction) {


            this.run.startPoint = start;
            this.run.endPoint = start + speed;
            this.runingDirection = direc;

            var sourcePoint = common.simpleClone(this.point);

            if (this.runingDirection === direction.R || this.runingDirection === direction.L) {
                this.point.x = this.run.endPoint;
            }
            if (this.runingDirection === direction.U || this.runingDirection === direction.D) {
                this.point.y = this.run.endPoint;
            }
            if (this.testOutBorderAndOverlap(this)) {
                this.point = sourcePoint;
                if (this.troops === config.troops.scourge) {
                    //天灾军团... 电脑玩家
                    this.runingDirection = [direction.U, direction.D, direction.R, direction.L][common.getRandomNum(1, 4) - 1];
                }

                return;
            }
            this.point = sourcePoint;

            this.run.startRunTime = +new Date();
            this.run.isRuning = true;

        }
        //测试是否会超出边界或碰撞
        testOutBorderAndOverlap = (spirit): boolean => {
            if (scene.testOutBorder(spirit)) return true;
            var one = spirit, two;
            for (var t = 0, tlen = scene.spirits.length; t < tlen; t++) {
                two = scene.spirits[t];
                if (two.constructor === game.missile && two.troops === this.troops) {
                    //自己队伍的子弹可以穿过自己
                    continue;
                }
                if (one !== two && scene.testOverlap(one, two)) {
                    return true;
                }
            }

            return false;
        }

        //#endregion

        //#region 攻击
        attackIntervale = 500  //发射间隔
        lastAttackTime = 0; //最后发射时间
        attack() {
            if (+new Date() - this.lastAttackTime < this.attackIntervale) {
                return;
            }
            this.lastAttackTime = +new Date;
            var x, y;
            //计算子弹发射位置
            switch (this.runingDirection) {
                case direction.D:
                    x = this.point.x + this.point.width / 2 - config.missileWH / 2;
                    y = this.point.y + this.point.height;
                    break;
                case direction.U:
                    x = this.point.x + this.point.width / 2 - config.missileWH / 2;
                    y = this.point.y;
                    break;
                case direction.L:
                    x = this.point.x;
                    y = this.point.y + this.point.height / 2 - config.missileWH / 2;
                    break;
                case direction.R:
                    x = this.point.x + this.point.width;
                    y = this.point.y + this.point.height / 2 - config.missileWH / 2;
                    break;
            }
            scene.addSpirit(new missile(this.runingDirection, {
                height: config.missileWH,
                width: config.missileWH,
                x: x,
                y: y
            }, {
                    troops: this.troops,
                    tankId: this.id,
                    ATK: this.ATK
                }));
        }

        //#endregion
    }
}