"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVarsToTypesStr = exports.getArgsToVarsStr = exports.getFieldArgsDict = exports.moduleConsole = void 0;

var _constants = require("./constants");

/* DOCUMENT INFORMATION
	- Author:   Dominik Maszczyk
	- Email:    Skitionek@gmail.com
	- Created:  2019-06-06
*/

/* istanbul ignore next */
const moduleConsole = {
  log: (...args) => console.log(`[${_constants.MODULE_NAME} log]:`, ...args),
  warn: (...args) => console.log(`[${_constants.MODULE_NAME} warning]:`, ...args),
  error: (...args) => console.log(`[${_constants.MODULE_NAME} error]:`, ...args)
};
/**
 * Compile arguments dictionary for a field
 * @param field current field object
 * @param duplicateArgCounts map for deduping argument name collisions
 * @param allArgsDict dictionary of all arguments
 * @param path to current field
 */

exports.moduleConsole = moduleConsole;

const getFieldArgsDict = (field, duplicateArgCounts, allArgsDict = {}, path) => field.args.reduce((o, arg) => {
  const arg_name = `${path.join('_')}_${field.name}_${arg.name}`;
  /* istanbul ignore next */

  if (arg_name in duplicateArgCounts) {
    moduleConsole.warn(`
			I cannot find the case for these duplicates anymore,
			please let me know if you are seeing this message.
			`);
    const index = duplicateArgCounts[arg_name] + 1;
    duplicateArgCounts[arg_name] = index;
    o[`${arg_name}${index}`] = arg;
  } else
    /* istanbul ignore next */
    if (allArgsDict[arg_name]) {
      moduleConsole.warn(`
			I cannot find the case for these duplicates anymore,
			please let me know if you are seeing this message.
			`);
      duplicateArgCounts[arg_name] = 1;
      o[arg_name] = arg;
    } else if (!path.length) {
      o[arg.name] = arg;
    } else {
      o[arg_name] = arg;
    }

  return o;
}, {});
/**
 * Generate variables string
 * @param dict dictionary of arguments
 */


exports.getFieldArgsDict = getFieldArgsDict;

const getArgsToVarsStr = dict => Object.entries(dict).map(([varName, arg]) => `${arg.name}: $${varName}`).join(', ');
/**
 * Generate types string
 * @param dict dictionary of arguments
 */


exports.getArgsToVarsStr = getArgsToVarsStr;

const getVarsToTypesStr = dict => Object.entries(dict).map(([varName, arg]) => `$${varName}: ${arg.type}`).join(', ');

exports.getVarsToTypesStr = getVarsToTypesStr;
//# sourceMappingURL=utils.js.map