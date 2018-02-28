/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function IntroMenu() {
    this.mCamera = null;
    this.logo = null;
    this.startText = null;
}
gEngine.Core.inheritPrototype(IntroMenu, Scene);

IntroMenu.prototype.loadScene = function () {
    
};


IntroMenu.prototype.unloadScene = function () {
    var start = new MyGame();
    gEngine.Core.startScene(start);
};

IntroMenu.prototype.initialize = function () {
   this.mCamera = new Camera(vec2.fromValues(50, 50),
                                100,
                                [0, 0, 800, 600]);
                                
    this.logo = new FontRenderable("Cat Ball");
    this.logo.setColor([1, 1, 1, 0]);
    this.logo.getXform().setPosition(36, 50);
    this.logo.setTextHeight(5);
    
    this.startText = new FontRenderable("Press space to start!");
    this.startText.setColor([1, 1, 1, 0]);
    this.startText.getXform().setPosition(30, 40);
    this.startText.setTextHeight(3);
    
    //this.myGame = new MyGame();
};

IntroMenu.prototype.draw = function () {
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]);
    this.mCamera.setupViewProjection();
    
    this.logo.draw(this.mCamera);
    this.startText.draw(this.mCamera);
};

IntroMenu.prototype.update = function () {
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        //gEngine.Physics.togglePositionalCorrection();
        this.unloadScene();
    }
};





