'use strict';

class WorldInputComponent extends InputComponent {
	constructor() {
		super();
	}

	handleInput(keyStatus){
		//super.handleInput(keyStatus); <- not necessary for the moment

		if (keyStatus[KeyEnum.SPACE].justPressed){
			paused = !paused; // generic space key -> pause the game
		}
	}

}
