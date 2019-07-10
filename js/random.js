var setSeed = (() => {
	var input;
	return (isSeedRandom) => {
		input = input || document.getElementById("seed");
		if (isSeedRandom) input.value = Math.random()*1000000000 |0;
		seed = input.value;
	};
})();

var random = () => {
	seed = (seed*1103515245 +12345)%2147483647;
	return seed/2147483647;
};