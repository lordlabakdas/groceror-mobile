import Constants from "expo-constants";
import { getAuthToken } from "./secure-store";

function getBaseUrl(): string {
  return Constants.expoConfig?.extra?.apiUrl ?? "";
}

async function authHeaders(
  extra?: Record<string, string>,
): Promise<Record<string, string>> {
  const token = await getAuthToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function throwIfResNotOk(res: Response): Promise<void> {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown,
): Promise<Response> {
  const res = await fetch(`${getBaseUrl()}${url}`, {
    method,
    headers: await authHeaders(
      data ? { "Content-Type": "application/json" } : undefined,
    ),
    body: data ? JSON.stringify(data) : undefined,
  });
  await throwIfResNotOk(res);
  return res;
}

export async function queryFn<T>({
  queryKey,
}: {
  queryKey: readonly unknown[];
}): Promise<T> {
  const url = queryKey[0] as string;
  const res = await fetch(`${getBaseUrl()}${url}`, {
    headers: await authHeaders(),
  });
  if (res.status === 401) return null as T;
  await throwIfResNotOk(res);
  return res.json();
}
