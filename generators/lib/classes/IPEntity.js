const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/IPEntity');

const modelObj = {
  identifier: 'string',
  metadata: 'map',
  socialTag: 'string',
  isDigital: 'boolean',
  rightsOwners: 'arrayRef',
  isMadeUpOf: 'arrayRef',
  resultedFrom: 'arrayRef',
  isAudio: 'boolean',
  segments: 'arrayRef',
  tracks: 'arrayRef',
  interval: 'arrayRef',
  segmentOf: 'ref',
  contains: 'arrayRef',
  onTrack: 'arrayRef',
  extra: 'map',
};

const generateIPEntity = (classData, payload) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (lut[k] !== undefined) addElement(modelObj, obj, lut[k], payload[k], k);
    else if (k === 'extra') addElement(modelObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateIPEntity };
