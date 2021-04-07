const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/Track');

const modelObj = {
  identifier: 'string',
  extra: 'map',
};

const generateTimeline = (classData, payload) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (lut[k] !== undefined) addElement(modelObj, obj, lut[k], payload[k], k);
    else if (k === 'extra') addElement(modelObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateTimeline };
