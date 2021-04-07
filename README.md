# MCO Generator from Smart Contracts for Media

This software generates MCO contracts represented in TURTLE from Media Contractual Objects. This software is composed of a series of JSON files composing the Look Up Table (`./lookup-tables`) and a set of generators for the generation of JSON-LD objects (`./generators`). The generation process starts in the `./index.js` file: a JSON file representing the Media Contractual Objects is transformed into the JSON-LD format and then Elements in it are used to generate the Turtle file representing the MCO contract.

## Installation

NodeJS is needed to execute the generator, as well as NPM.
To use the generator it is needed to execute the following command in the main directory:

```
npm install
```

## Usage

Importing this module will provide with a method `getMCOFromContract` that takes in input an object containing Media Contractual Objects and returns the related string in Turtle form.

## Test

To test the generator execute the following command in the main directory:

```
node test/index.js
```
