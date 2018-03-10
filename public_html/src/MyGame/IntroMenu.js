/* 
 * The template for a scene.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function IntroMenu() {
    this.kArrow = "assets/MenuSelectArrow.png";
    
    this.mCamera = null;
    this.logo = null;
    
    //this.start = null;
    //this.options = null;
    //this.credits = null;
    
    this.matchTime = null;
    
    this.stage1Baskets = null;
    this.stage1Pegs = null;
    this.stage2Baskets = null;
    this.stage2Pegs = null;
    this.stage3Baskets = null;
    this.stage3Pegs = null;
    
    // elements represent selectable menu text for example,
    // options or start game
    //this.elements = [this.start, this.options, this.credits];
    this.elements = [];
    this.selectedElement = null;
    
    //this.drawOptions = false;
    //this.optionsElements = [];
    //this.start = null;
    this.selectIndex = 0;
}
gEngine.Core.inheritPrototype(IntroMenu, Scene);

IntroMenu.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kArrow);
};


IntroMenu.prototype.unloadScene = function () {
    //var start = new MyGame();
    //gEngine.Core.startScene(start);
};

IntroMenu.prototype.initialize = function () {
   this.mCamera = new Camera(vec2.fromValues(50, 50),
                                100,
                                [0, 0, 800, 600]);

    this.logo = new MenuElement("Cat Ball", 36, 70, 5);
    
    
    ///this.start = new MenuElement("Start", 30, 50, 3);
    //this.options = new MenuElement("Options", 30, 40, 3);
    //this.credits = new MenuElement("Credits", 30, 30, 3);
    
    this.stage1Baskets = new MenuElement("Stage 1 Bascats", 30, 60, 3);
    this.stage1Pegs = new MenuElement("Stage 1 Cat-chinko", 30, 55, 3);
    this.stage2Baskets = new MenuElement("Stage 2 Bascats", 30, 50, 3);
    this.stage2Pegs = new MenuElement("Stage 2 Cat-chinko", 30, 45, 3);
    this.stage3Baskets = new MenuElement("Stage 3 Bascats", 30, 40, 3);
    this.stage3Pegs = new MenuElement("Stage 3 Cat-chinko", 30, 35, 3);
    
    this.elements = [
        this.stage1Baskets,
        this.stage1Pegs,
        this.stage2Baskets,
        this.stage2Pegs,
        this.stage3Baskets,
        this.stage3Pegs
    ];
    
    this.selectedElement = this.stage1Baskets;
    //this.myGame = new MyGame();
    this.selectionArrow = new TextureRenderable(this.kArrow);
    this.selectionArrow.getXform().setSize(3, 3);
    //this.selectionArrow.se
    
    //this.drawOptions = false;
    //this.optionsElements = [];
};

IntroMenu.prototype.draw = function () {
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]);
    this.mCamera.setupViewProjection();
    
    this.logo.draw(this.mCamera);
    for(var i = 0; i < this.elements.length; i++){
        //console.log(this.elements[i]);
        this.elements[i].draw(this.mCamera);
    }
    
    this.selectionArrow.draw(this.mCamera);
    //this.startText.draw(this.mCamera);
    //this.options.draw(this.mCamera);
};

IntroMenu.prototype.update = function () {
    // set the selection arrow position to the currently selected element
    var pos = this.selectedElement.mFontRenderable.getXform().getPosition();
    this.selectionArrow.getXform().setPosition(pos[0] - 5, pos[1] - 0.5);
    
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) || 
           gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        //gEngine.Physics.togglePositionalCorrection();
        //this.unloadScene();

        var start = new MyGame(this.selectIndex);
        gEngine.Core.startScene(start);
        
        
   }
   
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) || 
           gEngine.Input.isKeyClicked(gEngine.Input.keys.I) ||
           gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {

        // move selection index up
        this.selectIndex--;
        this.selectIndex = clamp(this.selectIndex, 0, this.elements.length - 1);
        this.selectedElement = this.elements[this.selectIndex];
   }
   
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) || 
           gEngine.Input.isKeyClicked(gEngine.Input.keys.K) ||
           gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {

        // move selection index down
        this.selectIndex++;
        this.selectIndex = clamp(this.selectIndex, 0, this.elements.length - 1);
        this.selectedElement = this.elements[this.selectIndex];
   }
   
   /*
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A) || 
           gEngine.Input.isKeyClicked(gEngine.Input.keys.J)) {

        // move selection index left
   }
   
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D) || 
           gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {

        // move selection index right
   }
   */
};






