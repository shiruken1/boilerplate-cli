#!/usr/bin/env node
import 'babel-polyfill';
const hmac_key = '30db322fc013e7e10dd83a33ec6a6b61';
const hmac_secret = '4f2ce29f03d85fea68a9ee9c8aa334e515f466da9db51c7b63699ab11abe04aa';

// r = conn.call('GET', '/api/fees/').json()
// deposit_fee = r['data']['deposit_fee']
// outgoing_fee = r['data']['outgoing_fee']

// r = conn.call('GET', '/bitcoinaverage/ticker-all-currencies/').json()
// BTCVEF = float(r['VEF']['avg_12h']) # change to 1h once VE has enough buyers 'round the clock'
// BTCUSD = float(r['USD']['avg_1h'])

// r = conn.call('GET', '/sell-bitcoins-online/VEF/national-bank-transfer/.json').json()
// r = r['data']['ad_list']


const dolarBitcoin = BTCVEF / BTCUSD;
const bolivares = dollars * dolarBitcoin;
const bitcoins = bolivares / BTCVEF;

console.log('To send',dollars,'USD to someone in Venezuela, I would need to buy', bitcoins,'BTC.')
console.log('and they would receive',bolivares,'BsF.')
console.log('dolarBitcoin', dolarBitcoin)

/* PSEUDO CODE */
// Stripe.charge({
// 	'name': '',
// 	'zip': '',
// 	'amount': 1.2 * receiver.amount * 100 // pennies + fee
// }).then((response) => {
// 	return localbitcoins.buy({
// 		'amount': bitcoins,
// 		'currency': 'USD'
// 	})

// }).then((response) => {
// 	return localbitcoins.sell({
// 		'amount': bitcoins,
// 		'currency': 'VEF'
// 	})

// }).then((response) => {
// 	Log('Transaction created. We\'ll email you as soon as the order has been filled');
// })

// logout
conn.call('GET', '/api/logout/')