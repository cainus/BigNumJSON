var bignum = require('bignum');

var BigNumJSON = function(){
};

BigNumJSON.parse = function(json, reviver){
  json = json.replace(/\s*:\s*([0-9]+)\s*\}/mg, ':"$1"}');
  json = json.replace(/\s*:\s*([0-9]+)\s*\,/mg, ':"$1",');
  reviver = reviver ||  function(k, v){
                          if ((k !== "") && (!isNaN(parseInt(v, 10)))){
                            return bignum(v);
                          } else {
                            return v;
                          }
                        };
  var obj = JSON.parse(json, reviver);
  return obj;
};

BigNumJSON.stringify = function(obj){
  return JSON.stringify(obj);
};



module.exports = BigNumJSON;
