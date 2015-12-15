var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var missile = (function (_super) {
        __extends(missile, _super);
        function missile(direc, point, opt) {
            var _this = this;
            _super.call(this, "tankmissile", point);
            this.ATK = 1; //攻击力
            this.run = {
                speed: 200 //每秒走多少像素
            };
            //测试是否会超出边界或碰撞
            this.testOutBorderAndOverlap = function () {
                if (game.scene.testOutBorder(_this))
                    return;
                var one = _this, two, isOverlap;
                for (var t = 0, tlen = game.scene.spirits.length; t < tlen; t++) {
                    two = game.scene.spirits[t];
                    isOverlap = game.scene.testOverlap(one, two);
                    if (two.troops === _this.troops && two.constructor !== game.terrain) {
                        //无视与自己队伍的精灵及子弹相撞  但可以破坏自己的基地
                        continue;
                    }
                    if (two.constructor === game.missile && two.troops !== _this.troops && isOverlap) {
                        //双方子弹相撞
                        one.isDel = true;
                        two.isDel = true;
                    }
                    if (two.constructor === game.tank && two.troops !== _this.troops && isOverlap) {
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
                    if (one !== two && game.scene.testOverlap(one, two)) {
                    }
                }
            };
            opt && common.extend(this, opt);
            this.runingDirection = direc;
        }
        missile.prototype.draw = function (canvas) {
            this.testOutBorderAndOverlap();
            var t = +new Date - this.lastUpdateTime, result = t / 1000 * this.run.speed;
            switch (this.runingDirection) {
                case game.direction.D:
                    this.point.y += result;
                    break;
                case game.direction.U:
                    this.point.y -= result;
                    break;
                case game.direction.L:
                    this.point.x -= result;
                    break;
                case game.direction.R:
                    this.point.x += result;
                    break;
            }
            _super.prototype.draw.call(this, canvas);
            if (game.scene.testOutBorder(this)) {
                //超出边界，删除
                this.isDel = true;
                return;
            }
            this.testOutBorderAndOverlap();
        };
        return missile;
    })(game.spirit);
    game.missile = missile;
})(game || (game = {}));
