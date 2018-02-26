/* File: Basket.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, SpriteRenderable, WASDObj */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Basket(spriteTexture, x, y) {
    
    this.aBasket = new SpriteRenderable(spriteTexture)
    
    //this.aBasket.setColor([1, 1, 1, 0]);
    this.aBasket.getXform().setPosition(x, y);
    this.aBasket.getXform().setSize(4, 2);
    
    // need to adjust this when the drawing is made
    this.aBasket.setElementPixelPositions(0, 256, 0, 128);
    //this.mGameObject = new GameObject(this.mDye);
    GameObject.call(this, this.aBasket);
    
    // 0 = neutral, 1 = red, 2 = blue
    this.color = 0;
    
}
gEngine.Core.inheritPrototype(Basket, GameObject);

Basket.prototype.update = function (ball1, ball2) {
    
    
    
    var bound = this.getBBox();
    if (bound.intersectsBound(ball1.getBBox()) != 0) {
        //if (this.pixelTouches(ball1)) {
            this.color = 1;
            this.processHit();
        //}
    }
    
    if (bound.intersectsBound(ball2.getBBox()) != 0) {
        //if (this.pixelTouches(ball2)) {
            this.color = 2;
            this.processHit();
        //}
    }
    
};

Basket.prototype.processHit = function(){
    /*
    // assuming that all three basket colors will be on the same image and spaced apart
    if (this.color == 0) {
        this.aBasket.setElementPixelPositions(0, 256, 0, 64);
        //this.aBasket.setColor([1, 1, 1, 0]);
    } else 
    */
    
    if (this.color == 1) {
        this.aBasket.setElementPixelPositions(256, 256 * 2, 0, 128);
        //this.aBasket.setColor([1, 0, 0, 0]);
    } else if (this.color == 2) {
        this.aBasket.setElementPixelPositions(256 * 2, 256 * 3, 0, 128);
        //this.aBasket.setColor([0, 0, 1, 0]);
    }
}

Basket.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
}
