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
		context.fillText("Ted Tschopp modification of geofiction.web.fc2.com", size-120, size+10);
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
				/*if (n<0.5/18) return [172,208,165,255];
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
				return [245,244,242,255];*/

				/* Black Forest? 
				if (n<.00000) return [174,239,213,255]; 
				if (n<.00670) return [175,240,211,255];  
				if (n<.01330) return [176,242,208,255];  
				if (n<.02000) return [176,242,202,255];  
				if (n<.02670) return [177,242,196,255];  
				if (n<.03330) return [176,243,190,255];  
				if (n<.04000) return [176,244,186,255];  
				if (n<.04670) return [178,246,181,255];  
				if (n<.05330) return [181,246,178,255];  
				if (n<.06000) return [186,247,178,255];  
				if (n<.06670) return [192,247,178,255];  
				if (n<.07330) return [198,248,178,255];  
				if (n<.08000) return [204,249,178,255];  
				if (n<.08670) return [210,250,177,255];  
				if (n<.09330) return [217,250,178,255];  
				if (n<.10000) return [224,251,178,255];  
				if (n<.10670) return [231,252,178,255];  
				if (n<.11330) return [238,252,179,255];  
				if (n<.12000) return [245,252,179,255];  
				if (n<.12670) return [250,252,178,255];  
				if (n<.13330) return [248,249,172,255];  
				if (n<.14000) return [238,244,162,255];  
				if (n<.14670) return [226,240,151,255];  
				if (n<.15330) return [213,235,140,255];  
				if (n<.16000) return [198,228,128,255];  
				if (n<.16670) return [184,222,118,255];  
				if (n<.17330) return [170,216,108,255];  
				if (n<.18000) return [154,211, 98,255];  
				if (n<.18670) return [140,205, 89,255];  
				if (n<.19330) return [125,199, 82,255];  
				if (n<.20000) return [110,194, 74,255];  
				if (n<.20670) return [ 94,188, 66,255];  
				if (n<.21330) return [ 77,182, 57,255];  
				if (n<.22000) return [ 62,176, 50,255];  
				if (n<.22670) return [ 49,171, 44,255];  
				if (n<.23330) return [ 39,165, 42,255];  
				if (n<.24000) return [ 30,160, 43,255];  
				if (n<.24670) return [ 24,154, 46,255];  
				if (n<.25330) return [ 18,148, 49,255];  
				if (n<.26000) return [ 14,142, 52,255];  
				if (n<.26670) return [  9,137, 56,255];  
				if (n<.27330) return [  7,132, 60,255];  
				if (n<.28000) return [ 12,130, 63,255];  
				if (n<.28670) return [ 24,130, 63,255];  
				if (n<.29330) return [ 40,132, 61,255];  
				if (n<.30000) return [ 52,136, 60,255];  
				if (n<.30670) return [ 64,140, 59,255];  
				if (n<.31330) return [ 76,142, 59,255];  
				if (n<.32000) return [ 87,146, 56,255];  
				if (n<.32670) return [ 99,148, 54,255];  
				if (n<.33330) return [110,150, 52,255];  
				if (n<.34000) return [120,154, 50,255];  
				if (n<.34670) return [128,156, 48,255];  
				if (n<.35330) return [137,160, 46,255];  
				if (n<.36000) return [147,162, 43,255];  
				if (n<.36670) return [156,164, 41,255];  
				if (n<.37330) return [166,166, 39,255];  
				if (n<.38000) return [176,170, 36,255];  
				if (n<.38670) return [187,173, 34,255];  
				if (n<.39330) return [197,176, 30,255];  
				if (n<.40000) return [207,177, 28,255];  
				if (n<.40670) return [218,179, 24,255];  
				if (n<.41330) return [228,180, 20,255];  
				if (n<.42000) return [238,182, 14,255];  
				if (n<.42670) return [246,182,  8,255];  
				if (n<.43330) return [248,176,  4,255];  
				if (n<.44000) return [244,166,  2,255];  
				if (n<.44670) return [238,155,  2,255];  
				if (n<.45330) return [232,144,  2,255];  
				if (n<.46000) return [226,132,  2,255];  
				if (n<.46670) return [220,122,  2,255];  
				if (n<.47330) return [216,111,  2,255];  
				if (n<.48000) return [211,102,  2,255];  
				if (n<.48670) return [206, 92,  2,255];  
				if (n<.49330) return [200, 84,  2,255];  
				if (n<.50000) return [192, 74,  2,255];  
				if (n<.50670) return [186, 66,  2,255];  
				if (n<.51330) return [180, 58,  2,255];  
				if (n<.52000) return [174, 49,  2,255];  
				if (n<.52670) return [169, 42,  2,255];  
				if (n<.53330) return [163, 36,  2,255];  
				if (n<.54000) return [157, 30,  2,255];  
				if (n<.54670) return [151, 23,  2,255];  
				if (n<.55330) return [146, 18,  1,255];  
				if (n<.56000) return [141, 14,  1,255];  
				if (n<.56670) return [135,  8,  0,255];  
				if (n<.57330) return [130,  5,  0,255];  
				if (n<.58000) return [125,  4,  0,255];  
				if (n<.58670) return [122,  8,  2,255];  
				if (n<.59330) return [119, 13,  2,255];  
				if (n<.60000) return [118, 16,  2,255];  
				if (n<.60670) return [117, 18,  4,255];  
				if (n<.61330) return [117, 20,  4,255];  
				if (n<.62000) return [117, 21,  4,255];  
				if (n<.62670) return [116, 22,  4,255];  
				if (n<.63330) return [116, 24,  5,255];  
				if (n<.64000) return [114, 26,  6,255];  
				if (n<.64670) return [114, 29,  6,255];  
				if (n<.65330) return [112, 31,  7,255];  
				if (n<.66000) return [111, 33,  8,255];  
				if (n<.66670) return [110, 35,  8,255];  
				if (n<.67330) return [110, 36,  8,255];  
				if (n<.68000) return [109, 38,  9,255];  
				if (n<.68670) return [108, 40, 10,255];  
				if (n<.69330) return [108, 40, 10,255];  
				if (n<.70000) return [108, 42, 10,255];  
				if (n<.70670) return [107, 44, 11,255];  
				if (n<.71330) return [106, 44, 12,255];  
				if (n<.72000) return [106, 46, 12,255];  
				if (n<.72670) return [107, 48, 14,255];  
				if (n<.73330) return [110, 52, 18,255];  
				if (n<.74000) return [113, 57, 23,255];  
				if (n<.74670) return [116, 62, 28,255];  
				if (n<.75330) return [118, 66, 32,255];  
				if (n<.76000) return [121, 70, 37,255];  
				if (n<.76670) return [125, 74, 43,255];  
				if (n<.77330) return [128, 79, 50,255];  
				if (n<.78000) return [131, 85, 56,255];  
				if (n<.78670) return [135, 90, 63,255];  
				if (n<.79330) return [138, 96, 69,255];  
				if (n<.80000) return [140,101, 76,255];  
				if (n<.80670) return [144,106, 84,255];  
				if (n<.81330) return [147,111, 90,255];  
				if (n<.82000) return [150,116, 96,255];  
				if (n<.82670) return [152,122,104,255];  
				if (n<.83330) return [156,129,112,255];  
				if (n<.84000) return [158,135,120,255];  
				if (n<.84670) return [160,141,130,255];  
				if (n<.85330) return [163,147,139,255];  
				if (n<.86000) return [166,154,147,255];  
				if (n<.86670) return [167,160,156,255];  
				if (n<.87330) return [170,167,164,255];  
				if (n<.88000) return [172,172,171,255];  
				if (n<.88670) return [174,174,174,255];  
				if (n<.89330) return [178,178,178,255];  
				if (n<.90000) return [181,181,181,255];  
				if (n<.90670) return [184,184,184,255];  
				if (n<.91330) return [188,188,188,255];  
				if (n<.92000) return [192,192,192,255];  
				if (n<.92670) return [196,196,196,255];  
				if (n<.93330) return [200,200,200,255];  
				if (n<.94000) return [204,204,204,255];  
				if (n<.94670) return [208,206,208,255];  
				if (n<.95330) return [212,210,212,255];  
				if (n<.96000) return [216,214,216,255];  
				if (n<.96670) return [218,216,218,255];  
				if (n<.97330) return [221,219,221,255];  
				if (n<.98000) return [225,223,225,255];  
				if (n<.98670) return [229,227,229,255];  
				if (n<.99330) return [233,231,233,255];  
							  return [235,233,235,255];
				*/

				/* http://soliton.vm.bytemark.co.uk/pub/cpt-city/wkp/shadowxfox/tn/colombia.png.index.html */
				if (n<0.0399568034557235) return [148,171,132,255];
				if (n<0.0601151907847372) return [148,171,132,255];
				if (n<0.0701043916486681) return [160,181,136,255];
				if (n<0.0800935925125990) return [172,191,139,255];
				if (n<0.1100611951043920) return [181,198,145,255];
				if (n<0.1400287976961840) return [189,204,150,255];
				if (n<0.1900647948164150) return [209,214,163,255];
				if (n<0.2401007919366450) return [228,223,175,255];
				if (n<0.3400827933765300) return [229,213,162,255];
				if (n<0.4400647948164150) return [230,202,148,255];
				if (n<0.5400467962563000) return [218,187,140,255];
				if (n<0.6400287976961840) return [205,171,131,255];
				if (n<0.7400107991360690) return [193,162,130,255];
				if (n<0.8399928005759540) return [181,152,128,255];
				if (n<0.9399748020158390) return [168,138,113,255];
										  return [155,123, 98,255];
				





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
					/* if (n<1/5) return [216,242,254,255];
					if (n<2/5) return [198,236,255,255];
					if (n<3/5) return [185,227,255,255];
					if (n<4/5) return [172,219,251,255];
					if (n<5/5) return [161,210,247,255];
					if (n<6/5) return [150,201,240,255];
					if (n<7/5) return [141,193,234,255];
					if (n<8/5) return [132,185,227,255];
					if (n<9/5) return [121,178,222,255];
					return [113,171,216,255]; */

					n = Math.abs( n - 1);

					/* XKCD */
					if (n< .00000 ) return [  1,  1,  2,255];  
					if (n< .00800 ) return [  1,  2,  3,255];  
					if (n< .01600 ) return [  1,  2,  3,255];  
					if (n< .02400 ) return [  1,  3,  4,255];  
					if (n< .03200 ) return [  1,  3,  4,255];  
					if (n< .04000 ) return [  2,  3,  5,255];  
					if (n< .04800 ) return [  2,  4,  6,255];  
					if (n< .05600 ) return [  2,  4,  8,255];  
					if (n< .06400 ) return [  3,  5,  9,255];  
					if (n< .07200 ) return [  3,  5, 10,255];  
					if (n< .08000 ) return [  3,  6, 11,255];  
					if (n< .08800 ) return [  4,  7, 12,255];  
					if (n< .09600 ) return [  4,  7, 13,255];  
					if (n< .10400 ) return [  4,  8, 14,255];  
					if (n< .11200 ) return [  4,  9, 15,255];  
					if (n< .12000 ) return [  4,  9, 16,255];  
					if (n< .12800 ) return [  5, 10, 17,255];  
					if (n< .13600 ) return [  5, 10, 19,255];  
					if (n< .14400 ) return [  6, 11, 20,255];  
					if (n< .15200 ) return [  6, 12, 21,255];  
					if (n< .16000 ) return [  6, 13, 22,255];  
					if (n< .16800 ) return [  7, 14, 24,255];  
					if (n< .17600 ) return [  7, 14, 24,255];  
					if (n< .18400 ) return [  7, 15, 25,255];  
					if (n< .19200 ) return [  6, 15, 26,255];  
					if (n< .20000 ) return [  6, 15, 28,255];  
					if (n< .20800 ) return [  7, 16, 29,255];  
					if (n< .21600 ) return [  7, 17, 31,255];  
					if (n< .22400 ) return [  8, 18, 32,255];  
					if (n< .23200 ) return [  8, 19, 33,255];  
					if (n< .24000 ) return [  8, 19, 35,255];  
					if (n< .24800 ) return [  9, 20, 37,255];  
					if (n< .25600 ) return [  9, 20, 38,255];  
					if (n< .26400 ) return [ 10, 21, 39,255];  
					if (n< .27200 ) return [ 10, 22, 40,255];  
					if (n< .28000 ) return [ 10, 23, 42,255];  
					if (n< .28800 ) return [ 11, 24, 44,255];  
					if (n< .29600 ) return [ 11, 25, 45,255];  
					if (n< .30400 ) return [ 12, 26, 47,255];  
					if (n< .31200 ) return [ 12, 26, 48,255];  
					if (n< .32000 ) return [ 12, 27, 50,255];  
					if (n< .32800 ) return [ 13, 28, 52,255];  
					if (n< .33600 ) return [ 14, 29, 53,255];  
					if (n< .34400 ) return [ 14, 30, 54,255];  
					if (n< .35200 ) return [ 14, 31, 56,255];  
					if (n< .36000 ) return [ 14, 32, 58,255];  
					if (n< .36800 ) return [ 15, 33, 60,255];  
					if (n< .37600 ) return [ 16, 34, 62,255];  
					if (n< .38400 ) return [ 16, 34, 64,255];  
					if (n< .39200 ) return [ 16, 36, 65,255];  
					if (n< .40000 ) return [ 16, 36, 67,255];  
					if (n< .40800 ) return [ 17, 37, 68,255];  
					if (n< .41600 ) return [ 18, 38, 70,255];  
					if (n< .42400 ) return [ 18, 39, 72,255];  
					if (n< .43200 ) return [ 19, 40, 73,255];  
					if (n< .44000 ) return [ 19, 41, 76,255];  
					if (n< .44800 ) return [ 20, 43, 78,255];  
					if (n< .45600 ) return [ 21, 44, 80,255];  
					if (n< .46400 ) return [ 21, 45, 82,255];  
					if (n< .47200 ) return [ 22, 46, 84,255];  
					if (n< .48000 ) return [ 22, 47, 85,255];  
					if (n< .48800 ) return [ 23, 48, 87,255];  
					if (n< .49600 ) return [ 24, 50, 90,255];  
					if (n< .50400 ) return [ 25, 52, 94,255];  
					if (n< .51200 ) return [ 26, 55, 98,255];  
					if (n< .52000 ) return [ 27, 58,104,255];  
					if (n< .52800 ) return [ 28, 61,109,255];  
					if (n< .53600 ) return [ 29, 63,113,255];  
					if (n< .54400 ) return [ 31, 65,117,255];  
					if (n< .55200 ) return [ 32, 68,122,255];  
					if (n< .56000 ) return [ 33, 71,125,255];  
					if (n< .56800 ) return [ 34, 74,129,255];  
					if (n< .57600 ) return [ 35, 75,133,255];  
					if (n< .58400 ) return [ 36, 78,137,255];  
					if (n< .59200 ) return [ 37, 80,141,255];  
					if (n< .60000 ) return [ 39, 83,146,255];  
					if (n< .60800 ) return [ 40, 86,150,255];  
					if (n< .61600 ) return [ 42, 88,154,255];  
					if (n< .62400 ) return [ 43, 91,158,255];  
					if (n< .63200 ) return [ 44, 93,161,255];  
					if (n< .64000 ) return [ 45, 96,164,255];  
					if (n< .64800 ) return [ 45, 98,167,255];  
					if (n< .65600 ) return [ 47,100,171,255];  
					if (n< .66400 ) return [ 48,102,174,255];  
					if (n< .67200 ) return [ 50,105,177,255];  
					if (n< .68000 ) return [ 52,108,180,255];  
					if (n< .68800 ) return [ 54,112,184,255];  
					if (n< .69600 ) return [ 55,115,187,255];  
					if (n< .70400 ) return [ 57,119,191,255];  
					if (n< .71200 ) return [ 58,122,194,255];  
					if (n< .72000 ) return [ 60,125,197,255];  
					if (n< .72800 ) return [ 62,129,200,255];  
					if (n< .73600 ) return [ 64,133,203,255];  
					if (n< .74400 ) return [ 66,136,206,255];  
					if (n< .75200 ) return [ 67,140,209,255];  
					if (n< .76000 ) return [ 69,144,212,255];  
					if (n< .76800 ) return [ 71,149,214,255];  
					if (n< .77600 ) return [ 74,153,217,255];  
					if (n< .78400 ) return [ 76,156,219,255];  
					if (n< .79200 ) return [ 78,159,221,255];  
					if (n< .80000 ) return [ 79,164,223,255];  
					if (n< .80800 ) return [ 81,167,225,255];  
					if (n< .81600 ) return [ 83,170,227,255];  
					if (n< .82400 ) return [ 85,174,229,255];  
					if (n< .83200 ) return [ 87,179,231,255];  
					if (n< .84000 ) return [ 89,183,233,255];  
					if (n< .84800 ) return [ 91,187,234,255];  
					if (n< .85600 ) return [ 93,190,236,255];  
					if (n< .86400 ) return [ 95,193,237,255];  
					if (n< .87200 ) return [ 97,197,239,255];  
					if (n< .88000 ) return [ 98,200,241,255];  
					if (n< .88800 ) return [ 99,203,242,255];  
					if (n< .89600 ) return [101,206,243,255];  
					if (n< .90400 ) return [103,210,244,255];  
					if (n< .91200 ) return [105,213,246,255];  
					if (n< .92000 ) return [107,217,247,255];  
					if (n< .92800 ) return [108,219,248,255];  
					if (n< .93600 ) return [109,221,249,255];  
					if (n< .94400 ) return [110,223,250,255];  
					if (n< .95200 ) return [112,225,252,255];  
					if (n< .96000 ) return [113,228,253,255];  
					if (n< .96800 ) return [114,230,254,255];  
					if (n< .97600 ) return [114,231,254,255];  
					if (n< .98400 ) return [115,233,255,255];  
					if (n< .99200 ) return [116,233,255,255];  
									return [117,234,255,255];







/*					if (n<.00001) return [  0,  0,126,255];  
					if (n<.09520) return [  0, 45,165,255];  
					if (n<.14290) return [  0, 60,180,255];  
					if (n<.19050) return [ 10, 85,195,255];  
					if (n<.23810) return [ 10,100,205,255];  
					if (n<.28570) return [ 10,130,200,255];  
					if (n<.33330) return [ 10,150,200,255];  
					if (n<.38100) return [ 10,160,205,255];  
					if (n<.42860) return [ 50,170,210,255];  
					if (n<.47620) return [ 80,170,215,255];  
					if (n<.52380) return [ 90,180,220,255];  
					if (n<.52380) return [ 90,180,200,255];  
					if (n<.57140) return [120,180,220,255];  
					if (n<.61900) return [150,180,220,255];  
					if (n<.66670) return [165,190,210,255];  
					if (n<.71430) return [170,200,225,255];  
					if (n<.76190) return [175,215,235,255];  
					if (n<.80950) return [185,220,245,255];  
					if (n<.83810) return [220,230,250,255];  
					if (n<.85710) return [235,235,250,255];  
								  return [235,235,250,255];*/
				case 1: //simple
					return [ 50,105,177,255];
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
