#!/usr/bin/env node
'use strict';

var crypto = require('crypto');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);

/**
 * TURN Credentials
 * @typedef {Object} TurnCredentials
 * @property {string} username
 * @property {string} password
 */

/**
 * TURN Credentials Options
 * @typedef {Object} TurnCredentialsOptions
 * @property {string} secret
 * @property {number} [duration=24*3600]
 * @property {string} [algorithm=sha1]
 * @property {string} [encoding=base64]
 */

/**
 * Algorithm
 * @const {string}
 */
const ALGORITHM = 'sha1';

/**
 * Encoding used
 * @const {string}
 */
const ENCODING = 'base64';

/**
 * Duration by default
 * @const {number}
 */
const DURATION = 3600;

/**
 * Secret minimum length
 * @const {number}
 */
const SECRET_MIN_LENGTH = 16;

/**
 * Separator
 * @const {string}
 */
const SEPARATOR = ':';

/**
 * Creates TURN credentials for userName
 * @param {string} userName
 * @param {TurnCredentialsOptions} [options]
 * @returns {TurnCredentials}
 */
function createTurnCredentials(userName, { secret, algorithm = ALGORITHM, duration = DURATION, encoding = ENCODING }) {
  if (!userName) {
    throw new Error('Invalid TURN userName')
  }
  if (!secret || secret.length < SECRET_MIN_LENGTH) {
    throw new Error('Invalid TURN secret')
  }
  const timeStamp = Math.floor(Date.now() / 1000) + duration;
  const hmac = crypto__default['default'].createHmac(algorithm, secret);
  const username = `${timeStamp}${SEPARATOR}${userName}`;
  const credential = hmac.update(username).digest(encoding);
  return {
    username,
    credential
  }
}

const credentials = createTurnCredentials(process.argv[2], {
  secret: process.argv[3] || process.env.TURN_SECRET
});
console.log(JSON.stringify(credentials, null, 2));
