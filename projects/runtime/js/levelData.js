var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 500, y: groundY - 120},
          { type: "sawblade", x: 700, y: groundY - 120},
          { type: "sawblade", x: 900, y: groundY - 120},
          { type: "enemy", x: 800, y: groundY - 50},
          { type: "reward", x: 900, y: groundY - 60},
          { type: "marker", x: 1500, y: groundY - 10},
          { type: "koopa", x: 1100, y: groundY - 50},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 900, y: groundY },
          { type: "redmushroom", x: 1600, y: groundY - 50},
          { type: "enemy", x: 1500, y: groundY - 50},
          { type: "koopa", x: 1800, y: groundY - 50},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
