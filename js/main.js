window.onload = function () {
	var initial = new Date().getTime();
	var dataLength = 500;
	var dpsX = [];
	var dpsY = [];
	var dpsZ = [];

	var chart = new CanvasJS.Chart("chartContainer",{
		title :{
			fontColor: "#ccc",
			text: "Sensor Data"
		},
		backgroundColor: "#222",
		data: [{
			color: "#1E90FF",
			type: "line",
			dataPoints: dpsX 
		}, {
			color: "#228B22",
			type: "line",
			dataPoints: dpsY 
		}, {
			color: "#B22222",
			type: "line",
			dataPoints: dpsZ 
		}]
	});
	var lastSecond = -1;
	var updateChart = function (x, y, z) {
		time = new Date().getTime() - initial;
		console.log("[" + time + ", " + x + "," + y + "," + z + "]");
		dpsX.push({
			x: time / 1000.0,
			y: x
		});
		dpsY.push({
			x: time / 1000.0,
			y: y
		});
		dpsZ.push({
			x: time / 1000.0,
			y: z
		});
		if (dpsX.length > dataLength)
		{
			dpsX.shift();
			dpsY.shift();
			dpsZ.shift();
		}
		var second = Math.round(time / 1000.0);
		

		if(dpsX.length >= dataLength) {
			chart.render();
		}
		var sensors = "<center>x: " + x + "<br>y: " + y + "<br>z: " + z + "</center>";
		$('#textbox').html(sensors);
	};

	updateChart(0, 0, 0);
	for(var i = 0; i < dataLength; i++) {
		updateChart(0, 0, 0);
	}

	document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });

	window.addEventListener('devicemotion', function(e) {
		updateChart(
				 e.accelerationIncludingGravity.x,
				-e.accelerationIncludingGravity.y,
				-e.accelerationIncludingGravity.z);
	});
}