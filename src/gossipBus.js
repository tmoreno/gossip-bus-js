const MAX_STOPS_IN_A_WORKING_DAY = 480;

module.exports = class GossipBus {
    
    constructor() {
        this.drivers = [];
    }

    addDriver(driver) {
		this.drivers.push(driver);
    }
    
    calcNumStops() {
		if (this.drivers.length <= 1) {
			return "never";
		}
		else {
			let numStops = 1;

			while (numStops <= MAX_STOPS_IN_A_WORKING_DAY) {
				this.shareGossips();

				if (this.driversKnowAllGossips()) {
					break;
				}
				else {
					this.moveDriversToNextStop();
					numStops++;
				}
			}

			return this.formatResult(numStops);
		}
    }
    
    shareGossips() {
        let driver1;
		let driver2;

		for (let i = 0; i < this.drivers.length; i++) {
			for (let j = i + 1; j < this.drivers.length; j++) {
				driver1 = this.drivers[i];
				driver2 = this.drivers[j];

				if (driver1.getStop() === driver2.getStop()) {
					driver1.shareGossips(driver2);
				}
			}
		}
    }

    moveDriversToNextStop() {
        this.drivers.forEach(driver => {
			driver.goToNextStop();
        });
	}

    driversKnowAllGossips() {
        let numDriversKnowAllGossips = 0;

		let gossipsNumber = this.drivers.length;

		this.drivers.forEach(driver => {
			if (driver.getGossipsKnowed().length === gossipsNumber) {
				numDriversKnowAllGossips++;
			}
        });

		return numDriversKnowAllGossips === gossipsNumber;
    }

    formatResult(numStops) {
		if (numStops > MAX_STOPS_IN_A_WORKING_DAY) {
			return "never";
		}
		else {
			return numStops;
		}
	}
}