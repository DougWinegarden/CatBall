/*
 * 
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
    this.kCatBallTexture = "assets/catBalls.png"
    this.kRedCatBallTexture = "assets/redcatball.png";
    this.kBlueCatBallTexture = "assets/bluecatball.png";
    this.kPlayerTexture = "assets/oofCharacter.png";
    //this.kBasketTexture = "assets/basket1.png";
    //this.kBasketTexture = "assets/3baskets.png";
    this.kBasketTexture = "assets/Baskets.png";
    this.kPlayerSprite = "assets/PlayerAnimSprite.png";
    this.kPlayerSpriteJSON = "assets/PlayerAnimSprite.json";
    this.kIndicatorSprite = "assets/ThrowIndicators.png";
    
    this.kPegTexture = "assets/PegTexture.png";
    
    
    // The camera to view the scene
    this.mCamera = null;
    this.player1Cam = null;
    this.player2Cam = null;
    //this.mMsg = null;
    //this.mShapeMsg = null;

    this.mAllObjs = null;
    this.mAllPhysObjs = null;
    //this.mBounds = null;
    this.mCollisionInfos = [];
    this.mPlayer1 = null;
    this.mPlayer2 = null;
    
    
    
    this.mPlayer1CatBall = null;
    this.mPlayer2CatBall = null;
    
    this.mPlayer1ThrowIndicator = null;
    this.mPlayer2ThrowIndicator = null;
    
    this.basketSet = [];
    this.pegSet = [];
    
    this.startTime = 90000;
    this.mTimer = this.startTime;
    //this.deltaTime = 0;
    this.lastTime = Date.now();
    this.mTimerText = null;
    
    this.mPlayer1Score = null;
    this.mPlayer2Score = null;
    //this.mCurrentObj = 0;
    //this.mTarget = null;
    
    //this.mCatInSet = true;
    this.mGameOverScreen = null;
    this.gameOver = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);


MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatformTexture);
    gEngine.Textures.loadTexture(this.kWallTexture);
    gEngine.Textures.loadTexture(this.kTargetTexture);
    
    gEngine.Textures.loadTexture(this.kCatBallTexture); 
    gEngine.Textures.loadTexture(this.kRedCatBallTexture);  
    gEngine.Textures.loadTexture(this.kBlueCatBallTexture);  
    gEngine.Textures.loadTexture(this.kPlayerTexture);  
    gEngine.Textures.loadTexture(this.kBasketTexture);  
    gEngine.Textures.loadTexture(this.kPegTexture);  
    gEngine.Textures.loadTexture(this.kIndicatorSprite);  
    
    gEngine.Textures.loadTexture(this.kPlayerSprite); 
    //gEngine.
            
    gEngine.TextFileLoader.loadTextFile(this.kPlayerSpriteJSON, gEngine.TextFileLoader.eTextFileType.eTextFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatformTexture);
    gEngine.Textures.unloadTexture(this.kWallTexture);
    gEngine.Textures.unloadTexture(this.kTargetTexture);
    
    gEngine.Textures.unloadTexture(this.kCatBallTexture); 
    gEngine.Textures.unloadTexture(this.kRedCatBallTexture);  
    gEngine.Textures.unloadTexture(this.kBlueCatBallTexture);  
    gEngine.Textures.unloadTexture(this.kPlayerTexture);  
    gEngine.Textures.unloadTexture(this.kBasketTexture);  
    gEngine.Textures.unloadTexture(this.kPegTexture);  
    gEngine.Textures.unloadTexture(this.kIndicatorSprite);
    
    gEngine.Textures.unloadTexture(this.kPlayerSprite); 
    //gEngine.
            
    gEngine.TextFileLoader.unloadTextFile(this.kPlayerSpriteJSON, gEngine.TextFileLoader.eTextFileType.eTextFile);
};

/*
MyGame.prototype.initPlayer = function(player, num){
    var retPlayer;
    
    if(num == 1){
        retPlayer = new Hero(this.kPlayerSprite, this.kPlayerSpriteJSON, 20, 10, 1);
        retPlayer = new Camera(
            this.mPlayer1.getXform().getPosition(), // position of the camera
            6,                     // width of camera
            [0, 600, 220, 60 * 4]         // viewport (orgX, orgY, width, height)
        );


    } else if (num == 2) {
        retPlayer = new Hero(this.kPlayerSprite, this.kPlayerSpriteJSON, 80, 10, 2);
        retPlayer = new Camera(
            this.mPlayer2.getXform().getPosition(), // position of the camera
            6,                     // width of camera
            [560, 600, 220, 60 * 4]         // viewport (orgX, orgY, width, height)
        );


    }
    
    /*
    
    this.mPlayer1CatBall = new CatBall(this.kCatBallTexture, this.mPlayer1);
    this.mPlayer2CatBall = new CatBall(this.kCatBallTexture, this.mPlayer2);
    
    this.mPlayer1.setCatBall(this.mPlayer1CatBall);
    this.mPlayer2.setCatBall(this.mPlayer2CatBall);
    
    this.mPlayer1ThrowIndicator = new ThrowIndicator(this.kIndicatorSprite, this.mPlayer1);
    this.mPlayer2ThrowIndicator = new ThrowIndicator(this.kIndicatorSprite, this.mPlayer2);
    
    this.mAllObjs = new GameObjectSet();
    this.mAllPhysObjs = new GameObjectSet();
    
    this.mAllObjs.addToSet(this.mPlayer1);
    this.mAllObjs.addToSet(this.mPlayer2);
    //this.mAllObjs.addToSet(this.mPlayer1CatBall);
    //this.mAllObjs.addToSet(this.mPlayer2CatBall);
    this.mAllObjs.addToSet(this.mPlayer1CatBall);
    this.mAllObjs.addToSet(this.mPlayer2CatBall);
    
    this.mAllPhysObjs.addToSet(this.mPlayer1);
    this.mAllPhysObjs.addToSet(this.mPlayer2);
    this.mAllPhysObjs.addToSet(this.mPlayer1CatBall);
    this.mAllPhysObjs.addToSet(this.mPlayer2CatBall);
    //this.mAllPhysObjs.addToSet(this.mPlayer1ThrowIndicator);
    //this.mAllPhysObjs.addToSet(this.mPlayer2ThrowIndicator);
    
    return retPlayer
}
*/

