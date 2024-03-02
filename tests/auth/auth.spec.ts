import { expect, test } from "vitest";
import fetch from "node-fetch";
import { generateAccessToken } from "../../utils/generateToken";
import { searchUserByEmail } from "../../repository/auth";
import { BASEURL } from "../../constants/baseUrl";

test("check if user can login", async () => {
  const payload = {
    email: "sysagar07@gmail.com",
    password: "12345678",
  };

  const response = await fetch(`${BASEURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  expect(response.status).toBe(200);
});

test("verify token", async () => {
    const email = "sysagar07@gmail.com";

  

     const   token = generateAccessToken({ userEmail: "sysagar07@gmail.com" });
      console.log('token',token);
    
    const response = await fetch(`${BASEURL}/verify`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
    });
    

    expect(response.status).toBe(200);
});
