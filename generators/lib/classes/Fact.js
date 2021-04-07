const { addElement } = require('../AddElement');
const lut = require('../../../lookup-tables/lib/classes/Action');

const modelObj = {
  identifier: 'string',
  isTrue: 'boolean',
  composedFacts: 'arrayRef',
  validity: 'string',
  withDelay: 'string',
  makesTrue: 'arrayRef',
  withIPEntity: 'ref',
  partOf: 'arrayRef',
  languages: 'array',
  maxLength: 'string',
  matchesFormatComplianceProfile: 'string',
  aspectRatio: 'string',
  audioFormat: 'string',
  format: 'string',
  maxBitrate: 'number',
  maxLines: 'number',
  minBitrate: 'number',
  minLines: 'number',
  videoFormat: 'string',
  numberOfRuns: 'number',
  numberOfRepetitions: 'number',
  servicesAndChannels: 'array',
  countries: 'array',
  afterDate: 'string',
  beforeDate: 'string',
  extra: 'map',
};

const generateFact = (classData, payload) => {
  const obj = { '@type': classData };

  Object.keys(payload).forEach((k) => {
    if (lut[k] !== undefined) addElement(modelObj, obj, lut[k], payload[k], k);
    else if (k === 'extra') addElement(modelObj, obj, undefined, payload[k], k);
  });

  return obj;
};

module.exports = { generateFact };
