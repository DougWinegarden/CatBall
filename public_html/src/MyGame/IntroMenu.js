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
    this.start = null;
    this.options = null;
    this.credits = null;
    
    // elements represent selectable menu text for example,
    // options or start game
    //this.elements = [this.start, this.options, this.credits];
    this.elements = [];
    this.selectedElement = null;
    //this.start = null;
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
    this.start = new MenuElement("Start", 30, 50, 3);
    this.options = new MenuElement("Options", 30, 40, 3);
    this.credits = new MenuElement("Credits", 30, 30, 3);
    
    this.elements = [this.start, this.options, this.credits];
    
    this.selectedElement = this.start;
    //this.myGame = new MyGame();
    this.selectionArrow = new TextureRenderable(this.kArrow);
    this.selectionArrow.getXform().setSize(3, 3);
    //this.selectionArrow.se
    
    
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
    var pos = this.selectedElement.mFontRenderable.getXform().getPosition();
    this.selectionArrow.getXform().setPosition(pos[0] - 5, pos[1] - 0.5);
    
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space) || 
           gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)) {
        //gEngine.Physics.togglePositionalCorrection();
        //this.unloadScene();
        if(this.selectedElement == this.start){
            var start = new MyGame();
            gEngine.Core.startScene(start);
        }
        
        
   }
   
   if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) || 
           gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        //gEngine.Physics.togglePositionalCorrection();
        //this.unloadScene();
        if(this.selectedElement == this.start){
            var start = new MyGame();
            gEngine.Core.startScene(start);
        }
        
        
   }
};






