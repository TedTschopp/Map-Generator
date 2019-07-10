var isProcessing = false;

var onClickRandom = () => {
	getHeightMap(true);
	isProcessing = false;
};

var onClickSeed = () => {
	getHeightMap(false);
	isProcessing = false;
};

var onClickStart = () => {
	if (isProcessing) return;
	isProcessing = true;
	startWater();
};

var onClickRedraw = () => {
	draw();
};