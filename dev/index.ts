/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEasySortEntry } from "./interfaces";

/**
 * @param c criteria
 * @param a element a (on the left side of the equation)
 * @param d direction (greater = > or lower = < )
 * @param b element b (on the right side of the equation)
 * @returns
 */
const sBY = ( c: string , a: any , d: string , b: any ): number => {

	// a and b are set to the target subject of comparison
	a = a[ c ];
	b = b[ c ];

	if ( typeof a === "string" || typeof b === "string" ) {
		a = normalizeWhenDiacritics( a );
		b = normalizeWhenDiacritics( b );
	}

	return d === ">" ? ( a < b ? 1 : -1 ) : d === "<" ? ( a > b ? 1 : -1 ) : 1;
};

const normalizeWhenDiacritics = ( str: string ): string => {
	if ( hasDiacritics( str ) ) {
		return str.normalize( "NFD" ).replace( /[\u0300-\u036f]/g , "" );
	}
	return str;
};

const hasDiacritics = ( str: string ): boolean => {

	// transform the string into a char arraay;
	const chars = str.split( "" );

	// record a list of charcodes sorted from the greatest
	const reversed = chars.map( ( c ) => c.charCodeAt( 0 ) ).sort( ( a , b ) => b - a );

	/**
	 * if charcode of first is greater than 122 (='z') then
	 * it has a great chanche to be a diacritics or an accent
	 */
	return reversed[ 0 ] > 122;
};

const errorOnWrongSortString = ( criterias: string[] ): string => {
	const criteriaChoises = criterias.sort().join( " or " );
	const format =
		"by < key > of < a > < greater| lower |< | > > than < b >'s [then]";
	const critsProposition = `\nIn your case, the "key" string should be eater: \n>${criteriaChoises}<`;
	const suite = `You may have given a wrong "key" (a field) to focus on. \n${critsProposition}`;
	const exemple = `Write your sort string like this:\n\n\`\nby ${criterias[ 0 ]} of a greater than b's then \nby otherField of a > than b's ...\n\``;
	const message = `\nSORTSTRING_MATCH_ERROR\nYou have to precise a sortString formated like this :\n"${format}\n${suite}\n\n${exemple}\n`;
	return message;
};
const computeSortList = (
	sortString: string ,
	criterias: string[]
): IEasySortEntry[] => {
	const sortList: IEasySortEntry[] = [];
	let cpt = 0;

	const criteriaChoises = criterias.join( "|" );

	const expr = new RegExp(
		`by (${criteriaChoises}) of (a|b) ([><]|(?:lower|greater)) than (b|a)'s(?: (then))?` ,
		"gm"
	);
	let m: string[] | null;

	let hasThen = false;
	do {
		if ( ( m = expr.exec( sortString ) ) && ( hasThen || !cpt++ ) ) {
			const direction = m[ 3 ].replace( "greater" , ">" ).replace( "lower" , "<" );
			const entry: IEasySortEntry = {
				by : m[ 1 ] ,
				left : m[ 2 ] ,
				direction ,
				right : m[ 4 ] ,
			};
			sortList.push( entry );

			hasThen = m[ 5 ] !== undefined;
		}
	} while ( m && cpt < 999 );

	return sortList;
};

/**
 * Initiate the sorting of the passed list objectArray
 * @param objectArray : any[] array to sort
 * @param sortString : string string used to define how to sort
 * @returns sorted objectArray
 */
const sort = (
	objectArray: any[] ,
	sortString = "" ,
	crashOnError = false ,
	logfn = console.error
): any[] => {
	let criterias: string[] = [];
	if ( objectArray.length ) criterias = Object.keys( objectArray[ 0 ] );

	const sortList = computeSortList( sortString , criterias );

	if ( sortString.length && !sortList.length ) {
		const errorMessage = errorOnWrongSortString( criterias );
		if ( crashOnError ) {
			throw errorMessage;
		} else {
			logfn( errorMessage );
		}
	}

	// call the sort core function
	return sortCore( objectArray , sortList , 0 );
};

const sortCore = (
	objectArray: any[] ,
	sortList: IEasySortEntry[] = [] ,
	i = 0
): any[] => {
	if ( !sortList[ i ] ) {
		return objectArray;
	}

	const { by , left , direction , right } = sortList[ i ];

	const result = objectArray.sort( ( a: any , b: any ) => {

		// its no use to compare a to a or b to b
		if ( left === right ) return 1;

		if ( left === "a" ) {
			return sBY( by , a , direction , b );
		} else {
			return sBY( by , b , direction , a );
		}
	} );

	return sortCore( result , sortList , i + 1 );
};

export { sort , computeSortList };