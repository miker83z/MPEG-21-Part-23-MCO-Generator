const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/MCODeonticExpression');

const modelObj = {
  identifier: 'string',
  textClauses: 'arrayRef',
  metadata: 'map',
  issuedIn: 'ref',
  act: 'ref',
  actedBySubject: 'ref',
  actObjects: 'arrayRef',
  resultantObject: 'arrayRef',
  constraints: 'arrayRef',
  issuer: 'ref',
  percentage: 'number',
  incomePercentage: 'number',
  isExclusive: 'boolean',
  hasSublicenseRight: 'boolean',
  extra: 'map',
};

const generateMCODeonticExpression = (classData, payload, actionType) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (k === 'act') {
      let lutTemp;
      switch (actionType) {
        case 'Prohibition':
          lutTemp = 'mco-core:forbidsaction';
          break;
        case 'MCOPermission':
          lutTemp = 'mco-core:permitsaction';
          break;
        case 'Obligation':
          lutTemp = 'mco-core:obligatesaction';
          break;
        default:
          break;
      }
      addElement(modelObj, obj, lutTemp, payload[k], k);
    } else if (lut[k] !== undefined)
      addElement(modelObj, obj, lut[k], payload[k], k);
    else if (k === 'extra') addElement(modelObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateMCODeonticExpression };
