const addElement = (modelObj, obj, key, value, origKey) => {
  if (modelObj[origKey] === undefined)
    throw new Error('Generation error, key:' + origKey);
  else {
    switch (modelObj[origKey]) {
      case 'string':
        obj[key] = value;
        break;
      case 'ref':
        obj[key] = { '@id': value };
        break;
      case 'array':
        if (obj[key] === undefined) obj[key] = [];
        if (value instanceof Array) value.forEach((v) => obj[key].push(v));
        else obj[key].push(value);
        break;
      case 'arrayRef':
        if (obj[key] === undefined) obj[key] = [];
        if (value instanceof Array)
          value.forEach((v) => obj[key].push({ '@id': v }));
        else obj[key].push({ '@id': value });
        break;
      case 'map':
        Object.keys(value).forEach((mapKey) => {
          obj[mapKey] = value[mapKey];
        });
        break;
      case 'mapRef':
        Object.keys(value).forEach((mapKey) => {
          obj[mapKey] = { '@id': value[mapKey] };
        });
        break;
      case 'boolean':
        obj[key] = value.toString();
        break;
      case 'number':
        obj[key] = value.toString();
        break;
      default:
        throw new Error('Generation error');
    }
  }
};

module.exports = { addElement };
