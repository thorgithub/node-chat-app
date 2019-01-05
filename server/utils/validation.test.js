const {expect} = require('except');

const {isRealString} = require('./validation');

describe('Validating a String..',()=>{
    it('should reject non-string values',()=>{
        
        isRealString('    1212354sdlan   ',(res)=>{
            expect(res).tobe(false)
        })

    })
    it('should reject string with only spaces',()=>{
        
        isRealString('       ',(res)=>{
            expect(res).tobe(false)
        })
    })

    it('should allow string with non-space characters',()=>{
        
        isRealString('Pranit',(res)=>{
            expect(res).tobe(true)
        })

    })
        



})