// Mock expo-router BEFORE any imports
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

// Mock secure-store BEFORE importing auth-context
jest.mock("../lib/secure-store", () => ({
  getAuthToken: jest.fn(),
  setAuthToken: jest.fn(),
  clearAuthToken: jest.fn(),
}));

import { decodeToken } from "../lib/auth-context";

function makeToken(
  payload: object,
  exp = Math.floor(Date.now() / 1000) + 3600,
): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify({ ...payload, exp }));
  return `${header}.${body}.fakesig`;
}

describe("decodeToken", () => {
  it("returns phone and entityType from valid token", () => {
    const token = makeToken({ sub: "+1234567890", entity_type: "user" });
    expect(decodeToken(token)).toEqual({
      phone: "+1234567890",
      entityType: "user",
    });
  });

  it("returns null for expired token", () => {
    const token = makeToken(
      { sub: "+1234567890", entity_type: "user" },
      Math.floor(Date.now() / 1000) - 1,
    );
    expect(decodeToken(token)).toBeNull();
  });

  it("returns null for malformed token string", () => {
    expect(decodeToken("not.a.jwt")).toBeNull();
  });

  it("defaults entityType to 'user' when field is missing", () => {
    const token = makeToken({ sub: "+1234567890" });
    expect(decodeToken(token)?.entityType).toBe("user");
  });
});
