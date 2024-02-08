const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
      randomString = length => Array.from(Array(length)).map(randomChar).join("");

var lol = 0
const card = document.querySelector(".card"),
      letters = card.querySelector(".card-letters");

const invertval = setInterval(function(){
    letters.style.setProperty("--x", `$100px`);
    letters.style.setProperty("--y", `$100px`);
    letters.innerText = randomString(50000);  
}, 2);

function CalculateFeeAmount( amount, publisherFee ) //new function called "calculatefeeamount"
{

	if ( !g_rgWalletInfo['wallet_fee'] ) //if g_rgwalletinfo['wallet_fee'] is equal to nothing or is equal to 0 then
		return 0; //give the output of 0


	publisherFee = ( typeof publisherFee == 'undefined' ) ? 0 : publisherFee; 
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //publisher fee is equal to the following statement (if publisherfee is undefined then the value will be 0, but if it is defined then the value will not be changed)


	// Since CalculateFeeAmount has a Math.floor, we could be off a cent or two. Let's check:
	var iterations = 0; // shouldn't be needed, but included to be sure nothing unforseen causes us to get stuck
	var nEstimatedAmountOfWalletFundsReceivedByOtherParty = parseInt( ( amount - parseInt( g_rgWalletInfo['wallet_fee_base'] ) ) / ( parseFloat( g_rgWalletInfo['wallet_fee_percent'] ) + parseFloat( publisherFee ) + 1 ) ); 
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //a new variable is called and it is equal to the following equation ((amount - g_rgwalletinfo['wallet_fee_base']) / (g_rgwalletinfo['wallet_fee_percent'] + publisherfee + 1)


	var bEverUndershot = false; //beverundershot is equal to false
	var fees = CalculateAmountToSendForDesiredReceivedAmount( nEstimatedAmountOfWalletFundsReceivedByOtherParty, publisherFee ); 
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // fees is equal to a output of the function "CalculateAmountToSendForDesiredReceivedAmount"


	while ( fees.amount != amount && iterations < 10 ) // while fees.amount is not the same as amount, and iterations done in this loop is less than 10 do this:
	{


		if ( fees.amount > amount ) //if fees.amount is more than amount then
		{
			if ( bEverUndershot ) //if variable bEverUndershot is set to True or exists then
			{
				fees = CalculateAmountToSendForDesiredReceivedAmount( nEstimatedAmountOfWalletFundsReceivedByOtherParty - 1, publisherFee ); 
                // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                //fees is set to the function output of "CalculateAmountToSendForDesiredReceivedAmount"


				fees.steam_fee += ( amount - fees.amount ); //fees.steam_fee is equal to (fees.steam_fee + (amount - fees.amount))

				fees.fees += ( amount - fees.amount ); // fees.fees is equal to (fees.fees + (amount - fees.amount))

				fees.amount = amount; // fees.amount is equal to amount

				break; //end the while loop
			}
			else // if beverundershot is not existent or is equal to false then
			{

				nEstimatedAmountOfWalletFundsReceivedByOtherParty--; // nEstimatedAmountOfWalletFundsReceivedByOtherParty - 1

			}
		}
		else //if fees.amount is less than amount or equal to amount then
		{
			bEverUndershot = true; //bEverUndershot is equal to true
			nEstimatedAmountOfWalletFundsReceivedByOtherParty++; // nEstimatedAmountOfWalletFundsReceivedByOtherParty + 1
		}


		fees = CalculateAmountToSendForDesiredReceivedAmount( nEstimatedAmountOfWalletFundsReceivedByOtherParty, publisherFee ); 
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // fees is equal to the output of the function "CalculateAmountToSendForDesiredReceivedAmount"


		iterations++; // iterations + 1
	}

	// fees.amount should equal the passed in amount

	return fees; //give the output of fees
}

