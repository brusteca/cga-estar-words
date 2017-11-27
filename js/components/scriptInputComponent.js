'use strict';

class ScriptInputComponent extends InputComponent{
	constructor(script) {
		super();

		this.script = script;
	}

	isKeyDown(key){
		// there are better ways of doing this
		for (var i = 0; i < this.script.length; i++){
			if (this.script[i].time > gameTime){ 
					break;
			}
			if (this.script[i].key == key && (this.script[i].time + this.script[i].duration) > gameTime){
				return true;
			}
		}
	}

	isKeyJustPressed(key, gameTime){
		/*
		// there are better ways of doing this
		for (var i = 0; i < this.script.length; i++){
			if (this.script[i].time > gameTime){ 
					break;
			}
			if (this.script[i].key == key && (this.script[i].time + this.script.duration) > gameTime){
				return true;
			}
		}
		*/
	}
}
