var clamp = (min, max, value) => {
	return (value<min? min: (value>max? max: value));
};

class Heap {
	constructor() {
		this.keys = [];
		this.values = [];
		this.length = 0;
	}
	add(key, value) {
		var i, parent;
		this.keys.push(key);
		this.values[key] = value;
		i = this.length++;
		while (i > 0) {
			parent = ((i-1)/2)|0;
			if (this.ifWin(i, parent)) this.exchange(i, parent);
			else break;
			i = parent;
		}
	}
	getTop() {
		var top, i, left, right, stronger;
		top = this.keys[0];
		if (this.length == 1) {
			this.keys = [];
			this.length = 0;
			return top;
		}
		this.keys[0] = this.keys.pop();
		this.length--;
		i = 0;
		left = 1;
		right = 2;
		while (left < this.length) {
			if (right == this.length ||
				this.ifWin(left, right)) stronger = left;
			else stronger = right;
			if (this.ifWin(stronger, i)) this.exchange(stronger, i);
			else break;
			i = stronger;
			left = i*2+1;
			right = left+1;
		}
		return top;
	}
	ifWin(a, b) {
		return this.values[this.keys[a]] < this.values[this.keys[b]]
	}
	exchange(a, b)  {
		var k = this.keys[a];
		this.keys[a] = this.keys[b];
		this.keys[b] = k;
	}
	ifAny() {
		return (this.keys.length > 0);
	}
};