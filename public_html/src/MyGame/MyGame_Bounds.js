/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject, MyGame */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/*
var kSpeed = 40;
MyGame.prototype.radomizeVelocity = function()
{
    var i = 0;
    for (i = this.mFirstObject; i<this.mAllObjs.size(); i++) {
        var obj = this.mAllObjs.getObjectAt(i);
        var rigidShape = obj.getRigidBody();
        var x = (Math.random() - 0.5) * kSpeed;
        var y = Math.random() * kSpeed * 0.5;
        rigidShape.setVelocity(x, y);
    }
};
*/

MyGame.prototype.createBoundsStage1 = function() {
    var x = 15, w = 30, y = 4;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
    y = 76;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 180);
    
    this.platformAt(50, 60, 30, 0);
    this.platformAt(15, 50, 20, 0);
    this.platformAt(30, 20, 15, 0);
    this.platformAt(70, 20, 15, 0);
    this.platformAt(85, 50, 20, 0);
    this.platformAt(15, 30, 10, 0);
    this.platformAt(85, 30, 10, 0);
    this.platformAt(50, 40, 20, 0);
    
    x = 2;
    w = 3;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    x = 98;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
};

MyGame.prototype.createBoundsStage2 = function() {
    var x = 15, w = 30, y = 4;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 0);
    y = 76;
    for (x = 15; x < 120; x+=30) 
        this.platformAt(x, y, w, 180);
    
    
    this.platformAt(20, 20, 10, 0);
    this.platformAt(80, 20, 10, 0);
    
    this.platformAt(10, 35, 10, 0);
    this.platformAt(90, 35, 10, 0);
    
    //this.platformAt(50, 60, 30, 0); //(x, y, w, rot) {
    
    x = 2;
    w = 3;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    x = 98;
    for (y = 8; y < 90; y+=12) 
        this.wallAt(x, y, w);
    
    var r = new TextureRenderable(this.kTargetTexture);
    this.mTarget = new GameObject(r);
    var xf = r.getXform();
    xf.setSize(3, 3);
};

MyGame.prototype.createPegsStage1 = function() {
    this.pegSet.push(new Peg(this.kPegTexture, 20, 20, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 80, 20, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 50, 8, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 8, 8, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 92, 8, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 50, 45, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 50, 35, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 8, 45, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 92, 45, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 8, 68, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 92, 68, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 50, 64, 1));
    
    for(var i = 0; i < this.pegSet.length; i++){
        this.mAllPhysObjs.addToSet(this.pegSet[i]);
    }
    
}

MyGame.prototype.createBasketsStage1 = function(){
    this.basketSet.push(new Basket(this.kBasketTexture, 50, 8));
    this.basketSet.push(new Basket(this.kBasketTexture, 8, 8));
    this.basketSet.push(new Basket(this.kBasketTexture, 92, 8));
    this.basketSet.push(new Basket(this.kBasketTexture, 50, 43.5));
    this.basketSet.push(new Basket(this.kBasketTexture, 50, 30));
    this.basketSet.push(new Basket(this.kBasketTexture, 8, 40));
    this.basketSet.push(new Basket(this.kBasketTexture, 92, 40));
    this.basketSet.push(new Basket(this.kBasketTexture, 8, 68));
    this.basketSet.push(new Basket(this.kBasketTexture, 92, 68));
    this.basketSet.push(new Basket(this.kBasketTexture, 50, 64));
    
    this.initPhysForBaskets();
}

MyGame.prototype.createBasketsStage2 = function(){
    this.basketSet.push(new Basket(this.kBasketTexture, 50, 40));
    this.basketSet.push(new Basket(this.kBasketTexture, 50, 60));
    
    this.basketSet.push(new Basket(this.kBasketTexture, 42, 38));
    this.basketSet.push(new Basket(this.kBasketTexture, 58, 38));
    
    this.basketSet.push(new Basket(this.kBasketTexture, 15, 60));
    this.basketSet.push(new Basket(this.kBasketTexture, 85, 60));

    this.initPhysForBaskets();
}

MyGame.prototype.createPegsStage2 = function() {
    this.pegSet.push(new Peg(this.kPegTexture, 10, 70, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 90, 70, 1));
    
    this.pegSet.push(new Peg(this.kPegTexture, 20, 70, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 80, 70, 1));
    
    this.pegSet.push(new Peg(this.kPegTexture, 50, 68, 1));
    
    this.pegSet.push(new Peg(this.kPegTexture, 15, 60, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 85, 60, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 50, 60, 1));
    
    this.pegSet.push(new Peg(this.kPegTexture, 45, 55, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 55, 55, 1));
    
    
    
    
    this.pegSet.push(new Peg(this.kPegTexture, 50, 40, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 40, 40, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 60, 40, 1));
    
    this.pegSet.push(new Peg(this.kPegTexture, 45, 35, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 55, 35, 1));
    
    this.pegSet.push(new Peg(this.kPegTexture, 35, 35, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 65, 35, 1));
    
    this.pegSet.push(new Peg(this.kPegTexture, 50, 30, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 40, 30, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 60, 30, 1));
    
    
    this.pegSet.push(new Peg(this.kPegTexture, 50, 20, 1));
    
    this.pegSet.push(new Peg(this.kPegTexture, 45, 25, 1));
    this.pegSet.push(new Peg(this.kPegTexture, 55, 25, 1));
    
    //this.pegSet.push(new Peg(this.kPegTexture, 45, 8, 1));
    //this.pegSet.push(new Peg(this.kPegTexture, 55, 8, 1));
    
    
    
    
    
    for(var i = 0; i < this.pegSet.length; i++){
        this.mAllPhysObjs.addToSet(this.pegSet[i]);
    }
    
}

MyGame.prototype.initPhysForBaskets = function(){
    for(var i = 0; i < this.basketSet.length; i++){
        
        var y = this.basketSet[i].getXform().getYPos();
        var x = this.basketSet[i].getXform().getXPos();
        //var rightx = this.basketSet[i].getXform().getXPos() + 3.5;
        var pegR = .5;
        this.mAllPhysObjs.addToSet(new Peg(this.kPegTexture, x - 3.5, y + 1.5, pegR));
        this.mAllPhysObjs.addToSet(new Peg(this.kPegTexture, x + 3.5, y + 1.5, pegR));
        this.invisPlatformAt(x, y - 2, 8, 0);//(x, y, w, rot) 
    }
}

MyGame.prototype.wallAt = function (x, y, w) {
    var h = w * 4;
    var p = new TextureRenderable(this.kWallTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    this.mAllObjs.addToSet(g);
    this.mAllPhysObjs.addToSet(g);
};

MyGame.prototype.platformAt = function (x, y, w, rot) {
    var h = w / 8;
    var p = new TextureRenderable(this.kPlatformTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mAllObjs.addToSet(g);
    this.mAllPhysObjs.addToSet(g);
};

MyGame.prototype.invisPlatformAt = function (x, y, w, rot) {
    var h = w / 8;
    var p = new TextureRenderable(this.kPlatformTexture);
    var xf = p.getXform();
    
    var g = new GameObject(p);
    var r = new RigidRectangle(xf, w, h);
    g.setRigidBody(r);
    g.toggleDrawRenderable();
    //g.toggleDrawRigidShape();
    
    r.setMass(0);
    xf.setSize(w, h);
    xf.setPosition(x, y);
    xf.setRotationInDegree(rot);
    this.mAllObjs.addToSet(g);
    this.mAllPhysObjs.addToSet(g);
};

    