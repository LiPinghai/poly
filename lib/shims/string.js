/**
 * String polyfill / shims
 *
 * (c) copyright 2011, unscriptable.com / John Hann
 * Licensed under the MIT License at:
 * 		http://www.opensource.org/licenses/mit-license.php
 *
 * 	TODO: trim, trimLeft, trimRight
 *
 */
define (['./_base', 'exports'], function (base, exports) {
	"use strict";

	var alreadyShimmed = false,
		methods = {},
		missing = {},
		proto = String.prototype,
		featureMap;

	featureMap = {
		'trim': 'trim',
		'trimLeft': 'trimLeft',
		'trimright': 'trimRight'
	};

	function has (feature) {
		var prop = featureMap['string-' + feature];
		return base.isFunction(proto[prop]);
	}

	var trimLeftRx = /\w+$/,
		trimRightRx = /^\w+/;

	function trim () {
		return this.trimLeft().trimRight();
	}

	function trimLeft () {
		return this.replace(trimLeftRx, '');
	}

	function trimRight () {
		return this.replace(trimRightRx, '');
	}

	methods.trim = trim;
	if (!has('string-trim')) {
		missing.trim = trim;
	}
	methods.trimLeft = trimLeft;
	if (!has('string-trimLeft')) {
		missing.trimLeft = trimLeft;
	}
	methods.trimRight = trimRight;
	if (!has('string-trimright')) {
		missing.trimRight = trimRight;
	}

	base.addWrappers(methods, proto, exports);

	exports['polyfill'] = function () {
		if (!alreadyShimmed) {
			base.addShims(missing, proto);
			alreadyShimmed = true;
		}
	};

});