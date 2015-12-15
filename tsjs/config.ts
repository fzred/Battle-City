module game.config {
    export var
        tankSize = 50,
        missileWH = 10,
        gameCellWidth = 13, //列
        gameCellHeight = 15, //行
        maxWidth = 0,
        maxHeight = 0;

    game.config.maxWidth = config.tankSize * config.gameCellWidth;
    game.config.maxHeight = config.tankSize * config.gameCellHeight;

    export enum troops {
        sentinel, //近卫
        scourge,  //天灾
        neutral //中立
    }
    export enum terrain { //地形
        empty,
        wall,  //土墙
        steel, //钢铁
        water, //水
        grass, //草地
        symbol //玩家基地
    }
    export enum terrainFull { //地形完整程度
        full, //完整
        left, //只有左
        top,
        right,
        bottom,
        LU,
        RU,
        LB,
        RB
    }
    export enum terrainPortion {
        LU, //左上
        RU, //右上
        LB, //左下
        RB  //右下
    }
    export var map = []; //地图配置
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
        map.push(row);
    }


    //基地
    map[config.gameCellHeight - 1][6].type = terrain.symbol;

    map[config.gameCellHeight - 1][5] = {
        type: terrain.wall,
        full: terrainFull.right
    }
    map[config.gameCellHeight - 1][7] = {
        type: terrain.wall,
        full: terrainFull.left
    }

    map[config.gameCellHeight - 2][6] = {
        type: terrain.wall,
        full: terrainFull.bottom
    }

    map[config.gameCellHeight - 2][5] = {
        type: terrain.wall,
        full: terrainFull.RB
    }

    map[config.gameCellHeight - 2][5] = {
        type: terrain.wall,
        full: terrainFull.RB
    }
    map[config.gameCellHeight - 2][7] = {
        type: terrain.wall,
        full: terrainFull.LB
    }


    map[2][5] = {
        type: terrain.steel,
        full: terrainFull.full
    }
    map[2][6] = {
        type: terrain.grass
    }
    map[2][8] = {
        type: terrain.water
    }

    map[1][1] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    map[2][1] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    map[3][1] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    map[4][1] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    map[5][1] = {
        type: terrain.wall,
        full: terrainFull.top
    }
    map[6][0] = {
        type: terrain.steel,
        full: terrainFull.bottom
    }
    map[12][0] = { type: terrain.steel, full: terrainFull.bottom }
    map[7][2] = { type: terrain.steel, full: terrainFull.bottom }

    map[1][3] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    map[2][3] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    map[3][3] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    map[4][3] = {
        type: terrain.wall,
        full: terrainFull.full
    }
    map[5][3] = {
        type: terrain.wall,
        full: terrainFull.top
    }


    map[3][6] = {
        type: terrain.steel,
        full: terrainFull.top
    }
    //end地形初始化

    map[1][12] = { type: terrain.grass };
    map[2][12] = { type: terrain.grass };
    map[3][12] = { type: terrain.grass };
    map[4][12] = { type: terrain.grass };
    map[5][12] = { type: terrain.grass };
    map[6][12] = { type: terrain.grass };
    map[7][12] = { type: terrain.grass };
    map[8][12] = { type: terrain.grass };
    map[9][12] = { type: terrain.grass };
    map[14][11] = { type: terrain.steel, full: terrainFull.top };


    map[9][5] = { type: terrain.steel, full: terrainFull.top };
    map[9][6] = { type: terrain.steel, full: terrainFull.top };
    map[9][7] = { type: terrain.steel, full: terrainFull.top };

    map[10] = [{ type: terrain.steel, full: terrainFull.top }, { type: terrain.grass }, { type: terrain.empty }, { type: terrain.empty }, { type: terrain.water }, { type: terrain.water }, { type: terrain.water }, { type: terrain.water }, { type: terrain.wall }, { type: terrain.steel }, { type: terrain.steel }, { type: terrain.wall }, { type: terrain.grass }];
    map[11][1] = { type: terrain.wall };
    map[11][2] = { type: terrain.wall };
    map[12][3] = { type: terrain.wall, full: terrainFull.top };
    map[12][4] = { type: terrain.wall, full: terrainFull.right };
    map[11][12] = { type: terrain.wall };
    map[12][12] = { type: terrain.grass };
    map[13][12] = { type: terrain.wall };
    map[12][8] = { type: terrain.grass };
    map[12][9] = { type: terrain.grass };
    map[13][10] = { type: terrain.grass };
    map[13][11] = { type: terrain.grass };

    map[14][9] = { type: terrain.wall, full: terrainFull.right };
    map[14][11] = { type: terrain.grass };
    map[14][12] = { type: terrain.steel, full: terrainFull.top };

    map[14][12] = { type: terrain.steel, full: terrainFull.bottom };
    map[8][9] = { type: terrain.steel, full: terrainFull.top };
    map[8][10] = { type: terrain.wall, full: terrainFull.top };
    map[8][11] = { type: terrain.wall, full: terrainFull.top };
    map[7][11] = { type: terrain.wall };
    map[6][11] = { type: terrain.wall };
    map[5][11] = { type: terrain.wall };
}