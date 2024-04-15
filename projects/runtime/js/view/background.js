var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
      
        var tree; // spawns the tree
        var buildings = []; // spawns the buildings


        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#12E9F8'); // background color and shapes
            background.addChild(backgroundFill); // fills in the background
            
            // TODO 2: - Add a moon and starfield
            
            for(var stars = 0; stars < 200; stars++){ // for loop for stars
                var circle = draw.circle(2.5, "white", "yellow", 2); // draws the stars into the background
                circle.x = canvasWidth * Math.random(); // width of the stars
                circle.y = groundY * Math.random(); // how high the stars are
                background.addChild(circle); // adds the stars to the background

            }
            
            var moon = draw.bitmap("img/moon.png"); // image of the moon
            moon.x = canvasWidth - 250; // tells how wide it is
            moon.y = groundY - 350; // how high the moon is
            moon.scaleX = 0.5; // enhences the width of the moon
            moon.scaleY = 0.5; // enhances the height of the moon
            background.addChild(moon); // adds the moon to the background

            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) { // creates a for loop
                var buildingHeight = 300 * Math.random(); // height of the buildings
                var building = draw.rect(75, buildingHeight, "tan", "Black", 1); // creates a building and color
                building.x = 350 * i; // where the building is
                building.y = groundY - buildingHeight; // subtract height of the building
                background.addChild(building); // adds the buildings to the background
                buildings.push(building); // pushes the building
              }
              
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); // image for tree
            tree.x = canvasWidth - 225; // how wide the tree is
            tree.y = groundY - 225; // position of the tree/ how high it is
            background.addChild(tree); // adds the tree to the background

            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 4; // trees x position
            if(tree.x < -300){ // if statements for var tree.x
                tree.x = canvasWidth // width of trees
            }

          
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) { // for loop for buildings
                var building = buildings[i]; // creates the buildings
              building.x = building.x - 1; // buildings x position
            if(building.x < -100){ // if statement for var building.x
                building.x = canvasWidth; // width of buildings
            }
              
              }
        
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
