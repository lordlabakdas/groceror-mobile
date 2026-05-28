jest.mock("expo-constants", () => {
  const mockConstants = {
    expoConfig: {
      extra: {
        apiUrl: "http://test.local"
      }
    },
  };
  return {
    default: mockConstants,
    __esModule: true,
  };
});

jest.mock("../lib/secure-store", () => ({
  getAuthToken: jest.fn().mockResolvedValue(null),
}));

import { apiRequest, queryFn } from "../lib/api";
import { getAuthToken } from "../lib/secure-store";

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("apiRequest", () => {
  beforeEach(() => jest.clearAllMocks());

  it("sends request to BASE_URL + url", async () => {
    mockFetch.mockResolvedValue({ ok: true, text: async () => "" });
    await apiRequest("GET", "/health");
    expect(mockFetch).toHaveBeenCalledWith(
      "http://test.local/health",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("includes Authorization header when token is present", async () => {
    (getAuthToken as jest.Mock).mockResolvedValue("bearer-token");
    mockFetch.mockResolvedValue({ ok: true, text: async () => "" });
    await apiRequest("GET", "/protected");
    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers["Authorization"]).toBe("Bearer bearer-token");
  });

  it("omits Authorization header when no token", async () => {
    (getAuthToken as jest.Mock).mockResolvedValue(null);
    mockFetch.mockResolvedValue({ ok: true, text: async () => "" });
    await apiRequest("GET", "/public");
    const headers = mockFetch.mock.calls[0][1].headers;
    expect(headers["Authorization"]).toBeUndefined();
  });

  it("sends JSON body for POST requests", async () => {
    mockFetch.mockResolvedValue({ ok: true, text: async () => "" });
    await apiRequest("POST", "/user/login", { phone: "+1234" });
    const [, options] = mockFetch.mock.calls[0];
    expect(options.body).toBe('{"phone":"+1234"}');
    expect(options.headers["Content-Type"]).toBe("application/json");
  });

  it("throws an Error with status code on non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      text: async () => "Unauthorized",
    });
    await expect(apiRequest("GET", "/protected")).rejects.toThrow("401");
  });
});

describe("queryFn", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns parsed JSON on success", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => "",
      json: async () => ({ data: "ok" }),
    });
    const result = await queryFn<{ data: string }>({ queryKey: ["/stores"] as const });
    expect(result).toEqual({ data: "ok" });
  });

  it("returns null on 401", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      text: async () => "Unauthorized",
    });
    const result = await queryFn<null>({ queryKey: ["/protected"] as const });
    expect(result).toBeNull();
  });
});