function CalculateAmountToSendForDesiredReceivedAmount( receivedAmount, publisherFee )
{

	if ( !g_rgWalletInfo['wallet_fee'] ) //if g_rgwalletinfo['wallet_fee'] has no value or is equal to 0
	{

		return receivedAmount; //give the output of recievedamount

	}

	publisherFee = ( typeof publisherFee == 'undefined' ) ? 0 : publisherFee; //if publisherfee is undefined it changes the value of it to 0 but if its defined then keep the current value of it

	var nSteamFee = Math.floor( Math.max( receivedAmount * g_rgWalletInfo['wallet_fee_percent'] , g_rgWalletInfo['wallet_fee_minimum'] ) + g_rgWalletInfo['wallet_fee_base'] ); 
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //nsteamfee is equal to the rounded down value of the largest number out of (recievedamount * g_rgwalletinfo['wallet_fee_percent']) and (g_rgwalletinfo['wallet_fee_minimum'] + g_rgwalletinfo['wallet_fee_base'])


	var nPublisherFee = Math.floor( publisherFee > 0 ? Math.max( receivedAmount * publisherFee, 1 ) : 0 ); 
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //npublisherfee is equal to the rounded down value of this statement: (if publisherfee is larger than 0 then output the larger number out of recievedamount * publisherfee and 1, if it is not larger then output 0)


	var nAmountToSend = receivedAmount + nSteamFee + nPublisherFee; //namounttosend is equal to the sum of recievedamount and nsteamfee and npublisherfee

	return { //give the output of the following
		steam_fee: nSteamFee, // steam_fee = nsteamfee
		publisher_fee: nPublisherFee, //publisherfee = npublisherfee
		fees: nSteamFee + nPublisherFee, //fees = nsteamfee + npublisherfee
		amount: parseInt( nAmountToSend ) //amount = namounttosend (parseint removes any letters out of the variable)
	};
}


