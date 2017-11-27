'use strict';

class KeyboardInputComponent extends InputComponent{

	constructor() {
		super();
	}

	isKeyDown(key){
		return keyStatus[key].pressed;
	}

	isKeyJustPressed(key){
		return keyStatus[key].justPressed;
	}
}
