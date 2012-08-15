var BigNumJSON = require('../BigNumJSON');
var assert = require('assert');
var bignum = require('bignum');

describe("BigNumJSON", function(){

  describe("#parse", function(){

    describe ("for non numeric use cases ", function(){
      it ("doesn't break simple string parsing", function(){
        assert.equal(BigNumJSON.parse('{"asdf" : "ASDF"}').asdf, "ASDF");
      });

      it ("doesn't break simple sub object parsing", function(){
        assert.equal(BigNumJSON.parse('{"asdf" : {"qwer" : "rtyu"}}').asdf.qwer, "rtyu");
      });


    });

    it ("can parse a large number into a BigNum (no whitespace)", function(){
      var parsed = BigNumJSON.parse('{"asdf":12341234123412341234123412341234}');
      assert(parsed.asdf.eq(bignum('12341234123412341234123412341234'))
      );
    });
    it ("can parse a large number into a BigNum with multiple items", function(){
      var parsed = BigNumJSON.parse('{"asdf":12341234123412341234123412341234,"qwe":"qwe"}');
      assert(parsed.asdf.eq(bignum('12341234123412341234123412341234'))
      );
    });

    it ("can parse a large number into a BigNum (with whitespace)", function(){
      var parsed = BigNumJSON.parse('{"asdf"  : 12341234123412341234123412341234 }');
      assert(parsed.asdf.eq(bignum('12341234123412341234123412341234'))
      );
    });

    it ("doesn't parse a large number as a string into a BigNum", function(){
      var parsed = BigNumJSON.parse('{"asdf"  : "12341234123412341234123412341234" }');
      assert(parsed.asdf.eq(bignum('12341234123412341234123412341234'))
      );
    });
  });

});
