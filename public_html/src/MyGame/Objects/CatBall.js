/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function CatBall(spriteTexture, player){
    //this.kDelta = 0.3;
    this.player = player;
    
    this.mCat = new SpriteRenderable(spriteTexture);
    //this.mCat.setColor([1, 1, 1, 0]);

    //this.mCat.setColor([255, 255, 255, .5]);
    var pos = this.player.getXform().getPosition();
    //pos[1] += 10;
    this.mCat.getXform().setPosition(pos[0], pos[1] + 5);
    this.mCat.getXform().setSize(5, 5);
    this.mCat.setElementPixelPositions(0, 128, 0, 128);
    

    GameObject.call(this, this.mCat);
    
    var r = new RigidCircle(this.getXform(), 2.5);
    r.setMass(4);
    r.setRestitution(0.9);
    r.setInertia(0.9);
    //r.setFriction(0.5);a
    this.setRigidBody(r);
    //this.getRidBody().setMass(0.2);
    //this.getRidBody().setRestitution(0.5);
    //this.getRidBody().setInertia(0.1);
    
    // state can be: held, returning, or thrown
    // state: stays on top of the player
    // returning: interpolates or chases back to player
    // thrown: at the mercy of physics
    this.state = "held";
    
    this.throwAngle = 60;
    
    //this.toggleDrawRigidShape();
}
gEngine.Core.inheritPrototype(CatBall, GameObject);

CatBall.prototype.update = function () {
    //console.log(this.getRigidBody().getVelocity());
    var pos = this.player.getXform().getPosition();
    if(this.state == "held"){
        // is there any way to disable physics being calculated?
        this.getXform().setPosition(pos[0], pos[1] + 5);
    } else if(this.state == "returning"){
        
    } else {
       GameObject.prototype.update.call(this); 
    }
    
    //console.log(this.getRigidBody().getRestitution());
    
};

CatBall.prototype.draw = function(aCamera){
    GameObject.prototype.draw.call(this, aCamera);
};

CatBall.prototype.throw = function(){
    
    
    if(this.state == "thrown"){
        this.state = "held";
    } else {
        this.state = "thrown";
        var x = Math.cos((this.throwAngle / 180) * Math.PI) * 5;
        var y = Math.sin((this.throwAngle / 180) * Math.PI) * 5;
        this.getRigidBody().setVelocity(x * 5, y * 5);
        //console.log(this.getRigidBody().getVelocity());
    }
    
    this.player.updateAnimationStatus();
};

CatBall.prototype.isHeld = function(){
    if(this.state == "held"){
        return true;
    }
    return false;
}
