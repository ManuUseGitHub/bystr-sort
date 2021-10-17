const data = require( "./demo.json" );
const { sort } = require( "bystr-sort" );

const sortString = `
    by order of a greater than b's
`;

const { wordsStats } = data;
const sorted = sort( wordsStats , sortString );

console.log( sorted );
