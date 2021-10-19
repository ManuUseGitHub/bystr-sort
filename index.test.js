/* eslint-disable @typescript-eslint/no-var-requires */
const { sort , computeSortList } = require( "./bystr-sort/index" );
const data = require( "./demo/demo.json" );

test( "sorts data with no sortstring gives no difference" , () => {

    const sorted = sort( data.wordsStats , "" );
    expect( data.wordsStats ).toBe( sorted );
} );

describe( "sortString compution" , () => {
    it( "gives a list of 1 because then is missing from the first line" , () => {

        // the sortList Will be interupted after the first line
        const sortString = `
        by length of a greater than b's
        by order of a greater than b's then
        by word of a greater than b's
    `;
        const criterias = [ "length" , "order" , "word" , "number" ];
        
        const sortList = computeSortList( sortString , criterias );
        expect( sortList.length ).toBe( 1 );
    } );

    it( "gives no sortList on bad sortString or no criterias " , () => {

        // the sortList Will be interupted after the first line
        const sortString = `
            by unexistant of a > than b's
        `;
        
        const sortList = computeSortList( sortString , [ "existant" ] );
        const sortList2 = computeSortList( " by " , [] );
        expect( sortList.length === sortList2.length ).toBe( true );
    } );
} );

describe( "sorting with successful sortString" , () => {
    it( "sorts data from a's order greater than b's" , () => {

        const sortString = `
    by order of a greater than b's
    `;
        const sorted = sort( data.wordsStats , sortString );
        
        expect( sorted[ 0 ].order ).toBe( 412 );
    } );

    

    it( "sorts data by order then by word" , () => {

        const sortString = `
    by order of a greater than b's then
    by word of a greater than b's
    `;
        const sorted = sort( data.wordsStats , sortString );
        
        expect( sorted[ 0 ].word ).toBe( "zones" );
    } );

    it( "sorts data without being disorded by diacritics" , () => {

        const sortString = `
    by word of a greater than b's
    `;
        const sorted = sort( data.wordsStats , sortString );
        
        expect( sorted[ 0 ].word[ 0 ].charCodeAt( 0 ) <= 122 ).toBe( true );
    } );
} );
describe( "sortstring errors" , () => {
    it( "sorts data from unknown key displays sortstring error message" , () => {

        const sortString = `
        by unknown of a greater than b's then
        `;
        console.error = jest.fn();
        sort( data.wordsStats , sortString , false , console.error );

        expect( console.error ).toHaveBeenCalledWith( expect.stringMatching( /SORTSTRING_MATCH_ERROR/ ) );

    } );

    it( "sorts data from unknown key and true parameter crashes with error message" , () => {

        const sortString = `
        by unknown of a greater than b's then
        `;

        const t = () => {
            sort( data.wordsStats , sortString , true );
        };

        expect( t ).toThrow( expect.stringMatching( /SORTSTRING_MATCH_ERROR/ ) );
    } );

    it( "gives an adapted error message depending on criterias" , () => {

        const sortString = "by";

        const objs = [
            { data : [ { a : "" } ] , m : "" } ,
            { data : [ { b : "" , c : "" } ] , m : "" } ,
            { data : [ { d : "" , e : "" , f : "" } ] , m : "" } ,
            { data : [ { g : "" , h : "" , i : "" , j : "" } ] , m : "" } ,
            { data : [ { k : "" , l : "" , m : "" , n : "" , o : "" } ] , m : "" } ,
            { data : [ { p : "" , q : "" , r : "" , s : ""  } ] , m : "" } ,
            { data : [ { t : "" , u : "" , v : "" } ] , m : "" } ,
            { data : [ { w : "" , x : "" } ] , m : "" } ,
            { data : [ { yz : "" } ] , m : "" }
        ];
        
        let prevMessage = "";
        objs.forEach( ( item ) => {
            try{
                sort( item.data , sortString , true );
            } catch ( err ) {
                item.m = err;
                expect( prevMessage ).not.toBe( item.m );
                prevMessage = item.m;
            }
        } );
    } );

    it( "sorts data from not fully matched sortString doesn't crash at all" , () => {

        const sortString = `
        by order of a greater than b's then 
        by unknown of a greater than b's then
        `;

        sort( data.wordsStats , sortString , true );
    } );
} );
