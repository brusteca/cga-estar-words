'use strict';



class BehaviorComponent {
	constructor(instructions) {
		// commands is an array of commands
		this._instructions = instructions;
		this._currentInstruction = 0;
	}

	getNextInstruction() {
		this._currentInstruction += 1
	}

}
