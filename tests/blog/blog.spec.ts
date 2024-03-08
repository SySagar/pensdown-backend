import { expect, test } from "vitest";
import { BASEURL } from "../../constants/baseUrl";
import {blogId, tag, loggedInUserId, fakeUserEmail} from '../fakeData'
import { generateAccessToken } from "../../utils/generateToken";
import fetch from "node-fetch";

test('fetch one single blog by id',async ()=>{

    const payload = {
        "blogId" : blogId
    }

    const response = await fetch(`${BASEURL}/blog/getBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
        
      });

      expect(response.status).toBe(200)

})

test('fetch all blogs', async()=>{
    const response =  await fetch(`${BASEURL}/blog/getAll`,{
        method:'GET'
    }
    );

    expect(response.status).toBe(200);
})

test('fetch blog by tags',async()=>{
    const payload = {
        "tag":tag
    }

    const response = await fetch(`${BASEURL}/blog/getBlogsByTag`, {
        method:'POST',
        body: JSON.stringify(payload)
    })

    expect(response.status).toBe(200);
})

test('fetch user blogs',async()=>{
    const payload = {
        "authorId":loggedInUserId
    }
    const token = generateAccessToken({ userEmail: fakeUserEmail });

    const response = await fetch(`${BASEURL}/blog/getUserBlogsByUserId`, {
        method:'POST',
        body: JSON.stringify(payload),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    expect(response.status).toBe(200);
})