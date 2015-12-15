var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var terrain = (function (_super) {
        __extends(terrain, _super);
        function terrain(imgKey, point, opt) {
            _super.call(this, imgKey, point);
            this.isPenetrate = false; //子弹是否可穿过
            this.armor = 1; //护甲  子弹攻击力低无视伤害
            this.troops = game.config.troops.neutral;
            opt && common.extend(this, opt);
        }
        terrain.prototype.draw = function (canvas) {
            _super.prototype.draw.call(this, canvas);
        };
        return terrain;
    })(game.spirit);
    game.terrain = terrain;
})(game || (game = {}));
