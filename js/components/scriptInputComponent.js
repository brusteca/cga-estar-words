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
		return false;
	}

	isKeyJustPressed(key){
		// there are better ways of doing this
		for (var i = 0; i < this.script.length; i++){
			if (this.script[i].time > gameTime){
					break;
			}
			if (this.script[i].used === undefined && this.script[i].key == key && (this.script[i].time + this.script[i].duration) > gameTime){
				this.script[i].used = true;
				return true;
			}
		}
		return false;
	}
}