MyGame.prototype.initialize = function () {
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    
    //this.initPlayer(this.mPlayer1);
    //this.initPlayer(this.mPlayer2);
    
    this.mPlayer1 = new Hero(this.kPlayerSprite, this.kPlayerSpriteJSON, 20, 10, 1);
    this.mPlayer2 = new Hero(this.kPlayerSprite, this.kPlayerSpriteJSON, 80, 10, 2);
    
    this.mPlayer1CatBall = new CatBall(this.kCatBallTexture, this.mPlayer1);
    this.mPlayer2CatBall = new CatBall(this.kCatBallTexture, this.mPlayer2);
    
    this.mPlayer1.setCatBall(this.mPlayer1CatBall);
    this.mPlayer2.setCatBall(this.mPlayer2CatBall);
    
    this.mPlayer1ThrowIndicator = new ThrowIndicator(this.kIndicatorSprite, this.mPlayer1);
    this.mPlayer2ThrowIndicator = new ThrowIndicator(this.kIndicatorSprite, this.mPlayer2);
    
    this.mAllObjs = new GameObjectSet();
    this.mAllPhysObjs = new GameObjectSet();
    
    this.mAllObjs.addToSet(this.mPlayer1);
    this.mAllObjs.addToSet(this.mPlayer2);
    //this.mAllObjs.addToSet(this.mPlayer1CatBall);
    //this.mAllObjs.addToSet(this.mPlayer2CatBall);
    this.mAllObjs.addToSet(this.mPlayer1CatBall);
    this.mAllObjs.addToSet(this.mPlayer2CatBall);
    
    this.mAllPhysObjs.addToSet(this.mPlayer1);
    this.mAllPhysObjs.addToSet(this.mPlayer2);
    this.mAllPhysObjs.addToSet(this.mPlayer1CatBall);
    this.mAllPhysObjs.addToSet(this.mPlayer2CatBall);
    //this.mAllPhysObjs.addToSet(this.mPlayer1ThrowIndicator);
    //this.mAllPhysObjs.addToSet(this.mPlayer2ThrowIndicator);
    
    
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
                                
    //this.mPlayer1 = new Hero(this.kPlayerSprite, this.kPlayerSpriteJSON, 20, 10, 1);
    //this.mPlayer2 = new Hero(this.kPlayerSprite, this.kPlayerSpriteJSON, 80, 10, 2);
    
    
    this.player1Cam = new Camera(
        this.mPlayer1.getXform().getPosition(), // position of the camera
        6,                     // width of camera
        [0, 600, 220, 60 * 4]         // viewport (orgX, orgY, width, height)
    );
    
    this.player2Cam = new Camera(
        this.mPlayer2.getXform().getPosition(), // position of the camera
        6,                     // width of camera
        [580, 600, 220, 60 * 4]         // viewport (orgX, orgY, width, height)
    );
    
    
    
    
    
    this.createBoundsStage1();
    //this.createBoundsStage2();
    //this.createBoundsStage3();
    //this.createPegsStage1();
    this.createBasketsStage1();
    //this.createBasketsStage2();
    //this.createBasketsStage3();
    //this.createPegsStage2();
    //this.createPegsStage3();
    /*
    console.log("OMG: " + gEngine.DefaultResources.getConstColorShader());
    this.initializeBaskets();
    
    for(var i = 0; i < this.basketSet.length; i++){
        for(var j = 0; i < this.basketSet[i].physicsObjects.length; i++){
            this.mAllObjs.addToSet(this.basketSet[i].physicsObjects[j]);
        }
        
    }
    */
    
    
    this.mTimerText = new FontRenderable("" + Math.round(this.mTimer / 1000));
    this.mTimerText.setColor([1, 1, 1, 0]);
    this.mTimerText.getXform().setPosition(49, 71);
    this.mTimerText.setTextHeight(3);
    //this.unloadScene();
    
    this.mPlayer1Score = new FontRenderable(" ");
    this.mPlayer1Score.setColor([1, 0, 0, 1]);
    this.mPlayer1Score.getXform().setPosition(25, 71);
    this.mPlayer1Score.setTextHeight(3);
    
    this.mPlayer2Score = new FontRenderable(" ");
    this.mPlayer2Score.setColor([0, 0, 1, 1]);
    this.mPlayer2Score.getXform().setPosition(75, 71);
    this.mPlayer2Score.setTextHeight(3);
    
    this.mGameOverScreen = new GameOverScreen();
    //this.mGameOverScreen.addToSet(this.logo)
    this.mGameOverScreen.setPlayerScore(this.mPlayer1Score, this.mPlayer2Score);
    //this.mGameOverScreen.mObjSet.addToSet(this.mPlayer1Score)
    //this.mGameOverScreen.mObjSet.addToSet(this.mPlayer2Score)
    this.gameOver = false;
};



// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to white
    this.drawCam(this.mCamera);
    this.drawCam(this.player1Cam);
    this.drawCam(this.player2Cam);

};

MyGame.prototype.drawCam = function(cam){
    // Step A: clear the canvas
    
    cam.setupViewProjection();
    //this.mPlayer1.draw(this.mCamera);
    //this.mPlayer1CatBall.draw(this.mCamera); 
    if(!this.gameOver){
        this.mAllObjs.draw(cam);
        this.mPlayer1ThrowIndicator.draw(cam);
        this.mPlayer2ThrowIndicator.draw(cam);

        for(var i = 0; i < this.basketSet.length; i++){
            this.basketSet[i].draw(cam);
        }

        for(var i = 0; i < this.pegSet.length; i++){
            this.pegSet[i].draw(cam);
        }
        this.mTimerText.draw(cam);
        this.mPlayer1Score.draw(cam);
        this.mPlayer2Score.draw(cam);
    } else {
        this.mGameOverScreen.draw(cam);
        this.mPlayer1.draw(cam);
        this.mPlayer2.draw(cam);
    }
    
    
    
}

MyGame.prototype.update = function () {
    //console.log(this.gameOver);
    this.updateInput();
    
    this.updateTimer();
    
    this.updateObjects();
    
    //if(this.)
    this.updateScore();
};

