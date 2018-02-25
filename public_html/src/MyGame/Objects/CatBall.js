/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CatBall(spriteTexture){
    //this.kDelta = 0.3;

    this.mDye = new SpriteRenderable(spriteTexture);
    //this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(50, 40);
    this.mDye.getXform().setSize(3, 3);
    this.mDye.setElementPixelPositions(5, 128 - 5, 5, 128 - 5);
    

    GameObject.call(this, this.mDye);
    
    var r = new RigidCircle(this.getXform(), 2);
    r.setMass(0.2);
    r.setRestitution(5000);
    this.setRigidBody(r);
    this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(CatBall, GameObject);

CatBall.prototype.update = function () {
    GameObject.prototype.update.call(this);
    
    //console.log(this.getRigidBody().getRestitution());
};

CatBall.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
}