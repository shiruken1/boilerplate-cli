import './definitions';
/**
* Class: Coord
* Description: Represents a 3D coordinate.
* Parameters:
*	x {number} the first component
*	y {number} the second component
*	z {number} the third component
*/
export class Coord {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	};
	Set (x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	};
	IsEqual (coord)
	{
		return IsEqual (this.x, coord.x) && IsEqual (this.y, coord.y) && IsEqual (this.z, coord.z);
	};
	IsEqualWithEps (coord, eps)
	{
		return IsEqualWithEps (this.x, coord.x, eps) && IsEqualWithEps (this.y, coord.y, eps) && IsEqualWithEps (this.z, coord.z, eps);
	};
	DistanceTo (coord)
	{
		return Math.sqrt ((coord.x - this.x) * (coord.x - this.x) + (coord.y - this.y) * (coord.y - this.y) + (coord.z - this.z) * (coord.z - this.z));
	};
	AngleTo (coord)
	{
		var aDirection = this.Clone ().Normalize ();
		var bDirection = coord.Clone ().Normalize ();
		if (aDirection.IsEqual (bDirection)) {
			return 0.0;
		}
		var product = VectorDot (aDirection, bDirection);
		return ArcCos (product);
	};
	IsCollinearWith (coord)
	{
		var angle = this.AngleTo (coord);
		return IsEqual (angle, 0.0) || IsEqual (angle, Math.PI);
	};
	IsPerpendicularWith (coord)
	{
		var angle = this.AngleTo (coord);
		return IsEqual (angle, Math.PI / 2.0);
	};
	Length ()
	{
		return Math.sqrt (this.x * this.x + this.y * this.y + this.z * this.z);
	};
	Add (coord)
	{
		this.x += coord.x;
		this.y += coord.y;
		this.z += coord.z;
	};
	Sub (coord)
	{
		this.x -= coord.x;
		this.y -= coord.y;
		this.z -= coord.z;
	};
	MultiplyScalar (scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	};
	Normalize ()
	{
		var length = this.Length ();
		if (IsPositive (length)) {
			this.MultiplyScalar (1.0 / length);
		}
		return this;
	};
	SetLength (length)
	{
		var thisLength = this.Length ();
		if (IsPositive (thisLength)) {
			this.MultiplyScalar (length / thisLength);
		}
		return this;
	};
	Offset (direction, distance)
	{
		var normal = direction.Clone ().Normalize ();
		this.x += normal.x * distance;
		this.y += normal.y * distance;
		this.z += normal.z * distance;
		return this;
	};
	Rotate (axis, angle, origo)
	{
		var normal = axis.Clone ().Normalize ();

		var u = normal.x;
		var v = normal.y;
		var w = normal.z;

		var x = this.x - origo.x;
		var y = this.y - origo.y;
		var z = this.z - origo.z;

		var si = Math.sin (angle);
		var co = Math.cos (angle);
		this.x = - u * (- u * x - v * y - w * z) * (1.0 - co) + x * co + (- w * y + v * z) * si;
		this.y = - v * (- u * x - v * y - w * z) * (1.0 - co) + y * co + (w * x - u * z) * si;
		this.z = - w * (- u * x - v * y - w * z) * (1.0 - co) + z * co + (- v * x + u * y) * si;

		this.x += origo.x;
		this.y += origo.y;
		this.z += origo.z;
		return this;
	};
	ToCoord2D (normal)
	{
		var origo = new Coord (0.0, 0.0, 0.0);
		var zNormal = new Vector (0.0, 0.0, 1.0);
		var axis = VectorCross (normal, zNormal);
		var angle = normal.AngleTo (zNormal);
		var rotated = this.Clone ().Rotate (axis, angle, origo);
		return new Coord2D (rotated.x, rotated.y);
	};
	ToString ()
	{
		return ('(' + this.x + ', ' + this.y + ', ' + this.z + ')');
	};
	Clone ()
	{
		return new Coord (this.x, this.y, this.z);
	};
};

/**
* Class: Vector
* Description: Same as Coord.
*/
const Vector = Coord;

/**
* Function: CoordFromArray
* Description: Returns a coordinate from an array of components.
* Parameters:
*	array {number[3]} the array of components
* Returns:
*	{Coord} the result
*/
const CoordFromArray = function (array)
{
	return new Coord (array[0], array[1], array[2]);
};

/**
* Function: CoordToArray
* Description: Returns array of components from a coordinate.
* Parameters:
*	coord {Coord} the coordinate
* Returns:
*	array {number[3]} the result
*/
const CoordToArray = function (coord)
{
	return [coord.x, coord.y, coord.z];
};

/**
* Function: CoordAdd
* Description: Adds two coordinates.
* Parameters:
*	a {Coord} the first coordinate
*	b {Coord} the second coordinate
* Returns:
*	{Coord} the result
*/
const CoordAdd = function (a, b)
{
	return new Coord (a.x + b.x, a.y + b.y, a.z + b.z);
};

/**
* Function: CoordSub
* Description: Subs two coordinates.
* Parameters:
*	a {Coord} the first coordinate
*	b {Coord} the second coordinate
* Returns:
*	{Coord} the result
*/
const CoordSub = function (a, b)
{
	return new Coord (a.x - b.x, a.y - b.y, a.z - b.z);
};

/**
* Function: VectorDot
* Description: Calculates the dot product of two vectors.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
* Returns:
*	{number} the result
*/
const VectorDot = function (a, b)
{
	return a.x * b.x + a.y * b.y + a.z * b.z;
};

/**
* Function: VectorCross
* Description: Calculates the cross product of two vectors.
* Parameters:
*	a {Vector} the first vector
*	b {Vector} the second vector
* Returns:
*	{Vector} the result
*/
const VectorCross = function (a, b)
{
	var result = new Vector (0.0, 0.0, 0.0);
	result.x = a.y * b.z - a.z * b.y;
	result.y = a.z * b.x - a.x * b.z;
	result.z = a.x * b.y - a.y * b.x;
	return result;
};

export { Vector, CoordFromArray, CoordToArray, CoordAdd, CoordSub, VectorDot, VectorCross };