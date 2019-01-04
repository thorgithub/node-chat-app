var {expect} = require('expect');
const {generateMessage} = require('./message');

describe('Message test for generation',()=>{
    
    it('should generate a message',()=>{
        var from = "test"
        var text = "testing a function"
        var message = generateMessage(from,text);
        // if(res.from === from && res.text === text){
        //     console.log('Test passing..');
        // }
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(typeof message.completedAt).toBe('number');
        // end(done());
    });
})


