/****************************************************************************
 * Copyright (C) 2015-2016 EPAM Systems
 * 
 * This file is part of Indigo-Node binding.
 * 
 * This file may be distributed and/or modified under the terms of the
 * GNU General Public License version 3 as published by the Free Software
 * Foundation and appearing in the file LICENSE.md  included in the
 * packaging of this file.
 * 
 * This file is provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE
 * WARRANTY OF DESIGN, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
 ***************************************************************************/

IndigoObject = function (d, id, parent) {
	this.id = id;
	this.d = d;
	this.parent = parent;
};

/*
 * Free an object
 * 
 * @method dispose
 */
IndigoObject.prototype.dispose = function () {
	if (this.id >= 0)
		if (this.d._sid >= 0 && this.d._lib != null) {
			this.d._setSessionId();
			this.d._lib.indigoFree(this.id);
		}
	this.id = -1;
};

/*
 * Clone an object
 * 
 * @method clone
 */
IndigoObject.prototype.clone = function () {
	this.d._setSessionId();
	return new IndigoObject(this.d, this.d._checkResult(this.d._lib.indigoClone(this.id)));
};

/*
 * Get a 3d coordinates of an atom
 * 
 * @method xyz
 * @returns {Array} the [x, y, z] coordinates
 */
IndigoObject.prototype.xyz = function () {
	this.d._setSessionId();
	var xyz_ptr = this.d._lib.indigoXYZ(this.id); /* int atom */
	if (xyz_ptr.length == 0) {
		var msg = this.d.getLastError();
		this.d.logger.error('xyz [fault]: ' + msg);
		return [0.0, 0.0, 0.0];
	}
	
	var xyz = xyz_ptr.deref();
	return [xyz.x, xyz.y, xyz.z];
};

/*
 * Set a 3d coordinates of an atom
 * 
 * @method xyz
 * @returns {Array} the [x, y, z] coordinates
 */
IndigoObject.prototype.setXYZ = function (x, y, z) {
	this.d._setSessionId();
	return this.d._checkResult(this.d._lib.indigoSetXYZ(this.id, x, y, z));
};

/*
 * Generate molfile from IndigoObject
 * 
 * @method molfile
 * @returns {string} string reprsantation of molfile
 */
IndigoObject.prototype.molfile = function () {
	this.d._setSessionId();
	return this.d._checkResultString(this.d._lib.indigoMolfile(this.id));
};

/*
 * 
 * @method match
 * @param {object} query
 * @returns {object}  
 */
IndigoObject.prototype.match = function (query) {
	this.d._setSessionId();
	var newobj = this.d._checkResult(this.d._lib.indigoMatch(this.id, query.id));
	if (newobj === 0 || newobj === -1)
		return null;
	else
		return new IndigoObject(d, newobj, this);
};

/*
 * 
 * @method match
 * @returns {string}  
 */
IndigoObject.prototype.smiles = function () {
	this.d._setSessionId();
	return this.d._checkResultString(this.d._lib.indigoSmiles(this.id));
};

/*
 * 
 * @method iterateAtoms
 * @returns {object}  
 */
IndigoObject.prototype.iterateAtoms = function* () {
	this.d._setSessionId();
	var newobj = new IndigoObject(this.d, this.d._checkResult(this.d._lib.indigoIterateAtoms(this.id)));
	while (newobj && newobj.id !== -1) {
		yield newobj;
		newobj = new IndigoObject(this.d, this.d._checkResult(this.d._lib.indigoIterateAtoms(newobj.id)));
	}
};

/*
 * 
 * @method iterateNeighbors
 * @returns {object}  
 */
IndigoObject.prototype.iterateNeighbors = function* () {
	this.d._setSessionId();
	var newobj = new IndigoObject(this.d, this.d._checkResult(this.d._lib.indigoIterateNeighbors(this.id)));
	while (newobj && newobj.id !== -1) {
		yield newobj;
		newobj = new IndigoObject(this.d, this.d._checkResult(this.d._lib.indigoIterateNeighbors(newobj.id)));
	}
};

/*
 * 
 * @method removeConstraints
 * @returns {number}  
 */
IndigoObject.prototype.removeConstraints = function (type) {
	this.d._setSessionId();
	return this.d._checkResult(this.d._lib.indigoRemoveConstraints(this.id, type));
};

/*
 * 
 * @method canonicalSmiles
 * @returns {string}  
 */
