const data = require( "./demo.json" );
const { sort } = require( "../index" );

const sortString = `
    by order of a greater than b's
`;

const someData = data.wordsStats;
sort( someData , sortString );

console.log( someData );