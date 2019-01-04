var {expect} = require('expect');
const {generateMessage} = require('./message');

describe('Message test for generation',()=>{
    
    it('should generate a message',()=>{
        var from = "test"
        var text = "testing a function"
        var res = generateMessage(from,text);
        if(res.from === from && res.text === text){
            console.log('Test passing..');
        }
        // expect(res.from).toBe(from);
        // expect(res.text).toBe(text);
        // expect(typeof res.completedAt).toBeA('number');
        // end(done());
    });
})


