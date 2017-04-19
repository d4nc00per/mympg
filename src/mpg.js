/*
* mpg.js
* Copyright 2014 Daniel Cooper
*/
function Mpg(){
	this.litreCost = 0;
	this.totalCost = 0;
	this.fuelAmount = 0;
	this.mileage = 0;
}

Mpg.prototype.Calculate = function(calcMethod){
	if (this.mileage > 0) {
		switch(calcMethod) {
			case "0":
			case 0:
				// calculate litres
				this.fuelAmount = this.totalCost / this.litreCost;
				// litres to gallons
				mpg = this.mileage / this.Gallons(this.fuelAmount);
				return mpg.toFixed(1);
			case "1":
			case 1:
				// litres to gallons
				mpg = this.mileage / this.Gallons(this.fuelAmount);
				return mpg.toFixed(1);
			default:
				console.error("Unable to perform calculation - no calculation method passed.")
				break;
		}
	} else {
		console.error("Unable to perform calculation - no mileage set.")
		return 0;
	}
}

Mpg.prototype.Gallons = function(litres) {
	return litres / 4.54609;
}
