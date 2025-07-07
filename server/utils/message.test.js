import { expect } from 'chai';
import  generateMessage  from "./message.js"

describe('Generate Message', () => {
    it('should generate correct message', () => {
        var from = "Saeed";
        var test = 'test Message';
        var message = generateMessage(from, test);

        expect(message.createdAt).to.be.a('number');
        expect(message).to.deep.include({from, test: test});
    });
});
