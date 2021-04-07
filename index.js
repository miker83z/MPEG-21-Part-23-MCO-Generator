const rdf = require('rdflib');
const lut = require('./lookup-tables').AllClasses;
const generators = require('./generators/');

const generator = (classData, payload) => {
  switch (classData[1]) {
    case 'Action':
      return generators.generateAction(classData[0], payload);
    case 'Contract':
      return generators.generateContract(classData[0], payload);
    case 'Fact':
      return generators.generateFact(classData[0], payload);
    case 'Interval':
      return generators.generateInterval(classData[0], payload);
    case 'IPEntity':
      return generators.generateIPEntity(classData[0], payload);
    case 'MCODeonticExpression':
      return generators.generateMCODeonticExpression(
        classData[0],
        payload,
        payload.type
      );
    case 'Party':
      return generators.generateParty(classData[0], payload);
    case 'Service':
      return generators.generateService(classData[0], payload);
    case 'TextClause':
      return generators.generateTextClause(classData[0], payload);
    case 'Timeline':
      return generators.generateTimeline(classData[0], payload);
    case 'Track':
      return generators.generateTrack(classData[0], payload);
    default:
      throw new Error('Generator Error: ', classData[0]);
  }
};

const jsonld2turtle = (jsonldString, store, uri) => {
  return new Promise((resolve) => {
    rdf.parse(jsonldString, store, uri, 'application/ld+json', (e) => {
      if (e) {
        console.log('Parse Error! ');
        return resolve(e);
      }
      rdf.serialize(null, store, uri, 'text/turtle', (e, s) => {
        if (e) {
          console.log('Serialize Error! ');
          return resolve(e);
        }
        return resolve(s);
      });
    });
  });
};

const getMCOFromContract = async (mediaContractualObjects, contextObj) => {
  const jsonLD = { '@context': contextObj, '@graph': [] };

  // Search for all objects
  Object.keys(mediaContractualObjects).forEach((id) => {
    const object = mediaContractualObjects[id];
    jsonLD['@graph'].push(generator(lut[object.class], object));
  });

  const store = rdf.graph();

  const ttl = await jsonld2turtle(
    JSON.stringify(jsonLD),
    store,
    'http://mpeg.org/'
  );

  return ttl;
};

module.exports = { getMCOFromContract };
