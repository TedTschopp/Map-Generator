var coordinate = (x,y) => y * size + x;

var around = (c) => {
	var s, a;
	s = size;
	a = s*s;
	return [(c+1)%a, (c-1+a)%a, (c+s)%a, (c-s+a)%a];
};


var moveBy = (c,deltaX,deltaY) => {
	var size_,x,y;
	/* Why this following line? */
	size_ = size;

	x = ((c % size_   ) + deltaX + size_) % size_;
	y = ((c / size_ |0) + deltaY + size_) % size_;
	return y * size_ + x;
};

var isEdge = (c) => (c<size || c%size == 0);