IndigoObject.prototype.canonicalSmiles = function () {
	this.d._setSessionId();
	return this.d._checkResultString(this.d._lib.indigoCanonicalSmiles(this.id));
};

/*
 * 
 * @method unfoldHydrogens
 * @returns {number}  
 */
IndigoObject.prototype.unfoldHydrogens = function () {
	this.d._setSessionId();
	return this.d._checkResult(this.d._lib.indigoUnfoldHydrogens(this.id));
};

/*
 * 
 * @method resetAtom
 * @returns {number}  
 */
IndigoObject.prototype.resetAtom = function (symbol) {
	this.d._setSessionId();
	return this.d._checkResult(this.d._lib.indigoResetAtom(this.id, symbol));
};

/*
 * 
 * @method serialize
 * @returns {Array}  
 */
IndigoObject.prototype.serialize = function () {
	this.d._setSessionId();
	var size = this.d._out.aint; // allocate a 4-byte (32-bit) chunk for the output value
	var pointer = this.d._out.apbyte;
	var status = this.d._checkResult(this.d._lib.indigoSerialize(this.id, pointer, size));
	var buf = this.d._out.read(pointer, 0, size.deref());
	var res = [];
	for (i = 0; i < size.deref(); i++) {
		res.push(buf[i]);
	}
	return res;
};

/*
 * 
 * @method charge
 * @returns {number}  
 */
IndigoObject.prototype.charge = function () {
	this.d._setSessionId();
	var value = this.d._out.aint;
	var res = this.d._checkResult(this.d._lib.indigoGetCharge(this.id, value));
	if (res === null)
		return null;
	else
		return value.deref();
};

/*
 * 
 * @method valence
 * @returns {number}  
 */
IndigoObject.prototype.valence = function () {
	this.d._setSessionId();
	return this.d._checkResult(this.d._lib.indigoValence(this.id));
};

/*
 * 
 * @method clearStereocenters
 * @returns {number}  
 */
IndigoObject.prototype.clearStereocenters = function () {
	this.d._setSessionId(); /* only molecules and reactions have stereocenters */
	return this.d._checkResult(this.d._lib.indigoClearStereocenters(this.id));
};

/*
 * 
 * @method grossFormula
 * @returns {string}  
 */
IndigoObject.prototype.grossFormula = function () {
	this.d._setSessionId();
	var gfid = this.d._checkResult(this.d._lib.indigoGrossFormula(this.id));
	var gf = new IndigoObject(this.d, gfid);
	return this.d._checkResultString(this.d._lib.indigoToString(gf.id));
};

/*
 * 
 * @method index
 * @returns {number}  
 */
IndigoObject.prototype.index = function () {
	this.d._setSessionId();
	return this.d._checkResult(this.d._lib.indigoIndex(this.id));
};

/*
 * 
 * @method normalize
 * @returns {number}  
 */
IndigoObject.prototype.normalize = function (options) {
	this.d._setSessionId();
	if (options === undefined || options === null) {
		options = '';
	}
	return this.d._checkResult(this.d._lib.indigoNormalize(this.id, options));
};

/*
 * 
 * @method symbol
 * @returns {string}  
 */
IndigoObject.prototype.symbol = function () {
	this.d._setSessionId();
	return this.d._checkResultString(this.d._lib.indigoSymbol(this.id));
}

/*
 * 
 * @method resetSymmetricCisTrans
 * @returns {number}  
 */
IndigoObject.prototype.resetSymmetricCisTrans = function () {
	this.d._setSessionId();
	return this.d._checkResult(this.d._lib.indigoResetSymmetricCisTrans(this.id));
}

/*
 * 
 * @method resetSymmetricStereocenters
 * @returns {number}  
 */
IndigoObject.prototype.resetSymmetricStereocenters = function () {
	this.d._setSessionId();
	return this.d._checkResult(this.d._lib.indigoResetSymmetricStereocenters(this.id));
}

/*
 * 
 * @method removeBonds
 * @returns {number}  
 */
IndigoObject.prototype.removeBonds = function (bonds) {
	this.d._setSessionId();
	var buf = new Buffer(bonds);
	var pointer = this.d._out.alloc(this.d._type.int_ptr, buf);
	return new IndigoObject(this.d, this.d._checkResult(this.d._lib.indigoRemoveBonds(this.id, bonds.length, pointer.deref())));
}


module.exports = IndigoObject;
