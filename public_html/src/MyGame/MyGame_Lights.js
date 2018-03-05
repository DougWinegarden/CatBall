/*
 * File: MyGame_Lights: support the creation of light for MyGame
 */
/*jslint node: true, vars: true */
/*global gEngine, MyGame, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

MyGame.prototype._createALight = function (type, pos, dir, color, n, f, inner, outer, intensity, dropOff) {
    var light = new Light();
    light.setLightType(type);
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);      
    light.setZPos(pos[2]);
    light.setDirection(dir);
    light.setNear(n);
    light.setFar(f);
    light.setInner(inner);
    light.setOuter(outer);
    light.setIntensity(intensity);
    light.setDropOff(dropOff);

    return light;
}

MyGame.prototype._initializeLights = function () {   
    this.lightSet = new LightSet();

    var l = this._createALight(Light.eLightType.eDirectionalLight,
            [500, 500, 4],           // position (not used by directional)
            [1, 1, -1],      // Pointing direction upwards
            [0.7, 0.7, .7, 1],    // color
            500, 500,              // near anf far distances: essentially switch this off
            0.1, 0.2,              // inner and outer cones
            10,                     // intensity
            1.0                    // drop off
            );
    this.lightSet.addToSet(l);
  
    l = this._createALight(Light.eLightType.ePointLight,
            [50, 8, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [8, 8, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [92, 8, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [50, 43.5, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [50, 30, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [8, 40, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [92, 40, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [8, 68, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [92, 68, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
    
    l = this._createALight(Light.eLightType.ePointLight,
            [50, 64, 5],         // position
            [0, 0, -1],          // Direction 
            [.2, .2, .2, 1],  // some color
            8, 20,               // near and far distances
            0.1, 0.2,            // inner and outer cones
            1,                   // intensity
            1.0                  // drop off
            );
    this.lightSet.addToSet(l);
};