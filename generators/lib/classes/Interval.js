const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/Track');

const modelObj = {
  identifier: 'string',
  start: 'string',
  end: 'string',
  duration: 'string',
  onTimeline: 'string',
  extra: 'map',
};

const generateInterval = (classData, payload) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (lut[k] !== undefined) addElement(modelObj, obj, lut[k], payload[k], k);
    else if (k === 'extra') addElement(modelObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateInterval };
