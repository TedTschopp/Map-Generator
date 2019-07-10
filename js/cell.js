var coordinate = (x,y) => y*size +x;

var around = (c) => {
	var s, a;
	s = size;
	a = s*s;
	return [(c+1)%a, (c-1+a)%a, (c+s)%a, (c-s+a)%a];
};


var moveBy = (c,dx,dy) => {
	var s,x,y;
	s = size;
	x = ((c%s)+dx+s)%s;
	y = ((c/s|0)+dy+s)%s;
	return y*s+x;
};

var isEdge = (c) => (c<size || c%size == 0);
