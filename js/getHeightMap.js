var getHeightMap = (() => {
	var main = (isSeedRandom) => {
		setSeed(isSeedRandom);
		prepareMap();
		elevate();
		draw();
		say("generated a heightmap. [start water] to continue.");
	};
	
	//vvv prepareMap vvv
	var prepareMap = (() => {
		var input;
		var main = () => {
			size = getSize();
			area = size*size;
			height = new Int32Array(area);
			water = new Int32Array(area);
			river = new Int32Array(area);
			tide = new Int32Array(area);
			population = new Int32Array(area);
			seaLevel = 0;
			var canvas = document.getElementById("canvas");
			canvas.width = size;
			canvas.height = size+20;
		};
		var getSize = () => {
			input = input || document.getElementById("size");
			switch (input.selectedIndex) {
				case 0:
					return 256;
				case 1:
					return 512;
				case 2:
					return 1024;
				case 3:
					return 2048;
				default:
					return 4096;
			}
		};
		return main;
	})();
	//^^^ prepareMap ^^^
	
	//vvv elevate vvv
	var elevate = (() => {
		var h;
		var main = () => {
			var interval, division, c;
			h = height;
			maxH = 0;
			interval = size;
			division = 1;
			rate = .4; //.4
			diagonal = 128; //128
			h[0] = -random()*MAX_H|0;
			adjust(0);
			do {
				for (var x=division; x--;) {
					for (var y=division; y--;) {
						c = coordinate(x*interval, y*interval);
						elevateSouthEast(c, interval);
					}
				}
				for (var x=division; x--;) {
					for (var y=division; y--;) {
						c = coordinate(x*interval, y*interval);
						elevateEast(c, interval);
						elevateSouth(c, interval);
					}
				}
				interval /= 2;
				division *= 2;
				if (division>4) rate *= .65; //.65
				diagonal = clamp(1, 128, diagonal*.45);
			} while (interval > 1);
		};
		var elevateEast = (c, interval) => {
			var north, south, east, mid;
			north = moveBy(c, interval/2, -interval/2);
			south = moveBy(c, interval/2, interval/2);
			east  = moveBy(c, interval,   0);
			mid   = moveBy(c, interval/2, 0);
			h[mid] = (h[c]
					 +h[north]*diagonal
					 +h[south]*diagonal
					 +h[east])/(2+diagonal*2)
					 +rand()*MAX_H*rate |0;
			adjust(mid);
		};
		var elevateSouthEast = (c, interval) => {
			var northeast, southeast, southwest, mid;
			northeast = moveBy(c,   interval, 0);
			southeast = moveBy(c,   interval, interval);
			southwest = moveBy(c,          0, interval);
			mid       = moveBy(c, interval/2, interval/2);
			h[mid] = (h[c]
					 +h[northeast]*diagonal
					 +h[southeast]
					 +h[southwest]*diagonal)/(2+diagonal*2)
					 +rand()*MAX_H*rate*Math.sqrt(2) |0;
			if (interval == size && h[mid]<-MAX_H/2) h[mid] += MAX_H; 
			adjust(mid);
		};
		var elevateSouth = (c, interval) => {
			var east, west, south, mid;
			east  = moveBy(c, -interval/2, interval/2);
			west  = moveBy(c,  interval/2, interval/2);
			south = moveBy(c,           0, interval);
			mid   = moveBy(c,           0, interval/2);
			h[mid] = (h[c]*diagonal
					 +h[east]
				 	+h[west]
					 +h[south]*diagonal)/(2+diagonal*2)
				 	+rand()*MAX_H*rate |0;
			adjust(mid);
		};
		var adjust = (c) => {
			if (h[c]>MAX_H) h[c] = MAX_H;
			else if (h[c]<-MAX_H) h[c] = -MAX_H;
			if (isEdge(c) && h[c]>-MAX_H/4) h[c] = -MAX_H/4;
			if (h[c]>maxH) maxH = h[c];
		};
		var rand = () => {
			var r = random()*2-1;
			return r;
			//return r*r*r;
		};
		return main;
	})();
	//^^^ elavate ^^^
	
	return main;
})();
