/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CatBall(spriteTexture, focus){
    //this.kDelta = 0.3;
    this.focus = focus;
    
    this.mCat = new SpriteRenderable(spriteTexture);
    //this.mCat.setColor([1, 1, 1, 0]);

    //this.mCat.setColor([255, 255, 255, .5]);
    var pos = this.focus.getXform().getPosition();
    //pos[1] += 10;
    this.mCat.getXform().setPosition(pos[0], pos[1] + 5);
    this.mCat.getXform().setSize(4, 4);
    this.mCat.setElementPixelPositions(0, 128, 0, 128);
    

    GameObject.call(this, this.mCat);
    
    var r = new RigidCircle(this.getXform(), 2);
    r.setMass(0.2);
    r.setRestitution(5000);
    this.setRigidBody(r);
    
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(CatBall, GameObject);

CatBall.prototype.update = function () {
    GameObject.prototype.update.call(this);
    
    //console.log(this.getRigidBody().getRestitution());
};

CatBall.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
}