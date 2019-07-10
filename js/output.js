/*http://soliton.vm.bytemark.co.uk/pub/cpt-city/wkp/template/tn/wiki-2.0.png.index.html*/

var draw = (() => {
	var context, image,
		s, h, w, r, t,
		landMap, seaMap, riverMap, shadingMap;
	var main = () => {
		var color, data;
		getSettings();
		getMapData();
		context = context || document.getElementById("canvas").getContext("2d");
		image = context.createImageData(s, s);
		data = image.data;
		for (var c=area; c--;) {
			color = getColor(c);
			data[c*4] = color[0];
			data[c*4+1] = color[1];
			data[c*4+2] = color[2];
			data[c*4+3] = color[3];
		}
		context.clearRect(0,0,2048,2068);
		context.putImageData(image, 0, 0);
		//credit
		context.font = "10px Verdana";
		context.fillStyle = "#666666";
		context.fillText("geofiction.web.fc2.com", size-120, size+10);
		context.fillText(document.getElementById("seed").value, 0, size+10);
	};
	var getSettings = () => {
		landMap = document.getElementById("land").selectedIndex;
		seaMap = document.getElementById("sea").selectedIndex;
		riverMap = document.getElementById("river").selectedIndex;
		shadingMap = document.getElementById("shading").selectedIndex;
	};
	var getMapData = () => {
		s = size;
		h = height;
		w = water;
		r = river;
		t = tide;
	};
	var getLandColor = (c) => {
		switch (landMap) {
			case 0: //height color
				n = h[c]/maxH;
				if (n<0.5/18) return [172,208,165,255];
				if (n<1/18) return [148,191,139,255];
				if (n<2/18) return [168,198,143,255];
				if (n<3/18) return [189,204,150,255];
				if (n<4/18) return [209,215,171,255];
				if (n<5/18) return [225,228,181,255];
				if (n<6/18) return [239,235,192,255];
				if (n<7/18) return [232,225,182,255];
				if (n<8/18) return [222,214,163,255];
				if (n<9/18) return [211,202,157,255];
				if (n<10/18) return [202,185,130,255];
				if (n<11/18) return [195,167,107,255];
				if (n<12/18) return [185,152, 90,255];
				if (n<13/18) return [170,135, 83,255];
				if (n<14/18) return [172,154,124,255];
				if (n<15/18) return [186,174,154,255];
				if (n<16/18) return [202,195,184,255];
				if (n<17/18) return [224,222,216,255];
				return [245,244,242,255];
			case 1: //height mono
				n = clamp(0, 255, h[c]/maxH*256|0);
				return [255-n, (255-n/2)|0, 255-n, 255];
			case 2: //simple
				return [168,198,143,255];
			default: //none
				return [0,0,0,0];
		}
	};
	var getColor = (c) => {
		var n;
		//sea
		if (t[c]>0 && w[c]>0) {
			switch (seaMap) {
				case 0: //depth
					n = w[c]/maxH;
					if (n<1/5) return [216,242,254,255];
					if (n<2/5) return [198,236,255,255];
					if (n<3/5) return [185,227,255,255];
					if (n<4/5) return [172,219,251,255];
					if (n<5/5) return [161,210,247,255];
					if (n<6/5) return [150,201,240,255];
					if (n<7/5) return [141,193,234,255];
					if (n<8/5) return [132,185,227,255];
					if (n<9/5) return [121,178,222,255];
					return [113,171,216,255];
				case 1: //simple
					return [113,171,216,255];
				default: //none
					return [0,0,0,0];
			}
		}
		//river
		if (r[c]>0) {
			n = Math.sqrt(r[c]);
			switch (riverMap) {
				case 1: //major
					if (n>s/size*16) return (seaMap==0? [216,242,254,255] : [113,171,216,255]);
					break;
				case 2: //all
					if (n>s/16) return [113,171,216,255];
					if (n>s/32) return [132,185,227,255];
					if (n>s/64) return [150,201,240,255];
					if (n>s/128) return [172,219,251,255];
					break;
				default: //none
					break;
			}
		}
		//land
		var base, aroundH, shade;
		base = getLandColor(c);
		if (shadingMap==0 && !(h[c]<seaLevel)) {
			aroundH = (h[moveBy(c,-1,-1)]+h[moveBy(c,0,-1)]+h[moveBy(c,-1,0)])/3;
			shade = clamp(0, 1, 1-(aroundH-h[c])/20000);
			base[0] = (base[0]*shade)|0; 
			base[1] = (base[1]*shade)|0; 
			base[2] = (base[2]*shade)|0;
		}
		return base;
	};
	return main;
})();

var say = (() => {
	var output;
	var main = (word) => {
		output = output || document.getElementById("message");
		output.innerHTML = word;
	};
	return main;
})();
