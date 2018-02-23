/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(50, 40);
    this.mDye.getXform().setSize(3, 4);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    
    this.mGameObject = new GameObject(this.mDye);
    
    /* TODO */
    // Light object to act as a flashlight
    // Catball object to do throw mechanic
    // Rigidbody to handle jumping and gravity
    
    /* Stretch Goals? */
    // Throwing animation
    
    
    //GameObject.call(this, this.mDye);
    
    //var r = new RigidRectangle(this.mGameObject.getXform(), 3, 4);
    //this.setRigidBody(r);
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
}
//gEngine.Core.inheritPrototype(Hero, WASDObj);

Hero.prototype.update = function () {
    //GameObject.prototype.update.call(this);
    this.mGameObject.update();
};

Hero.prototype.draw = function(aCamera){
    this.mGameObject.draw(aCamera);
};