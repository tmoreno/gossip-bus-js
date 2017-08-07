module.exports = class Driver {
    constructor(name, route) {
        this.name = name;
        this.route = route;

        this.currentStopPosition = 0;

        this.gossipsKnowed = new Set([name]);
    }

    getStop() {
        return this.route[this.currentStopPosition];
    }

    goToNextStop() {
        this.currentStopPosition = (this.currentStopPosition + 1) % this.route.length;
    }

    shareGossips(otherDriver) {
        let sharedGossips = new Set([...this.gossipsKnowed, ...otherDriver.gossipsKnowed]);

		this.gossipsKnowed = sharedGossips;
		otherDriver.gossipsKnowed = sharedGossips;
    }

    getGossipsKnowed() {
        return [...this.gossipsKnowed];
    }
}