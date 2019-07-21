var startWater = (() => {
	var processor;
	var main = () => {
		if (!height) return;
		processor = simulateWater();
		process();
	};
	var process = () => {
		if (!isProcessing) return;
		if (processor.next().done) {
			isProcessing = false;
			return;
		}
		setTimeout(process, 0);
	};
	return main;
})();

var simulateWater = (() => {
	var progressCount;
	
	var main = function* () {
		progressCount = 0;
		say("simulating water... (0%)");
		seaLevel = -200*6;
		for (var i=0; i<6; i++) {
			seaLevel += 200;
			yield* simulateSea();
			yield* simulateRiver(i==5, false);
		}
		yield* simulateSea();
		yield* simulateRiver(false, true);
		draw();
		say("done.");
	};
	
	//vvv sea vvv
	var simulateSea = (() => {
		var h, w, t, r;
		var main = function* () {
			getMapData();
			yield dry();
			yield* fill();
			//yield draw();
			say("simulating water... ("+((++progressCount)/146*100|0)+"%)");
		};
		var getMapData = () => {
			h = height;
			w = water;
			t = tide;
			r = river;
		};
		var dry = () => {
			for (var c=area; c--;) {
				w[c] = 0;
				t[c] = 0;
				r[c] = 0;
			}
		};
		var fill = function* () {
			var list, i, j, c, count;
			list = [0];
			i = 0;
			j = 1;
			count = 0;
			do {
				c = list[i++];
				for (var d of around(c)) {
					if (h[d]<seaLevel && w[d]==0) {
						w[d] = seaLevel-h[d];
						t[d] = 1;
						list[j++] = d;
					}
				}
				if ((count++)%200000 == 0) yield;
			} while (i<j);
		};
		return main;
	})();
	//^^^ sea ^^^
	
	//vvv river vvv
	var simulateRiver = (() => {
		var h, w, t, r, ifDrawRiver;
		var main = function* (ifLast, dr) {
			var a, c;
			getMapData();
			a = area;
			c = 0;
			ifDrawRiver = dr;
			do {
				if (t[c]==0) flowFrom(c);
				c = (c+23)%a;
				if (c<23) {
					say("simulating water... ("+((++progressCount)/146*100|0)+"%)");
					draw();
					if (c==0 || ifLast) break;
					dry();
				}
				if (c%1000 == 0) yield;
			} while (true);
		};
		var getMapData = () => {
			h = height;
			w = water;
			t = tide;
			r = river;
		};
		var dry = () => {
			for (var c=area; c--;) {
				if (t[c]==0) w[c] = 0;
				else if (w[c]>0) t[c] == 1; //reset tide value of sea
			}
		};
		//vv flow from vv
		var flowFrom = (() => {
			var sand;
			var main = (origin) => {
				var c, d, gap, amount;
				c = origin;
				sand = 0;
				do {
					d = getLowest(c);
					if (t[d]>0 && w[d]>0) {
						if (sand == 0 || spreadOverSea(d)) break;
					}
					if (!ifDrawRiver) erodeOrSediment(c, d);
					gap = h[c]+w[c] -h[d]-w[d];
					if (gap <= 0) {
						d = spreadOverBasin(c);
						if (d == -1) break;
					}
					r[c]++;
					c = d;
				} while (true);
			};
			var getLowest = (c) => {
				var lowestH, lowestC, dH;
				for (var d of around(c)) {
					dH = h[d]+w[d];
					if (lowestH == undefined || dH < lowestH ||
					    (dH == lowestH &&
					    ((w[d]>0 && w[lowestC]==0) ||
					     (!ifDrawRiver && random()<1/2) ||
						 (ifDrawRiver && c%7<3)))) {
							lowestC = d;
							lowestH = dH;
					}
				}
				return lowestC;
			};
			var erodeOrSediment = (c, d) => {
				var gap, capacity, amount;
				gap = h[c]+w[c] -h[d]-w[d];
				if (gap<=0 || w[c]>0) {
					sediment(c, clamp(0, sand, 1-gap+Math.min(4, w[c])));
					gap = h[c]+w[c] -h[d]-w[d];
					if (gap<=0) return;
				}
				//sed: -20, ero: 20+ (40=1m)
				amount = clamp(0, sand, (random()+2-gap/10)|0);
				if (amount>0) sediment(c, amount);
				else if (sand<384 && h[c]>h[d]+w[d]){ //384
					amount = gap/20+random() |0;
					h[c] -= amount;
					sand += amount;
				}
			};
			var sediment = (c, amount) => {
				h[c] += amount;
				sand -= amount;
				w[c] = clamp(0, w[c], w[c]-amount);
			};
			var spreadOverSea = (origin) => {
				var heap, c, isChecked;
				heap = new Heap();
				heap.add(origin);
				getT(origin);
				isChecked = [];
				while (true) {
					c = heap.getTop();
					sediment(c, Math.min(sand, w[c], t[c]<144?4:1));
					for (var d of around(c)) {
						if (isChecked[d] || w[d]==0 || t[d]==0) continue;
						isChecked[d] = true;
						heap.add(d, getT(d));
					}
					//stop spreading
					//if (sand == 0) return true;
					if (!heap.ifAny()) return false;
				}
			};
			var getT = (origin) => {
				var list, distance, i, l, c, res;
				if (t[origin] != 1) return t[origin];
				list = [origin];
				distance = [];
				distance[origin] = 0;
				i = 0;
				l = 1;
				do {
					c = list[i++];
					if (distance[c]>=32) break;
					for (var d of around(c)) {
						if (w[d]>0 && distance[d] == undefined) {
							distance[d] = distance[c]+1;
							list[l++] = d;
						}
					}
				} while (i<l);
				res = i/1924*256|0;
				t[origin] = res;
				return res;
			};
			var spreadOverBasin = (origin) => {
				var heap, c, isChecked, exitH;
				heap = new Heap();
				heap.add(origin, h[origin]+w[origin]);
				isChecked = [];
				isChecked[origin] = true;
				loop: while (true) {
					c = heap.getTop();
					//r[c]++;
					for (var d of around(c)) {
						if (ifDrawRiver && h[c]+w[c]>h[d]+w[d] && t[d]>0 && w[d]>0) break loop;
						if (isChecked[d] || (t[d]>0 && w[d]>0)) continue;
						if (h[c]+w[c]>h[d]+w[d]) break loop;
						heap.add(d, h[d]+w[d]);
						isChecked[d] = true;
						if (sand>0) sediment(d, Math.min(sand, w[d], 4));
					}
					if (!heap.ifAny()) return -1;
				}
				exitH = h[c]+w[c];
				for (var e in isChecked) {
					if (exitH>h[e]+w[e]) w[e] = exitH-h[e];
				}
				if (ifDrawRiver) routeToExit(origin, c, isChecked);
				return c;
			};
			var routeToExit = (origin, exit, isChecked) => {
				var heap, distance, from, c;
				heap = new Heap();
				distance = [];
				distance[origin] = 0;
				from = [];
				heap.add(origin, 0);
				while (true) {
					c = heap.getTop();
					if (c==exit) break;
					for (var d of around(c)) {
						if (!isChecked[d] || distance[d]<=distance[c]+1) continue;
						distance[d] = distance[c]+1;
						heap.add(d, distance[d]);
						from[d] = c;
					}
				}
				do {
					r[c]++;
					c = from[c];
				} while (c != origin);
			};
			return main;
		})();
		//^^ flow from ^^
		return main;
	})();
	//^^^ river ^^^
	
	return main;
})();