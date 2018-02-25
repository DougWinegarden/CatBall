/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatformTexture = "assets/platform.png";
    this.kWallTexture = "assets/wall.png";
    this.kTargetTexture = "assets/target.png";
    //this.kCatBallTexture = "assets/catBall1.png"
    //this.kCatBallTexture = "assets/catball2.png"
    this.kRedCatBallTexture = "assets/redcatball.png"
    this.kBlueCatBallTexture = "assets/bluecatball.png"
    this.kPlayerTexture = "assets/oofCharacter.png"
    
    // The camera to view the scene
    this.mCamera = null;

    //this.mMsg = null;
    //this.mShapeMsg = null;

    this.mAllObjs = null;
    //this.mBounds = null;
    this.mCollisionInfos = [];
    this.mPlayer1 = null;
    this.mPlayer2 = null;
    
    this.mPlayer1CatBall = null;
    this.mPlayer2CatBall = null;
    
    this.mTimer = 60000;
    //this.deltaTime = 0;
    this.lastTime = Date.now();
    this.mTimerText = null;
    
    this.mPlayer1Score = 0;
    this.mPlayer2Score = 0;
    //this.mCurrentObj = 0;
    //this.mTarget = null;
    
    //this.mCatInSet = true;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    
    
    gEngine.Textures.loadTexture(this.kRedCatBallTexture);  
    gEngine.Textures.loadTexture(this.kBlueCatBallTexture);  
    gEngine.Textures.loadTexture(this.kPlayerTexture);  
};

MyGame.prototype.unloadScene = function () {
    //gEngine.Textures.unloadTexture(this.kMinionSprite);
    //gEngine.Textures.unloadTexture(this.kPlatformTexture);
   // gEngine.Textures.unloadTexture(this.kWallTexture);
    //gEngine.Textures.unloadTexture(this.kTargetTexture);
    
    
};

MyGame.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
                                
    this.mPlayer1 = new Hero(this.kPlayerTexture, 20, 10);
    this.mPlayer2 = new Hero(this.kPlayerTexture, 80, 10);
    
    this.mPlayer1CatBall = new CatBall(this.kRedCatBallTexture, this.mPlayer1);
    this.mPlayer2CatBall = new CatBall(this.kBlueCatBallTexture, this.mPlayer2);
    
    this.mAllObjs = new GameObjectSet();
    
    this.mAllObjs.addToSet(this.mPlayer1);
    this.mAllObjs.addToSet(this.mPlayer2);
    this.mAllObjs.addToSet(this.mPlayer1CatBall);
    this.mAllObjs.addToSet(this.mPlayer2CatBall);
    
    this.createBounds();
    
    this.mTimerText = new FontRenderable("" + Math.round(this.mTimer / 1000));
    this.mTimerText.setColor([1, 1, 1, 0]);
    this.mTimerText.getXform().setPosition(49, 71);
    this.mTimerText.setTextHeight(3);
    //this.unloadScene();
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    
    //this.mPlayer1.draw(this.mCamera);
    //this.mPlayer1CatBall.draw(this.mCamera); 
    this.mAllObjs.draw(this.mCamera);
    
    this.mTimerText.draw(this.mCamera);
    
    //this.mAllObjs.draw(this.mCamera);
    
    // for now draw these ...
    /*for (var i = 0; i<this.mCollisionInfos.length; i++) 
        this.mCollisionInfos[i].draw(this.mCamera); */
    //this.mCollisionInfos = []; 
    
    //this.mTarget.draw(this.mCamera);
    //this.mMsg.draw(this.mCamera);   // only draw status in the main camera
    //this.mShapeMsg.draw(this.mCamera);
};

/*
MyGame.prototype.increasShapeSize = function(obj, delta) {
    var s = obj.getRigidBody();
    var r = s.incShapeSizeBy(delta);
};
*/

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
//MyGame.kBoundDelta = 0.1;
MyGame.prototype.update = function () {
    //var msg = "";   
    
    this.updateInput();
    this.updateTimer();
    
    /*
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
        var obj = this.mAllObjs.removeFromSet(this.mPlayer1CatBall);
        this.mCatInSet = false;
    }
    
    if(!this.mCatInSet){
        this.mPlayer1CatBall.update();
    }
    */
    
    this.mAllObjs.update(this.mCamera);
    
    gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);
    
    
    /*
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
        //gEngine.Physics.toggleHasMotion();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.H)) {
        //this.radomizeVelocity();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        /*
        this.mCurrentObj -= 1;
        if (this.mCurrentObj < this.mFirstObject)
            this.mCurrentObj = this.mAllObjs.size() - 1;
            
    }            
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        /*
        this.mCurrentObj += 1;
        if (this.mCurrentObj >= this.mAllObjs.size())
            this.mCurrentObj = this.mFirstObject;
            
    }

    //var obj = this.mAllObjs.getObjectAt(this.mCurrentObj);
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Y)) {
        //this.increasShapeSize(obj, MyGame.kBoundDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.U)) {
        //this.increasShapeSize(obj, -MyGame.kBoundDelta);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.G)) {
        /*
        var x = 20 + Math.random() * 60;
        var y = 75;
        var t = Math.random() > 0.5;
        var m = new Minion(this.kMinionSprite, x, y, t);
        this.mAllObjs.addToSet(m);
        
    }
        
    //obj.keyControl();
    //obj.getRigidBody().userSetsState();
    
    //this.mAllObjs.update(this.mCamera);
    
    //gEngine.Physics.processCollision(this.mAllObjs, this.mCollisionInfos);
    
    
    
    var p = obj.getXform().getPosition();
    this.mTarget.getXform().setPosition(p[0], p[1]);
    msg += "  P(" + gEngine.Physics.getPositionalCorrection() + 
           " " + gEngine.Physics.getRelaxationCount() + ")" +
           " V(" + gEngine.Physics.getHasMotion() + ")";
    this.mMsg.setText(msg);
    
    this.mShapeMsg.setText(obj.getRigidBody().getCurrentState());
    */
};

MyGame.prototype.updateTimer = function () {
    var deltaTime = Date.now() - this.lastTime;
    this.mTimer -= deltaTime;
    //var t = 
    this.mTimerText.setText("" + Math.round(this.mTimer / 1000));
    this.lastTime = Date.now();
    
    if(this.mTimer <= 0){
        var start = new GameOver();
        gEngine.Core.startScene(start);
    }
}

MyGame.prototype.updateInput = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) {
        // takes user(s) back to main menu
        var start = new IntroMenu();
        gEngine.Core.startScene(start);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        this.mPlayer1.jump(this.mAllObjs);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mPlayer1.moveLeft();
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mPlayer1.moveRight();
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.I)) {
        this.mPlayer2.jump(this.mAllObjs);
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.J)) {
        this.mPlayer2.moveLeft();
    }
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.L)) {
        this.mPlayer2.moveRight();
    }
}