var g_rgCurrencyData = {"USD":{"strCode":"USD","eCurrencyCode":1,"strSymbol":"$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"GBP":{"strCode":"GBP","eCurrencyCode":2,"strSymbol":"£","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"EUR":{"strCode":"EUR","eCurrencyCode":3,"strSymbol":"€","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":",","strThousandsSeparator":" ","strSymbolAndNumberSeparator":""},"CHF":{"strCode":"CHF","eCurrencyCode":4,"strSymbol":"CHF","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":" ","strSymbolAndNumberSeparator":" "},"RUB":{"strCode":"RUB","eCurrencyCode":5,"strSymbol":"pуб.","bSymbolIsPrefix":false,"bWholeUnitsOnly":true,"strDecimalSymbol":",","strThousandsSeparator":"","strSymbolAndNumberSeparator":" "},"BRL":{"strCode":"BRL","eCurrencyCode":7,"strSymbol":"R$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":" "},"JPY":{"strCode":"JPY","eCurrencyCode":8,"strSymbol":"¥","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"NOK":{"strCode":"NOK","eCurrencyCode":9,"strSymbol":"kr","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":" "},"IDR":{"strCode":"IDR","eCurrencyCode":10,"strSymbol":"Rp","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":".","strThousandsSeparator":" ","strSymbolAndNumberSeparator":" "},"MYR":{"strCode":"MYR","eCurrencyCode":11,"strSymbol":"RM","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"PHP":{"strCode":"PHP","eCurrencyCode":12,"strSymbol":"P","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"SGD":{"strCode":"SGD","eCurrencyCode":13,"strSymbol":"S$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"THB":{"strCode":"THB","eCurrencyCode":14,"strSymbol":"฿","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"VND":{"strCode":"VND","eCurrencyCode":15,"strSymbol":"₫","bSymbolIsPrefix":false,"bWholeUnitsOnly":true,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":""},"KRW":{"strCode":"KRW","eCurrencyCode":16,"strSymbol":"₩","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"TRY":{"strCode":"TRY","eCurrencyCode":17,"strSymbol":"TL","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":" "},"UAH":{"strCode":"UAH","eCurrencyCode":18,"strSymbol":"₴","bSymbolIsPrefix":false,"bWholeUnitsOnly":true,"strDecimalSymbol":",","strThousandsSeparator":" ","strSymbolAndNumberSeparator":""},"MXN":{"strCode":"MXN","eCurrencyCode":19,"strSymbol":"Mex$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"CAD":{"strCode":"CAD","eCurrencyCode":20,"strSymbol":"CDN$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"AUD":{"strCode":"AUD","eCurrencyCode":21,"strSymbol":"A$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"NZD":{"strCode":"NZD","eCurrencyCode":22,"strSymbol":"NZ$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"PLN":{"strCode":"PLN","eCurrencyCode":6,"strSymbol":"zł","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":",","strThousandsSeparator":" ","strSymbolAndNumberSeparator":""},"CNY":{"strCode":"CNY","eCurrencyCode":23,"strSymbol":"¥","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"INR":{"strCode":"INR","eCurrencyCode":24,"strSymbol":"₹","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"CLP":{"strCode":"CLP","eCurrencyCode":25,"strSymbol":"CLP$","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":" "},"PEN":{"strCode":"PEN","eCurrencyCode":26,"strSymbol":"S/.","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"COP":{"strCode":"COP","eCurrencyCode":27,"strSymbol":"COL$","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":" "},"ZAR":{"strCode":"ZAR","eCurrencyCode":28,"strSymbol":"R","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":" ","strSymbolAndNumberSeparator":" "},"HKD":{"strCode":"HKD","eCurrencyCode":29,"strSymbol":"HK$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"TWD":{"strCode":"TWD","eCurrencyCode":30,"strSymbol":"NT$","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"SAR":{"strCode":"SAR","eCurrencyCode":31,"strSymbol":"SR","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"AED":{"strCode":"AED","eCurrencyCode":32,"strSymbol":"AED","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"SEK":{"strCode":"SEK","eCurrencyCode":33,"strSymbol":"kr","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"ARS":{"strCode":"ARS","eCurrencyCode":34,"strSymbol":"ARS$","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":" "},"ILS":{"strCode":"ILS","eCurrencyCode":35,"strSymbol":"₪","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"BYN":{"strCode":"BYN","eCurrencyCode":36,"strSymbol":"Br","bSymbolIsPrefix":true,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""},"KZT":{"strCode":"KZT","eCurrencyCode":37,"strSymbol":"₸","bSymbolIsPrefix":false,"bWholeUnitsOnly":true,"strDecimalSymbol":",","strThousandsSeparator":" ","strSymbolAndNumberSeparator":""},"KWD":{"strCode":"KWD","eCurrencyCode":38,"strSymbol":"KD","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"QAR":{"strCode":"QAR","eCurrencyCode":39,"strSymbol":"QR","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"CRC":{"strCode":"CRC","eCurrencyCode":40,"strSymbol":"₡","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":""},"UYU":{"strCode":"UYU","eCurrencyCode":41,"strSymbol":"$U","bSymbolIsPrefix":true,"bWholeUnitsOnly":true,"strDecimalSymbol":",","strThousandsSeparator":".","strSymbolAndNumberSeparator":""},"BGN":{"strCode":"BGN","eCurrencyCode":42,"strSymbol":"лв","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"HRK":{"strCode":"HRK","eCurrencyCode":43,"strSymbol":"kn","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"CZK":{"strCode":"CZK","eCurrencyCode":44,"strSymbol":"Kč","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"DKK":{"strCode":"DKK","eCurrencyCode":45,"strSymbol":"kr.","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"HUF":{"strCode":"HUF","eCurrencyCode":46,"strSymbol":"Ft","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"RON":{"strCode":"RON","eCurrencyCode":47,"strSymbol":"lei","bSymbolIsPrefix":false,"bWholeUnitsOnly":false,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":" "},"RMB":{"strCode":"RMB","eCurrencyCode":9000,"strSymbol":"刀币","bSymbolIsPrefix":false,"bWholeUnitsOnly":true,"strDecimalSymbol":".","strThousandsSeparator":"","strSymbolAndNumberSeparator":" "},"NXP":{"strCode":"NXP","eCurrencyCode":9001,"strSymbol":"원","bSymbolIsPrefix":false,"bWholeUnitsOnly":true,"strDecimalSymbol":".","strThousandsSeparator":",","strSymbolAndNumberSeparator":""}}

function v_currencyformat( valueInCents, currencyCode, countryCode )
{
	var currencyFormat = (valueInCents / 100).toFixed(2);

	if ( g_rgCurrencyData[currencyCode] )
	{
		var currencyData = g_rgCurrencyData[currencyCode];
		if ( IsCurrencyWholeUnits( currencyCode ) )
		{
			currencyFormat = currencyFormat.replace( '.00', '' );
		}

		if ( currencyData.strDecimalSymbol != '.' )
		{
			currencyFormat = currencyFormat.replace( '.', currencyData.strDecimalSymbol );
		}

		var currencyReturn = IsCurrencySymbolBeforeValue( currencyCode ) ?
			 GetCurrencySymbol( currencyCode ) + currencyData.strSymbolAndNumberSeparator + currencyFormat
			 : currencyFormat + currencyData.strSymbolAndNumberSeparator + GetCurrencySymbol( currencyCode );

		if ( currencyCode == 'USD' && typeof(countryCode) != 'undefined' && countryCode != 'US' )
		{
			return currencyReturn + ' USD';
		}
		else if ( currencyCode == 'EUR' )
		{
			return currencyReturn.replace( ',00', ',--' );
		}
		else
		{
			return currencyReturn;
		}
	}
	else
	{
		return currencyFormat + ' ' + currencyCode;
	}
}

function IsCurrencySymbolBeforeValue( currencyCode )
{
	return g_rgCurrencyData[currencyCode] && g_rgCurrencyData[currencyCode].bSymbolIsPrefix;
}
function IsCurrencyWholeUnits( currencyCode )
{
    return g_rgCurrencyData[currencyCode] && g_rgCurrencyData[currencyCode].bWholeUnitsOnly && currencyCode != 'RUB';
}
function GetCurrencySymbol( currencyCode )
{
	return g_rgCurrencyData[currencyCode] ? g_rgCurrencyData[currencyCode].strSymbol : currencyCode + ' ';
}
function GetCurrencyCode( currencyId )
{
	for ( var code in g_rgCurrencyData )
	{
		if ( g_rgCurrencyData[code].eCurrencyCode == currencyId )
        {
			return code;
        }
	}
	return 'Unknown';
};
var youreceivethingys = document.getElementById("youreceive")
function getbuyerpriceasint() {
    return document.getElementById("element").value;
};
var g_rgWalletInfo = {"wallet_currency":1,"wallet_country":"US","wallet_fee":"1","wallet_fee_minimum":"1","wallet_fee_percent":"0.05","wallet_publisher_fee_percent_default":"0.10","wallet_fee_base":"0","wallet_balance":"76","wallet_delayed_balance":"0","wallet_max_balance":"200000","wallet_trade_max_balance":"180000","success":true};
//g_rgwalletinfo table

function OnBuyerPriceInputKeyUp() {
    console.log(getbuyerpriceasint());
    try{
      var publisherfee = g_rgWalletInfo['wallet_publisher_fee_percent_default'];
      var nAmount = getbuyerpriceasint() * 100;
      var quantity = 1;
      var feeinfo = CalculateFeeAmount( nAmount, publisherfee );
      nAmount = nAmount - feeinfo.fees;
      var youreceivethingy = document.getElementById("youreceive");
      youreceivethingy.innerHTML = `You Receive: ${v_currencyformat( nAmount * quantity, GetCurrencyCode( g_rgWalletInfo['wallet_currency'] ))}`;
    } catch (error) {
      console.error(error)
    }
};
