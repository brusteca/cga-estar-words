'use strict';

class BehaviorComponent {
	constructor(instructions, owner) {
		// commands is an array of commands
		this.instructions = instructions;
		this.currentInstruction = 0;
		this.timer = 0;
		this.owner = owner;
	}

	update(delta){
		if (this.currentInstruction < this.instructions.length){
			// if there are instructions left to execute
			this.timer += delta;
			if (this.instructions[this.currentInstruction].time <= this.timer){
				var action = this.instructions[this.currentInstruction].function;
				var parameters = this.instructions[this.currentInstruction].parameters;
				this.owner[action](parameters);
				this.currentInstruction++;
			}

		}
	}

	getNextInstruction() {
		this.currentInstruction += 1
	}

}
