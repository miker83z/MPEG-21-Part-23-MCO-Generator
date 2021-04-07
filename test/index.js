const { getMCOFromContract } = require('..');
const mediaContractualObjects = require('./example');
const context = require('./context');

const main = async () =>
  console.log(await getMCOFromContract(mediaContractualObjects, context));

main();
