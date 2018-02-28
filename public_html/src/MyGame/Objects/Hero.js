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

function Hero(spriteTexture, spriteJSON, x, y, playerNum) {
    this.playerNum = playerNum;
    
    
    this.kDelta = 0.3;
    //this.canJump = false;
    this.jumping = false;
    //this.holding = true;
    this.catBall = null;
    
    // player 1 faces the right, player 2 starts facing left
    this.facingRight;
    if(playerNum == 1){
        this.facingRight = true;
    } else if(playerNum = 2){
        this.facingRight = false;
    }
    
    var JSONParse = new JSONSpriteParser(spriteJSON, spriteTexture);
    this.currentAnimation = new SpriteAnimateRenderable(spriteTexture);
    
    this.currentAnimation.setColor([1, 1, 1, 0]);
    this.currentAnimation.getXform().setPosition(x, y);
    this.currentAnimation.getXform().setSize(3, 3);

    this.frameArray = JSONParse.mSpriteJSON.frames;
    this.currentAnimation.setSpriteSequence(
            1024 - this.frameArray[0].frame.y,
            this.frameArray[0].frame.x,
            128,
            128,
            this.frameArray[0].frame.w / 128,
            0 //no padding
            );
    this.currentAnimation.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.currentAnimation.setAnimationSpeed(20);
    GameObject.call(this, this.currentAnimation);
    
    
    
    // create and draw the rigidbody
    var r = new RigidRectangle(this.getXform(), 3, 3);
    this.setRigidBody(r);
    //this.toggleDrawRigidShape();
    
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.setCatBall = function(catball){
    this.catBall = catball;
}

Hero.prototype.update = function () {
    
    /*
    if(this.playerNum == 1){
        console.log("jumping: " + this.jumping + ", facingRight: " + this.facingRight
                + " holding: " + this.catBall.isHeld());
        
    }
    */
    
    //this.updateAnimationStatus();
    this.currentAnimation.updateAnimation();
    this.getRigidBody().setAngularVelocity(0);
    GameObject.prototype.update.call(this);
};

Hero.prototype.updateAnimationStatus = function(){
    
    if(this.jumping && this.facingRight && this.catBall.isHeld()){
        this.changeAnim(5);
    } else if (this.jumping && this.facingRight && !this.catBall.isHeld()){
        this.changeAnim(7);
    } else if (this.jumping && !this.facingRight && this.catBall.isHeld()){
        this.changeAnim(4);
    } else if (this.jumping && !this.facingRight && !this.catBall.isHeld()){
        this.changeAnim(6);
    } else if (!this.jumping && this.facingRight && this.catBall.isHeld()){
        this.changeAnim(11);
    } else if (!this.jumping && !this.facingRight && this.catBall.isHeld()){
        this.changeAnim(9);
    } else if (!this.jumping && this.facingRight && !this.catBall.isHeld()){
        this.changeAnim(10);
    } else if (!this.jumping && !this.facingRight && !this.catBall.isHeld()){
        this.changeAnim(8);
    }
    
}

Hero.prototype.changeAnim = function(i){
    this.currentAnimation.setSpriteSequence(
            1024 - this.frameArray[i].frame.y,
            this.frameArray[i].frame.x,
            128,
            128,
            this.frameArray[i].frame.w / 128,
            0 //no padding
            );
}

Hero.prototype.draw = function(aCamera){
    //this.currentAnimation.draw(aCamera);
    GameObject.prototype.draw.call(this, aCamera);
};

Hero.prototype.moveLeft = function(){
    var changeAnim = false;
    if(this.facingRight){changeAnim = true;}
        
    this.getXform().incXPosBy(-this.kDelta);
    this.facingRight = false;
    //adjustPositionBy = function(v, delta) {
    //this.getRigidBody().adjustPositionBy(this.getXform().getPosition(), this.kDelta);
    if(changeAnim){
        this.updateAnimationStatus();
    }
};

Hero.prototype.moveRight = function(){
    var changeAnim = false;
    if(!this.facingRight){changeAnim = true;}
    
    this.getXform().incXPosBy(this.kDelta);
    this.facingRight = true;
    
    if(changeAnim){
        this.updateAnimationStatus();
    }
};

Hero.prototype.updateJumpStatus = function(gameObjectSet){
    var prevJump = this.jumping;
    this.jumping = !this.canJump(gameObjectSet);
    
    if(prevJump != this.jumping){
        this.updateAnimationStatus();
    }
}

Hero.prototype.jump = function(gameObjectSet){
    if(this.canJump(gameObjectSet)){
        this.jumping = true;
        this.getRigidBody().setVelocity(0, 25);
        this.updateAnimationStatus();
    }
};

Hero.prototype.canJump = function(gameObjectSet){
    var tempPlayerBox = this.getBBox();
    tempPlayerBox.mLL[1] -= 0.3;
    
    var canJump = false;
    for(var i = 0; i < gameObjectSet.mSet.length; i++){
        //var temp = gameObjectSet.mSet[i].getBBox();
        if(gameObjectSet.mSet[i] != this){
            var temp = gameObjectSet.mSet[i].getBBox();
            //console.log(this.getBBox().boundCollideStatus(temp));
            if(tempPlayerBox.boundCollideStatus(temp) != 0){
                canJump = true;
            }
        }
    }
    return canJump;
}