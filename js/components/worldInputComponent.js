'use strict';

class WorldInputComponent extends InputComponent {
	constructor(owner) {
		super(owner);
	}

	handleInput(keyStatus, delta){
		if (keyStatus[KeyEnum.P].justPressed){
			paused = !paused; // generic space key -> pause the game
		}
	}

}
