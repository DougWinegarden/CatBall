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

function Hero(spriteTexture, x, y) {
    this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(x, y);
    this.mDye.getXform().setSize(3, 4);
    this.mDye.setElementPixelPositions(0, 128, 0, 128);
    
    //this.mGameObject = new GameObject(this.mDye);
    GameObject.call(this, this.mDye);
    
    //this.mRigidBody = new RigidRectangle(this.mGameObject.getXform(), 3, 4);
    //this.setRigidBody(r);
    //this.toggleDrawRenderable();
    //this.toggleDrawRigidShape();
    
    
    
    var r = new RigidRectangle(this.getXform(), 3, 4);
    this.setRigidBody(r);
    
    this.jumping = false;
    
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
    
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    
    // need to set its angular velocity to 0 every frame so it always stands
    // up straight:
    //RigidShape.prototype.setAngularVelocity = function(w) { this.mAngularVelocity = w; };
    
    this.getRigidBody().setAngularVelocity(0);
    
    GameObject.prototype.update.call(this);
    
    // this if statement is needed so that the player cannot jump again
    // at the apex of their jump arc
    if(this.getRigidBody().getVelocity()[1] >= -0.3 &&
            this.getRigidBody().getVelocity()[1] <= 0.25){
                
                this.jumping = false;
    }
    //this.mGameObject.update();
};

Hero.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
}

Hero.prototype.moveLeft = function(){
    this.getXform().incXPosBy(-this.kDelta);
    //adjustPositionBy = function(v, delta) {
    //this.getRigidBody().adjustPositionBy(this.getXform().getPosition(), this.kDelta);
}

Hero.prototype.moveRight = function(){
    this.getXform().incXPosBy(this.kDelta);
}

Hero.prototype.jump = function(){
    // There should be an additional check that the hero's bottom bounding 
    // box is colliding with something else, or else you will be able to
    // jump at the apex of the jump arc -- -- however I have fixed this issue
    // by adding this.jumping. see this.update for more details.. Still might
    // work better with the bounding box check, as jumping isn't currently "snappy"
    
    // logs the player's vertical velocity for testing purposes
    console.log(this.getRigidBody().getVelocity()[1]);
    
    
    if(this.getRigidBody().getVelocity()[1] >= -1.6 &&
            this.getRigidBody().getVelocity()[1] <= 0.25 && !this.jumping){
        
        this.jumping = true;
        this.getRigidBody().setVelocity(0, 20);
        
    }
}