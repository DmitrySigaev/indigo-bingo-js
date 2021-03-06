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

var path = require('path');
var local = path.join.bind(path, __dirname);

module.exports = {
	//platform
	win32: {
		flag: {
			'x64': '--preset=win64-2013', //architecture
			'x32': '--preset=win32-2013'
		},
		copy: {
			src: local('Indigo/api/libs/shared'),
			dest: local('shared')

		},
		libs:{
			'indigo':'indigo',
			'bingo':'bingo',
			'indigo-inchi':'indigo-inchi',
			'indigo-renderer':'indigo-renderer'
		}
	},
	linux:{
		flag: {
			'x64': '--preset=linux64', //architecture
			'x32': '--preset=linux32'
		},
		copy: {
			src: local('Indigo/api/libs/shared'),
			dest: local('shared')
		},
		libs:{
			'indigo':'libindigo',
			'bingo':'libbingo',
			'indigo-inchi':'libindigo-inchi',
			'indigo-renderer':'libindigo-renderer'
		}
	}
};
