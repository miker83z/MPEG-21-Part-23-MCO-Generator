const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/Contract');

const contractObj = {
  identifier: 'string',
  metadata: 'map',
  parties: 'arrayRef',
  governingLaw: 'string',
  court: 'string',
  isCourtJurisdictionExclusive: 'boolean',
  textVersion: 'string',
  encryptedTextVersion: 'string',
  signatories: 'arrayRef',
  contractRelations: 'mapRef',
  extra: 'map',
};

const generateContract = (classData, payload) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (lut[k] !== undefined)
      addElement(contractObj, obj, lut[k], payload[k], k);
    else if (k === 'contractRelations') {
      Object.keys(payload[k]).forEach((rk) => {
        payload[k][lut[rk]] = payload[k][rk];
        delete payload[k][rk];
      });
      addElement(contractObj, obj, undefined, payload[k], k);
    } else if (k === 'extra')
      addElement(contractObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateContract };
