var game;
(function (game) {
    var config;
    (function (config) {
        config.tankSize = 50, config.missileWH = 10, config.gameCellWidth = 13, config.gameCellHeight = 15, config.maxWidth = 0, config.maxHeight = 0;
        game.config.maxWidth = config.tankSize * config.gameCellWidth;
        game.config.maxHeight = config.tankSize * config.gameCellHeight;
        (function (troops) {
            troops[troops["sentinel"] = 0] = "sentinel";
            troops[troops["scourge"] = 1] = "scourge";
            troops[troops["neutral"] = 2] = "neutral"; //中立
        })(config.troops || (config.troops = {}));
        var troops = config.troops;
        (function (terrain) {
            terrain[terrain["empty"] = 0] = "empty";
            terrain[terrain["wall"] = 1] = "wall";
            terrain[terrain["steel"] = 2] = "steel";
            terrain[terrain["water"] = 3] = "water";
            terrain[terrain["grass"] = 4] = "grass";
            terrain[terrain["symbol"] = 5] = "symbol"; //玩家基地
        })(config.terrain || (config.terrain = {}));
        var terrain = config.terrain;
        (function (terrainFull) {
            terrainFull[terrainFull["full"] = 0] = "full";
            terrainFull[terrainFull["left"] = 1] = "left";
            terrainFull[terrainFull["top"] = 2] = "top";
            terrainFull[terrainFull["right"] = 3] = "right";
            terrainFull[terrainFull["bottom"] = 4] = "bottom";
            terrainFull[terrainFull["LU"] = 5] = "LU";
            terrainFull[terrainFull["RU"] = 6] = "RU";
            terrainFull[terrainFull["LB"] = 7] = "LB";
            terrainFull[terrainFull["RB"] = 8] = "RB";
        })(config.terrainFull || (config.terrainFull = {}));
        var terrainFull = config.terrainFull;
        (function (terrainPortion) {
            terrainPortion[terrainPortion["LU"] = 0] = "LU";
            terrainPortion[terrainPortion["RU"] = 1] = "RU";
            terrainPortion[terrainPortion["LB"] = 2] = "LB";
            terrainPortion[terrainPortion["RB"] = 3] = "RB"; //右下
        })(config.terrainPortion || (config.terrainPortion = {}));
        var terrainPortion = config.terrainPortion;
        config.map = []; //地图配置
        //地形初始化
        var i, j, row;
        for (i = 0; i < config.gameCellHeight; i++) {
            row = [];
            for (j = 0; j < config.gameCellWidth; j++) {
                row.push({
                    type: terrain.empty,
                    full: terrainFull.full
                });
            }
            config.map.push(row);
        }
        //基地
        config.map[config.gameCellHeight - 1][6].type = terrain.symbol;
        config.map[config.gameCellHeight - 1][5] = {
            type: terrain.wall,
            full: terrainFull.right
        };
        config.map[config.gameCellHeight - 1][7] = {
            type: terrain.wall,
            full: terrainFull.left
        };
        config.map[config.gameCellHeight - 2][6] = {
            type: terrain.wall,
            full: terrainFull.bottom
        };
        config.map[config.gameCellHeight - 2][5] = {
            type: terrain.wall,
            full: terrainFull.RB
        };
        config.map[config.gameCellHeight - 2][5] = {
            type: terrain.wall,
            full: terrainFull.RB
        };
        config.map[config.gameCellHeight - 2][7] = {
            type: terrain.wall,
            full: terrainFull.LB
        };
        config.map[2][5] = {
            type: terrain.steel,
            full: terrainFull.full
        };
        config.map[2][6] = {
            type: terrain.grass
        };
        config.map[2][8] = {
            type: terrain.water
        };
        config.map[1][1] = {
            type: terrain.wall,
            full: terrainFull.full
        };
        config.map[2][1] = {
            type: terrain.wall,
            full: terrainFull.full
        };
        config.map[3][1] = {
            type: terrain.wall,
            full: terrainFull.full
        };
        config.map[4][1] = {
            type: terrain.wall,
            full: terrainFull.full
        };
        config.map[5][1] = {
            type: terrain.wall,
            full: terrainFull.top
        };
        config.map[6][0] = {
            type: terrain.steel,
            full: terrainFull.bottom
        };
        config.map[12][0] = { type: terrain.steel, full: terrainFull.bottom };
        config.map[7][2] = { type: terrain.steel, full: terrainFull.bottom };
        config.map[1][3] = {
            type: terrain.wall,
            full: terrainFull.full
        };
        config.map[2][3] = {
            type: terrain.wall,
            full: terrainFull.full
        };
        config.map[3][3] = {
            type: terrain.wall,
            full: terrainFull.full
        };
        config.map[4][3] = {
            type: terrain.wall,
            full: terrainFull.full
        };
        config.map[5][3] = {
            type: terrain.wall,
            full: terrainFull.top
        };
        config.map[3][6] = {
            type: terrain.steel,
            full: terrainFull.top
        };
        //end地形初始化
        config.map[1][12] = { type: terrain.grass };
        config.map[2][12] = { type: terrain.grass };
        config.map[3][12] = { type: terrain.grass };
        config.map[4][12] = { type: terrain.grass };
        config.map[5][12] = { type: terrain.grass };
        config.map[6][12] = { type: terrain.grass };
        config.map[7][12] = { type: terrain.grass };
        config.map[8][12] = { type: terrain.grass };
        config.map[9][12] = { type: terrain.grass };
        config.map[14][11] = { type: terrain.steel, full: terrainFull.top };
        config.map[9][5] = { type: terrain.steel, full: terrainFull.top };
        config.map[9][6] = { type: terrain.steel, full: terrainFull.top };
        config.map[9][7] = { type: terrain.steel, full: terrainFull.top };
        config.map[10] = [{ type: terrain.steel, full: terrainFull.top }, { type: terrain.grass }, { type: terrain.empty }, { type: terrain.empty }, { type: terrain.water }, { type: terrain.water }, { type: terrain.water }, { type: terrain.water }, { type: terrain.wall }, { type: terrain.steel }, { type: terrain.steel }, { type: terrain.wall }, { type: terrain.grass }];
        config.map[11][1] = { type: terrain.wall };
        config.map[11][2] = { type: terrain.wall };
        config.map[12][3] = { type: terrain.wall, full: terrainFull.top };
        config.map[12][4] = { type: terrain.wall, full: terrainFull.right };
        config.map[11][12] = { type: terrain.wall };
        config.map[12][12] = { type: terrain.grass };
        config.map[13][12] = { type: terrain.wall };
        config.map[12][8] = { type: terrain.grass };
        config.map[12][9] = { type: terrain.grass };
        config.map[13][10] = { type: terrain.grass };
        config.map[13][11] = { type: terrain.grass };
        config.map[14][9] = { type: terrain.wall, full: terrainFull.right };
        config.map[14][11] = { type: terrain.grass };
        config.map[14][12] = { type: terrain.steel, full: terrainFull.top };
        config.map[14][12] = { type: terrain.steel, full: terrainFull.bottom };
        config.map[8][9] = { type: terrain.steel, full: terrainFull.top };
        config.map[8][10] = { type: terrain.wall, full: terrainFull.top };
        config.map[8][11] = { type: terrain.wall, full: terrainFull.top };
        config.map[7][11] = { type: terrain.wall };
        config.map[6][11] = { type: terrain.wall };
        config.map[5][11] = { type: terrain.wall };
    })(config = game.config || (game.config = {}));
})(game || (game = {}));
