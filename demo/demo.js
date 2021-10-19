/* eslint-disable @typescript-eslint/no-var-requires */
const data = require( "./demo.json" );
const { sort } = require( "../index" );
const fs = require( "fs" );

const sortString = `
    by word of a greater than b's
`;

const { wordsStats } = data;
const sorted = sort( wordsStats , sortString );

fs.writeFile( "./assets/test.json" , JSON.stringify( { words : sorted } ) , ( err , data ) => {
    if( err ){
        console.error( err );
    }
} );
console.log( sorted );
