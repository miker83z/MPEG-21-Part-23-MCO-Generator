const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/TextClause');

const modelObj = {
  identifier: 'string',
  text: 'string',
  extra: 'map',
};

const generateTextClause = (classData, payload) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (lut[k] !== undefined) addElement(modelObj, obj, lut[k], payload[k], k);
    else if (k === 'extra') addElement(modelObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateTextClause };
