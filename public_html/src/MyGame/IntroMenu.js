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
}
gEngine.Core.inheritPrototype(IntroMenu, Scene);

IntroMenu.prototype.loadScene = function () {
    
};


IntroMenu.prototype.unloadScene = function () {
    
};

IntroMenu.prototype.initialize = function () {
   this.mCamera = new Camera(vec2.fromValues(50, 50),
                                100,
                                [0, 0, 800, 600]);
    this.logo = new FontRenderable("CatBomb");
    this.logo.setColor([1, 1, 1, 0]);
    this.logo.getXform().setPosition(50, 50);
    this.logo.setTextHeight(5);
};

IntroMenu.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);
    this.mCamera.setupViewProjection();
    
    this.logo.draw(this.mCamera);
};

IntroMenu.prototype.update = function () {
   
};





