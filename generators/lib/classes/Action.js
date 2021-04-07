const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/Action');

const modelObj = {
  identifier: 'string',
  impliesAlso: 'arrayRef',
  resultsIn: 'arrayRef',
  rightGivenBy: 'arrayRef',
  actedBy: 'ref',
  actedOver: 'arrayRef',
  sellsDeontic: 'ref',
  isOnLoan: 'boolean',
  recipients: 'arrayRef',
  beneficiaries: 'arrayRef',
  incomeSources: 'arrayRef',
  amount: 'number',
  currency: 'string',
  incomePercentage: 'number',
  isAbout: 'arrayRef',
  extra: 'map',
};

const generateAction = (classData, payload) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (lut[k] !== undefined) addElement(modelObj, obj, lut[k], payload[k], k);
    else if (k === 'extra') addElement(modelObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateAction };
