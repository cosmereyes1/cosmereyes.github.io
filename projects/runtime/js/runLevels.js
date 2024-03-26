var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    

    function createSawBlade(x, y){
      var hitZoneSize = 25;
    var damageFromObstacle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/sawblade.png");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
    }

    function createEnemy(x, y){
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap("img/goomba2.png");
      redSquare.x = -25;
      redSquare.y = -25;
      enemy.addChild(redSquare);
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy);
      enemy.velocityX = -4;
      redSquare.scaleX = 0.3
      redSquare.scaleY = 0.3

      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-20);
      };

      enemy.onProjectileCollision = function(){
        game.increaseScore(100);
        enemy.fadeOut();
      }
    }

    function createReward(x, y){
      var reward = game.createGameItem("enemy", 25);
      var blueSquare = draw.bitmap("img/health2.png");
      blueSquare.x = -25;
      blueSquare.y = -25;
      reward.addChild(blueSquare);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -4;
      blueSquare.scaleX = 0.3
      blueSquare.scaleY = 0.3

      reward.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(100);
        reward.fadeOut();
      };

      
    }



      function createMarker(x,y){
        var marker = game.createGameItem("enemy", 25);
        var yellowSquare = draw.rect(50, 50, "yellow");
        yellowSquare.x = -25;
        yellowSquare.y = -25;
        marker.addChild(yellowSquare);
        marker.x = x;
        marker.y = y;
        game.addGameItem(marker);
        marker.velocityX = -4;
  
        marker.onPlayerCollision = function () {
          startLevel();
          marker.shrink();
        };
      }

    //function calls

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems 
      for(var i = 0; i < levelObjects.length; i++){
        var element = levelObjects[i];
        if(element.type === "sawblade"){
          createSawBlade(element.x, element.y);
        }
        if(element.type === "enemy"){
          createEnemy(element.x, element.y);
        }
        if(element.type === "reward"){
          createReward(element.x, element.y);
        }
        if(element.type === "marker"){
          createMarker(element.x, element.y);
        }
      }



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
