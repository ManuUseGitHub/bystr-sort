# ByStr~Sort [![Build Status](https://app.travis-ci.com/ManuUseGitHub/sorter.svg?branch=master)](https://app.travis-ci.com/ManuUseGitHub/sorter) [![npm version](https://badge.fury.io/js/bystr-sort.svg)](https://badge.fury.io/js/bystr-sort)

## Getting started 🚀
Find the whole procedure on [NPM - bystr-sort](https://www.npmjs.com/package/bystr-sort)

## Demo

This repository is shiped with a demo. You can access it via the repo directory.
`demo.js` : the executable file;`demo.json`: the data for both tests and demo.

## Pushing further
In order to make changes to the core mechanism, you can edit the `typescript` file within `dev` directory. to auto compile it, run 
```cmd
$ npm run watchIndex
```
---
## Release notes
* ^1.1.0 
  ascii diacritics fix. Now diacritics from the ascii table will not interfer with the sorting order when you compare strings.
  
  ⚠️ : It doesn't include unicode diacritics
