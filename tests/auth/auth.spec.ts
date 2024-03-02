import { expect, test } from "vitest";
import fetch from "node-fetch";
import {
  fakeStrongPassword,
  fakeUserEmail,
  fakeWeakPassword,
} from "../fakedata/userCreator";
import { generateAccessToken } from "../../utils/generateToken";
import { passwordValidator } from "../../utils/isPasswordValid";
import { hashPassword, comparePasswords } from "../../utils/bycrypt";
import { BASEURL } from "../../constants/baseUrl";

test("check if user can login", async () => {
  const payload = {
    email: fakeUserEmail,
    password: fakeStrongPassword,
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
  const token = generateAccessToken({ userEmail: fakeUserEmail });

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

test("check for valid password", async () => {
  const password1 = fakeWeakPassword;
  const password2 = fakeStrongPassword;
  const isPasswordValid = passwordValidator(password1);
  expect(isPasswordValid).toBe(false);

  const isPasswordValid2 = passwordValidator(password2);
  expect(isPasswordValid2).toBe(true);
});

test("check for hashing of password", async () => {
  const password = fakeStrongPassword;
  const hashedPassword = await hashPassword(password);

  expect(hashedPassword).not.toBe(password);
});

test("check for password matcher", async () => {
  const password = fakeStrongPassword;
  const hashedPassword = await hashPassword(password);

  const isPasswordMatch = await comparePasswords(password, hashedPassword);
  expect(isPasswordMatch).toBe(true);
});