MyGame.prototype.updateObjects = function(){
    
    for(var i = 0; i < this.basketSet.length; i++){
        this.basketSet[i].update(this.mPlayer1CatBall, this.mPlayer2CatBall);
    }
    
    for(var i = 0; i < this.pegSet.length; i++){
        this.pegSet[i].update(this.mPlayer1CatBall, this.mPlayer2CatBall);
    }
    
    
    this.mAllObjs.update(this.mCamera);
    this.mPlayer1ThrowIndicator.update(this.mPlayer1CatBall);
    this.mPlayer2ThrowIndicator.update(this.mPlayer2CatBall);
    this.mPlayer1.updateJumpStatus(this.mAllPhysObjs);
    this.mPlayer2.updateJumpStatus(this.mAllPhysObjs);
    
    gEngine.Physics.processCollision(this.mAllPhysObjs, this.mCollisionInfos);
}

MyGame.prototype.updateTimer = function () {
    var deltaTime = Date.now() - this.lastTime;
    this.mTimer -= deltaTime;
    //var t = 
    this.mTimerText.setText("" + Math.round(this.mTimer / 1000));
    this.lastTime = Date.now();
    
    if(this.mTimer <= 0){
        this.endGame();
    }
}

MyGame.prototype.endGame = function(){
    this.mPlayer1Score.getXform().setPosition(25, 45);
    this.mPlayer2Score.getXform().setPosition(75, 45);
    
    this.mPlayer1.resetPlayer();
    this.mPlayer2.resetPlayer();
    
    this.gameOver = true;
    
    //var start = new GameOver(this.mPlayer1Score, this.mPlayer2Score); 
    
    //gEngine.Core.startScene(start);
    
    // unloading scene gives gEngine.retrieveAsset: [assets/playerAnimSprite.png] error,
    // but keeping the scene loaded will cause lag when playing again
    //this.unloadScene();
}

MyGame.prototype.restartGame = function(){
    //console.log("yes restart Game")
    this.mPlayer1Score.getXform().setPosition(25, 71);
    this.mPlayer2Score.getXform().setPosition(75, 71);
    this.mTimer = this.startTime;
    
    for(var i = 0; i < this.basketSet.length; i++){
        this.basketSet[i].reset();
    }
    
    for(var i = 0; i < this.pegSet.length; i++){
        this.pegSet[i].reset();
    }
    
    this.gameOver = false;
}

MyGame.prototype.updateInput = function () {
    
    
    if(!this.gameOver){
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)) {
            // takes user(s) back to main menu
            //var start = new IntroMenu();
            //gEngine.Core.startScene(start);

            // Brings the user to the game over screen
            this.endGame();
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

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.C)) {
            //if (this.mPlayer1CatBall.throwAngle < 90) {
                this.mPlayer1CatBall.throwAngle++;
            //}
        }

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.B)) {
            //if (this.mPlayer1CatBall.throwAngle > 0) {
                this.mPlayer1CatBall.throwAngle--;
            //}
        }

        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.V)) {
            this.mPlayer1CatBall.throw();
        }

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Comma)) {
            //if (this.mPlayer2CatBall.throwAngle < 90) {
                this.mPlayer2CatBall.throwAngle++;
            //}
        }

        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.QM)) {
            //if (this.mPlayer2CatBall.throwAngle > 0) {
                this.mPlayer2CatBall.throwAngle--;
            //}
        }

        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Period)) {
            this.mPlayer2CatBall.throw();
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
    else if(this.gameOver){
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
            //console.log("well I tried");
            this.restartGame();
        } else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)){
            //console.log("tried");
            location.reload(true);
        }
    }
}

MyGame.prototype.updateScore = function () {
    var score1 = 0;
    var score2 = 0;
    
    for (var i  = 0; i < this.basketSet.length; i++) {
        if (this.basketSet[i].color == 1) {
            score1++;
        } else if (this.basketSet[i].color == 2) {
            score2++;
        }
    }
    
    for (var i  = 0; i < this.pegSet.length; i++) {
        if (this.pegSet[i].color == 1) {
            score1++;
        } else if (this.pegSet[i].color == 2) {
            score2++;
        }
    }
    
    this.mPlayer1Score.setText("" + score1);
    this.mPlayer2Score.setText("" + score2);
}
