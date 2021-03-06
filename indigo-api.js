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
var ffi = require('ffi');
var ref = require('ref');
var ref_struct = require('ref-struct');
var ArrayType = require('ref-array');
var ByteArray = ArrayType('byte');
var IntArray = ArrayType('int');
var FloatArray = ArrayType('float');
var byte_ptr = ref.refType('byte');
var int_ptr = ref.refType('int');
var char_ptr = ref.refType('char');
var float_ptr = ref.refType('float');
var double_ptr = ref.refType('double');
var bool_ptr = ref.refType('bool');
var wchar = ('win32' == process.platform)?('uint16'):('uint32');
var wchar_ptr = ref.refType(wchar);

var byte_p_ptr = ref.refType(byte_ptr);
var qword = ('win32' == process.platform)?('uint64'):('ulonglong');

var xyz = ref_struct({ x: 'float', y: 'float',z: 'float' });
var xyz_ptr = ref.refType(xyz);

module.exports = {
	Library: ffi.Library,
	api: {
		"indigoSetOption" : ["int", ["string", "string"]],
		"indigoSetOptionInt" : ["int", ["string", "int"]],
		"indigoSetOptionBool" : ["int", ["string", "int"]],
		"indigoSetOptionFloat" : ["int", ["string", "float"]],
		"indigoSetOptionColor" : ["int", ["string", "float", "float", "float"]],
		"indigoSetOptionXY" : ["int", ["string", "int", "int"]],
		"indigoDbgBreakpoint": ["void", []],
		"indigoVersion": ["string", []], 
		"indigoAllocSessionId": [qword, []],
		"indigoSetSessionId": ["void", [qword]],
		"indigoReleaseSessionId": ["void", [qword]],
		"indigoGetLastError": ["string", []],
		"indigoFree": ["int", ["int"]],
		"indigoCountReferences": ["int", []],
		"indigoFreeAllObjects": ["int", []],
		"indigoWriteBuffer": ["int", []],
		"indigoCreateMolecule": ["int", []],
		"indigoCreateQueryMolecule": ["int", []],
		"indigoNext": ["int", ["int"]],
		"indigoHasNext": ["int", ["int"]],
		"indigoClone": ["int", ["int"]],
		"indigoClose": ["int", ["int"]],
		"indigoIndex": ["int", ["int"]],
		"indigoRemove": ["int", ["int"]],
		"indigoSaveMolfileToFile": ["int", ["string"]], 
		"indigoMolfile": ["string", ["int"]],
		"indigoSaveCmlToFile": ["int", ["string"]], 
		"indigoCml": ["string", ["int"]],
		"indigoSaveMDLCT": ["int", ["int", "int"]],
		"indigoAddReactant": ["int", ["int", "int"]],
		"indigoAddProduct": ["int", ["int", "int"]],
		"indigoAddCatalyst": ["int", ["int", "int"]],
		"indigoCountReactants": ["int", ["int"]],
		"indigoCountProducts": ["int", ["int"]],
		"indigoCountCatalysts": ["int", ["int"]],
		"indigoCountMolecules": ["int", ["int"]],
		"indigoGetMolecule": ["int", ["int", "int"]],
		"indigoIterateReactants": ["int", ["int"]],
		"indigoIterateProducts": ["int", ["int"]],
		"indigoIterateCatalysts": ["int", ["int"]],
		"indigoIterateMolecules": ["int", ["int"]],
		"indigoSaveRxnfileToFile": ["int", ["int", "string"]], 
		"indigoRxnfile": ["string", ["int"]],
		"indigoOptimize": ["int", ["int", "string"]], 
		"indigoNormalize": ["int", ["int", "string"]], 
		"indigoStandardize": ["int", ["int"]],
		"indigoAutomap": ["int", ["int", "string"]], 
		"indigoGetAtomMappingNumber": ["int", ["int", "int"]],
		"indigoSetAtomMappingNumber": ["int", ["int", "int", "int"]],
		"indigoGetReactingCenter": ["int", ["int", "int", int_ptr]],
		"indigoSetReactingCenter": ["int", ["int", "int", "int"]],
		"indigoClearAAM": ["int", ["int"]],
		"indigoCorrectReactingCenters": ["int", ["int"]],
		"indigoIterateAtoms": ["int", ["int"]],
		"indigoIteratePseudoatoms": ["int", ["int"]],
		"indigoIterateRSites": ["int", ["int"]],
		"indigoIterateStereocenters": ["int", ["int"]],
		"indigoIterateAlleneCenters": ["int", ["int"]],
		"indigoIterateRGroups": ["int", ["int"]],
		"indigoIsPseudoatom": ["int", ["int"]],
		"indigoIsRSite": ["int", ["int"]],
		"indigoStereocenterType": ["int", ["int"]],
		"indigoStereocenterGroup": ["int", ["int"]],
		"indigoSetStereocenterGroup": ["int", ["int", "int"]],
		"indigoChangeStereocenterType": ["int", ["int", "int"]],
		"indigoValidateChirality": ["int", ["int"]],
		"indigoSingleAllowedRGroup": ["int", ["int"]],
		"indigoAddStereocenter": ["int", ["int", "int", "int", "int", "int", "int"]],
		"indigoIterateRGroupFragments": ["int", ["int"]],
		"indigoCountAttachmentPoints": ["int", ["int"]],
		"indigoIterateAttachmentPoints": ["int", ["int", "int"]],
		"indigoSymbol": ["string", ["int"]],
		"indigoDegree": ["int", ["int"]],
		"indigoGetCharge": ["int", ["int", int_ptr]],
		"indigoGetExplicitValence": ["int", ["int", int_ptr]],
		"indigoSetExplicitValence": ["int", ["int", "int"]],
		"indigoGetRadicalElectrons": ["int", ["int", int_ptr]],
		"indigoGetRadical": ["int", ["int", int_ptr]],
		"indigoSetRadical": ["int", ["int", "int"]],
		"indigoAtomicNumber": ["int", ["int"]],
		"indigoIsotope": ["int", ["int"]],
		"indigoValence": ["int", ["int"]],
		"indigoCountHydrogens": ["int", ["int", int_ptr]],
		"indigoCountImplicitHydrogens": ["int", ["int"]],
		"indigoXYZ": [xyz_ptr, ["int"]],
		"indigoSetXYZ": ["int", ["int", "float", "float", "float"]],
		"indigoCountSuperatoms": ["int", ["int"]],
		"indigoCountDataSGroups": ["int", ["int"]],
		"indigoCountRepeatingUnits": ["int", ["int"]],
		"indigoCountMultipleGroups": ["int", ["int"]],
		"indigoCountGenericSGroups": ["int", ["int"]],
		"indigoIterateDataSGroups": ["int", ["int"]],
		"indigoIterateSuperatoms": ["int", ["int"]],
		"indigoIterateGenericSGroups": ["int", ["int"]],
		"indigoIterateRepeatingUnits": ["int", ["int"]],
		"indigoIterateMultipleGroups": ["int", ["int"]],
		"indigoGetSuperatom": ["int", ["int", "int"]],
		"indigoGetDataSGroup": ["int", ["int", "int"]],
		"indigoGetGenericSGroup": ["int", ["int", "int"]],
		"indigoGetMultipleGroup": ["int", ["int", "int"]],
		"indigoGetRepeatingUnit": ["int", ["int", "int"]],
		"indigoDescription": ["string", ["int"]],
		"indigoData": ["string", ["int"]],
		"indigoAddDataSGroup": ["int", ["int", "int", IntArray, "int", IntArray, "string", "string"]],
		"indigoAddSuperatom": ["int", ["int", "int", IntArray, "string"]],
		"indigoSetDataSGroupXY": ["int", ["int", "float", "float", "string"]],
		"indigoSetSGroupData": ["int", ["int", "string"]],
		"indigoSetSGroupCoords": ["int", ["int", "float", "float"]],
		"indigoSetSGroupDescription": ["int", ["int", "string"]],
		"indigoSetSGroupFieldName": ["int", ["int", "string"]],
		"indigoSetSGroupQueryCode": ["int", ["int", "string"]],
		"indigoSetSGroupQueryOper": ["int", ["int", "string"]],
		"indigoSetSGroupDisplay": ["int", ["int", "string"]],
		"indigoSetSGroupLocation": ["int", ["int", "string"]],
		"indigoSetSGroupTag": ["int", ["int", "string"]],
		"indigoSetSGroupTagAlign": ["int", ["int", "string"]],
		"indigoSetSGroupDataType": ["int", ["int", "string"]],
		"indigoSetSGroupXCoord": ["int", ["int", "float"]],
		"indigoSetSGroupYCoord": ["int", ["int", "float"]],
		"indigoCreateSGroup": ["int", ["string", "int", "string"]],
		"indigoSetSGroupClass": ["int", ["int", "string"]],
		"indigoSetSGroupName": ["int", ["int", "string"]],
		"indigoGetSGroupClass": ["string", ["int"]],
		"indigoGetSGroupName": ["string", ["int"]],
		"indigoGetSGroupNumCrossBonds": ["int", ["int"]],
		"indigoAddSGroupAttachmentPoint": ["int", ["int", "int", "int", "string"]],
		"indigoDeleteSGroupAttachmentPoint": ["int", ["int", "int"]],
		"indigoGetSGroupDisplayOption": ["int", ["int"]],
		"indigoSetSGroupDisplayOption": ["int", ["int", "int"]],
		"indigoGetSGroupMultiplier": ["int", ["int"]],
		"indigoSetSGroupMultiplier": ["int", ["int", "int"]],
		"indigoSetSGroupBrackets": ["int", ["int", "int", "float", "float", "float", "float", "float", "float", "float", "float"]],
		"indigoFindSGroups": ["int", ["int", "string", "string"]],
		"indigoGetSGroupType": ["int", ["int"]],
		"indigoGetSGroupIndex": ["int", ["int"]],
		"indigoTransformSCSRtoCTAB": ["int", ["int"]],
		"indigoTransformCTABtoSCSR": ["int", ["int", "int"]],
		"indigoResetCharge": ["int", ["int"]],
		"indigoResetExplicitValence": ["int", ["int"]],
		"indigoResetRadical": ["int", ["int"]],
		"indigoResetIsotope": ["int", ["int"]],
		"indigoSetAttachmentPoint": ["int", ["int", "int"]],
		"indigoClearAttachmentPoints": ["int", ["int"]],
		"indigoRemoveConstraints": ["int", ["int", "string"]],
		"indigoAddConstraint": ["int", ["int", "string", "string"]],
		"indigoAddConstraintNot": ["int", ["int", "string", "string"]],
		"indigoAddConstraintOr": ["int", ["int", "string", "string"]],
		"indigoResetStereo": ["int", ["int"]],
		"indigoInvertStereo": ["int", ["int"]],
		"indigoCountAtoms": ["int", ["int"]],
		"indigoCountBonds": ["int", ["int"]],
		"indigoCountPseudoatoms": ["int", ["int"]],
		"indigoCountRSites": ["int", ["int"]],
		"indigoIterateBonds": ["int", ["int"]],
		"indigoBondOrder": ["int", ["int"]],
		"indigoBondStereo": ["int", ["int"]],
		"indigoTopology": ["int", ["int"]],
		"indigoIterateNeighbors": ["int", ["int"]],
		"indigoBond": ["int", ["int"]],
		"indigoGetAtom": ["int", ["int", "int"]],
		"indigoGetBond": ["int", ["int", "int"]],
		"indigoSource": ["int", ["int"]],
		"indigoDestination": ["int", ["int"]],
		"indigoClearCisTrans": ["int", ["int"]],
		"indigoClearStereocenters": ["int", ["int"]],
		"indigoCountStereocenters": ["int", ["int"]],
		"indigoClearAlleneCenters": ["int", ["int"]],
		"indigoCountAlleneCenters": ["int", ["int"]],
		"indigoResetSymmetricCisTrans": ["int", ["int"]],
		"indigoResetSymmetricStereocenters": ["int", ["int"]],
		"indigoMarkEitherCisTrans": ["int", ["int"]],
		"indigoMarkStereobonds": ["int", ["int"]],
		"indigoAddAtom": ["int", ["int", "string"]],
		"indigoResetAtom": ["int", ["int", "string"]],
		"indigoAddRSite": ["int", ["int", "string"]],
		"indigoSetRSite": ["int", ["int", "string"]],
		"indigoSetCharge": ["int", ["int", "int"]],
		"indigoSetIsotope": ["int", ["int", "int"]],
		"indigoSetImplicitHCount": ["int", ["int", "int"]],
		"indigoAddBond": ["int", ["int", "int", "int"]],
		"indigoSetBondOrder": ["int", ["int", "int"]],
		"indigoMerge": ["int", ["int", "int"]],
		"indigoHighlight": ["int", ["int"]],
		"indigoUnhighlight": ["int", ["int"]],
		"indigoIsHighlighted": ["int", ["int"]],
		"indigoCountComponents": ["int", ["int"]],
		"indigoComponentIndex": ["int", ["int"]],
		"indigoIterateComponents": ["int", ["int"]],
		"indigoComponent": ["int", ["int", "int"]],
		"indigoCountSSSR": ["int", ["int"]],
		"indigoIterateSSSR": ["int", ["int"]],
		"indigoIterateSubtrees": ["int", ["int", "int", "int"]],
		"indigoIterateRings": ["int", ["int", "int", "int"]],
		"indigoIterateEdgeSubmolecules": ["int", ["int", "int", "int"]],
		"indigoCountHeavyAtoms": ["int", ["int"]],
		"indigoGrossFormula": ["int", ["int"]],
		"indigoMolecularWeight": ["float", ["int"]],
		"indigoMostAbundantMass": ["float", ["int"]],
		"indigoMonoisotopicMass": ["float", ["int"]],
		"indigoCanonicalSmiles": ["string", ["int"]],
		"indigoLayeredCode": ["string", ["int"]],
		"indigoSymmetryClasses": [int_ptr, ["int", int_ptr]],
		"indigoHasCoord": ["int", ["int"]],
		"indigoHasZCoord": ["int", ["int"]],
		"indigoIsChiral": ["int", ["int"]],
		"indigoCreateSubmolecule": ["int", ["int", "int", IntArray]],
		"indigoCreateEdgeSubmolecule": ["int", ["int", "int", IntArray, "int", IntArray]],
		"indigoGetSubmolecule": ["int", ["int", "int", IntArray]],
		"indigoRemoveAtoms": ["int", ["int", "int", IntArray]],
		"indigoRemoveBonds": ["int", ["int", "int", IntArray]],
		"indigoAlignAtoms": ["float", ["int", "int", IntArray, FloatArray]],
		"indigoAromatize": ["int", ["int"]],
		"indigoDearomatize": ["int", ["int"]],
		"indigoFoldHydrogens": ["int", ["int"]],
		"indigoUnfoldHydrogens": ["int", ["int"]],
		"indigoLayout": ["int", ["int"]],
		"indigoSmiles": ["string", ["int"]], 
		"indigoName": ["string", ["int"]], 
		"indigoSetName": ["int", ["int", "string"]],
		"indigoSerialize": ["int", ["int", byte_p_ptr, int_ptr]],
		"indigoHasProperty": ["int", ["int", "string"]],
		"indigoGetProperty": ["string", ["int", "string"]],
		"indigoSetProperty": ["int", ["int", "string", "string"]],
		"indigoRemoveProperty": ["int", ["int", "string"]],
		"indigoIterateProperties": ["int", ["int"]],
		"indigoClearProperties": ["int", ["int"]],
		"indigoCheckBadValence": ["string", ["int"]], 
		"indigoCheckAmbiguousH": ["string", ["int"]],         
		"indigoFingerprint": ["int", ["int", "string"]],
		"indigoCountBits": ["int", ["int"]],
		"indigoRawData": ["string", ["int"]], 
		"indigoTell": ["int", ["int"]],
		"indigoSdfAppend": ["int", ["int", "int"]],
		"indigoSmilesAppend": ["int", ["int", "int"]],
		"indigoRdfHeader": ["int", ["int"]],
		"indigoRdfAppend": ["int", ["int", "int"]],
		"indigoCmlHeader": ["int", ["int"]],
		"indigoCmlAppend": ["int", ["int", "int"]],
		"indigoCmlFooter": ["int", ["int"]],
		"indigoAppend": ["int", ["int", "int"]],
		"indigoArrayAdd": ["int", ["int", "int"]],
		"indigoAt": ["int", ["int", "int"]],
		"indigoCount": ["int", ["int"]],
		"indigoClear": ["int", ["int"]],
		"indigoIterateArray": ["int", ["int"]],
		"indigoIgnoreAtom": ["int", ["int", "int"]],
		"indigoUnignoreAtom": ["int", ["int", "int"]],
		"indigoUnignoreAllAtoms": ["int", ["int"]],
		"indigoMatch": ["int", ["int", "int"]],
		"indigoCountMatches": ["int", ["int", "int"]],
		"indigoCountMatchesWithLimit": ["int", ["int", "int", "int"]],
		"indigoIterateMatches": ["int", ["int", "int"]],
		"indigoHighlightedTarget": ["int", ["int"]],
		"indigoMapAtom": ["int", ["int", "int"]],
		"indigoMapBond": ["int", ["int", "int"]],
		"indigoMapMolecule": ["int", ["int", "int"]],
		"indigoAllScaffolds": ["int", ["int"]],
		"indigoDecomposedMoleculeScaffold": ["int", ["int"]],
		"indigoIterateDecomposedMolecules": ["int", ["int"]],
		"indigoDecomposedMoleculeHighlighted": ["int", ["int"]],
		"indigoDecomposedMoleculeWithRGroups": ["int", ["int"]],
		"indigoDecomposeMolecule": ["int", ["int", "int"]],
		"indigoIterateDecompositions": ["int", ["int"]],
		"indigoAddDecomposition": ["int", ["int", "int"]],
		"indigoToString": ["string", ["int"]],
		"indigoToBuffer": ["int", ["int", byte_p_ptr, int_ptr]],
		"indigoStereocenterPyramid": [int_ptr, ["int"]],
		"indigoExpandAbbreviations": ["int", ["int"]],
		"indigoDbgInternalType": ["string", ["int"]],
		"indigoOneBitsList": ["string", ["int"]],
		"indigoLoadMoleculeFromString": ["int", ["string"]],
		"indigoLoadMoleculeFromFile": ["int", ["string"]],
		"indigoLoadQueryMoleculeFromString": ["int", ["string"]],
		"indigoLoadQueryMoleculeFromFile": ["int", ["string"]],
		"indigoLoadSmartsFromString": ["int", ["string"]],
		"indigoLoadSmartsFromFile": ["int", ["string"]],
		"indigoLoadReactionFromString": ["int", ["string"]],
		"indigoLoadReactionFromFile": ["int", ["string"]],
		"indigoLoadQueryReactionFromString": ["int", ["string"]],
		"indigoLoadQueryReactionFromFile": ["int", ["string"]],
		"indigoLoadReactionSmartsFromString": ["int", ["string"]],
		"indigoLoadReactionSmartsFromFile": ["int", ["string"]],
		"indigoCreateReaction": ["int", []],
		"indigoCreateQueryReaction": ["int", []], 
		"indigoExactMatch": ["int", ["int", "int", "string"]],
		"indigoSetTautomerRule": ["int", ["int", "string", "string"]],
		"indigoRemoveTautomerRule": ["int", ["int"]], 
		"indigoClearTautomerRules": ["int", []], 
		"indigoUnserialize": ["int", [byte_ptr, "int"]],
		"indigoCommonBits": ["int", ["int", "int"]], 
		"indigoSimilarity": ["float", ["int", "int", "string"]], 
		"indigoIterateSDFile": ["int", ["string"]],
		"indigoIterateRDFile": ["int", ["string"]],
		"indigoIterateSmilesFile": ["int", ["string"]],
		"indigoIterateCMLFile": ["int", ["string"]],
		"indigoIterateCDXFile": ["int", ["string"]], 
		"indigoCreateFileSaver": ["int", ["string", "string"]],
		"indigoCreateSaver": ["int", ["int", "string"]],
		"indigoCreateArray": ["int", []], 
		"indigoSubstructureMatcher": ["int", ["int", "string"]], 
		"indigoExtractCommonScaffold": ["int", ["int", "string"]], 
		"indigoDecomposeMolecules": ["int", ["int", "int"]], 
		"indigoCreateDecomposer": ["int", ["int"]], 
		"indigoReactionProductEnumerate": ["int", ["int", "int"]], 
		"indigoTransform": ["int", ["int", "int"]],
		"indigoLoadBuffer": ["int", [ByteArray, "int"]],
		"indigoLoadString": ["int", ["string"]],
		"indigoIterateSDF": ["int", ["int"]], 
		"indigoIterateSmiles": ["int", ["int"]],
		"indigoIterateCML": ["int", ["int"]],
		"indigoIterateCDX": ["int", ["int"]],
		"indigoIterateRDF": ["int", ["int"]], 
		"indigoWriteFile": ["int", ["string"]],
		"indigoIterateTautomers": ["int", ["int", "string"]] 
	},
	api_render: {
		"indigoRender": ["int", ["int", "int"]],
		"indigoRenderToFile": ["int", ["int", "string"]],
		"indigoRenderGrid": ["int", ["int", IntArray, "int", "int"]],
		"indigoRenderGridToFile": ["int", ["int", IntArray, "int", "string"]],
		"indigoRenderReset": ["int", []]
	},
	api_inchi: {
		"indigoInchiVersion": ["string", []],
		"indigoInchiResetOptions": ["int", []], 
		"indigoInchiLoadMolecule": ["int", ["string"]],
		"indigoInchiGetInchi": ["string", ["int"]],
		"indigoInchiGetInchiKey": ["string", ["string"]],
		"indigoInchiGetWarning": ["string", []],
		"indigoInchiGetLog": ["string", []],
		"indigoInchiGetAuxInfo": [" string", []]
	},
	api_bingo: {
		"bingoVersion": ["string", []], // options = "id: <property-name>"
		"bingoCreateDatabaseFile": ["int", ["string", "string", "string"]],
		"bingoLoadDatabaseFile": ["int", ["string", "string"]],
		"bingoCloseDatabase": ["int", ["int"]],
		// Record insertion/deletion
		"bingoInsertRecordObj": ["int", ["int", "int"]],
		"bingoInsertRecordObjWithId": ["int", ["int", "int", "int"]],
		"bingoDeleteRecord": ["int", ["int", "int"]],
		"bingoGetRecordObj": ["int", ["int", "int"]],
		"bingoOptimize": ["int", ["int"]],
		// Search methods that returns search object
		// Search object is an iterator
		"bingoSearchSub": ["int", ["int", "int", "string"]],
		"bingoSearchExact": ["int", ["int", "int", "string"]],
		"bingoSearchMolFormula": ["int", ["int", "string", "string"]],
		"bingoSearchSim": ["int", ["int", "int", "float", "float", "string"]],
		// Search object methods
		"bingoNext": ["int", ["int"]],
		"bingoGetCurrentId": ["int", ["int"]],
		"bingoGetCurrentSimilarityValue": ["float", ["int"]],
		// Estimation methods
		"bingoEstimateRemainingResultsCount": ["int", ["int"]],
		"bingoEstimateRemainingResultsCountError": ["int", ["int"]],
		"bingoEstimateRemainingTime": ["int", ["int", float_ptr]],
		// This method return IndigoObject that represents current object.
		// After calling bingoNext this object automatically points to the next found result
		"bingoGetObject": ["int", ["int"]],
		"bingoEndSearch": ["int", ["int"]]
	},
	out: {
		"abyte": ref.alloc('byte'),
		"achar": ref.alloc('char'),
		"aint": ref.alloc('int'),
		"afloat": ref.alloc('float'),
		"adouble": ref.alloc('double'),
		"abool": ref.alloc('bool'),
		"awchar": ref.alloc(wchar),
		"apbyte": ref.alloc(byte_ptr),
		"read": ref.readPointer,
		"alloc": ref.alloc
	},
	type: {
		"wchar": wchar,
		"qword":qword,
		"xyz": xyz,
		"byte_ptr": byte_ptr,
		"int_ptr": int_ptr
	}
};