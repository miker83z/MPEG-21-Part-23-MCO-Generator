const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/Party');

const modelObj = {
  identifier: 'string',
  metadata: 'map',
  name: 'string',
  details: 'map',
  address: 'string',
  deonticsIssued: 'arrayRef',
  actionsIsSubject: 'arrayRef',
  signature: 'string',
  socialTag: 'string',
  actOnBehalfOf: 'arrayRef',
  belongsToCollective: 'arrayRef',
  isRightsOwnerOf: 'arrayRef',
  signatory: 'ref',
  extra: 'map',
};

const generateParty = (classData, payload) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (lut[k] !== undefined) addElement(modelObj, obj, lut[k], payload[k], k);
    else if (k === 'extra') addElement(modelObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateParty };
