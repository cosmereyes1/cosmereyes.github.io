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
    

    function createSawBlade(x, y){ // created a function called createSawBlade
      var hitZoneSize = 25; // size of the hit zone for saw blade
    var damageFromObstacle = 10; // inflicts 10 damage to hallebot
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone); // creates the saw blade
    var obstacleImage = draw.bitmap("img/sawblade.png");
    sawBladeHitZone.addChild(obstacleImage); // adds saw blade to the background
    obstacleImage.x = -25; // position on the ground
    obstacleImage.y = -25; // position in the air
    }

    function createEnemy(x, y){ // created a function called createEnemy
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap("img/goomba2.png");
      redSquare.x = -25; // position on the ground
      redSquare.y = -25; // position in the air
      enemy.addChild(redSquare); // adds enemy to the background
      enemy.x = x;
      enemy.y = y;
      game.addGameItem(enemy); // creates the enemy
      enemy.velocityX = -4;
      redSquare.scaleX = 0.3
      redSquare.scaleY = 0.3

      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-20);
      };

      enemy.onProjectileCollision = function(){
        game.increaseScore(100); // increases the score by 100
        enemy.fadeOut(); // enemy fades out
      }
    }

    function createReward(x, y){ // created a function called createReward
      var reward = game.createGameItem("enemy", 25);
      var blueSquare = draw.bitmap("img/health2.png");
      blueSquare.x = -25; // position on the ground
      blueSquare.y = -25; // position in the air
      reward.addChild(blueSquare); // adds reward to the background
      reward.x = x; // Changes the x position of the blue square
      reward.y = y; // Changes the y position of the blue square
      game.addGameItem(reward); // creates the reward
      reward.velocityX = -4;
      blueSquare.scaleX = 0.3
      blueSquare.scaleY = 0.3

      reward.onPlayerCollision = function () { // creates a function
        game.changeIntegrity(100);
        reward.fadeOut();
      };

      
    }



      function createMarker(x,y){ // created a function called createMarker
        var marker = game.createGameItem("enemy", 25);
        var yellowSquare = draw.rect(50, 50, "yellow"); // draws a rectamgle for the marker
        yellowSquare.x = -25; // position on the ground
        yellowSquare.y = -25; // position in the air
        marker.addChild(yellowSquare); // adds marker to the background
        marker.x = x; // Changes the x position of the yellow square
        marker.y = y; // Changes the y position of the yellow square
        game.addGameItem(marker); // creates the marker
        marker.velocityX = -4;
  
        marker.onPlayerCollision = function () {
          startLevel(); // starts the level
          marker.shrink(); // shrinks marker
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
