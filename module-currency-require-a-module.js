/**
 * Created by lz16 on 2014/8/28 0028.
 */
var currency = require('./module-currency-conversion');

console.log('50 Canadian dollars equals this amount of US dollars: ' + currency.canadianToUS(50));
console.log('30 US dollars equals this amount of Canadian dollars: ' + currency.USToCanadian(30));