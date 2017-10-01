#!/usr/bin/env node

import 'babel-polyfill';
import { Message } from './jsm';
import { Eps } from './definitions';
import { Coord, CoordFromArray } from './coord';

Message(Eps);
const testCoord = new Coord(1,0,0);
testCoord.Add(CoordFromArray([2,0,0]));
testCoord.Length();
console.log(testCoord);

export default testCoord;