import { expect, use,request } from 'chai';
import {describe, it} from 'mocha';
import chaiHttp from 'chai-http';
import server from '../index';

use(chaiHttp);

describe('welcome routes', function () {
    it('welcome routes functional', (done: Mocha.Done) => {
        request(server)
            .get('/welcome')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});