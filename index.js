const lut = require('./lookup-tables').AllClasses;
const generators = require('./generators/');

const generator = (classData, payload, mediaContractualObjects) => {
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
      const refAct = mediaContractualObjects[payload.act];
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

const getMCOFromContract = (mediaContractualObjects) => {
  const jsonLDGraph = {};

  // Search for all objects
  Object.keys(mediaContractualObjects).forEach((id) => {
    const object = mediaContractualObjects[id];
    console.log(generator(lut[object.class], object, mediaContractualObjects));
  });

  return jsonLDGraph;
};

module.exports = { getMCOFromContract };
