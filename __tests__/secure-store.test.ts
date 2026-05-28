jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

import * as SecureStore from "expo-secure-store";
import { getAuthToken, setAuthToken, clearAuthToken } from "../lib/secure-store";

const TOKEN_KEY = "groceror_auth_token";

describe("secure-store token helpers", () => {
  beforeEach(() => jest.clearAllMocks());

  it("getAuthToken calls SecureStore.getItemAsync with correct key", async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue("test-token");
    const result = await getAuthToken();
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith(TOKEN_KEY);
    expect(result).toBe("test-token");
  });

  it("getAuthToken returns null when no token stored", async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);
    expect(await getAuthToken()).toBeNull();
  });

  it("setAuthToken calls SecureStore.setItemAsync with key and value", async () => {
    (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);
    await setAuthToken("my-jwt");
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(TOKEN_KEY, "my-jwt");
  });

  it("clearAuthToken calls SecureStore.deleteItemAsync with correct key", async () => {
    (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined);
    await clearAuthToken();
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith(TOKEN_KEY);
  });
});
