import { expect, test, assert } from 'vitest'
import server from '..';
import fetch from 'node-fetch';

test('Welcome 200 ok',async ()=>{

    const response = await fetch('http://localhost:5000/');
    expect(response.status).toBe(200);

})