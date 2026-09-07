/**
 * Web API client.
 *
 * Deliberately the same contract as `vaultiva-mobile/src/api/client.ts` — same
 * envelope unwrapping, same ApiError, same method surface — so both clients can
 * be reasoned about together and endpoints only have to be learned once.
 */

/**
 * Deployed API. The production default is hardcoded rather than left to
 * VITE_API_URL alone: Vite bakes env vars at build time, so a Vercel project
 * missing the variable would otherwise ship a build pointing at localhost.
 * Set VITE_API_URL to override (e.g. a staging backend).
 */
const PRODUCTION_API = 'https://d3p6prbw9fx10y.cloudfront.net/api/v1';

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? PRODUCTION_API : 'http://localhost:3000/api/v1')
).replace(/\/$/, '');

/** Shape produced by the backend's ResponseInterceptor. */
interface Envelope<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

/** Shape produced by the backend's AllExceptionsFilter. */
interface ErrorBody {
  statusCode: number;
  message: string | string[];
  error: string;
  path?: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly body: ErrorBody | null;

  constructor(status: number, message: string, body: ErrorBody | null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }

  get isAuthError() {
    return this.status === 401;
  }
}

let readToken: () => string | null = () => null;
let onUnauthorized: (() => void) | null = null;

export function configureApi(getToken: () => string | null, onAuthFailure?: () => void) {
  readToken = getToken;
  onUnauthorized = onAuthFailure ?? null;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  anonymous?: boolean;
}

const TIMEOUT_MS = 20_000;

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, anonymous = false } = options;

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (!anonymous) {
    const token = readToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new ApiError(0, 'The request timed out. Check your connection.', null);
    }
    throw new ApiError(0, 'Cannot reach the server. Check your connection.', null);
  } finally {
    window.clearTimeout(timer);
  }

  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // non-JSON body — reported via status below
  }

  if (!response.ok) {
    const errBody = parsed as ErrorBody | null;
    const raw = errBody?.message;
    const message = Array.isArray(raw)
      ? raw.join('\n')
      : raw || `Request failed (${response.status})`;
    if (response.status === 401) onUnauthorized?.();
    throw new ApiError(response.status, message, errBody);
  }

  const envelope = parsed as Envelope<T> | null;
  if (envelope && typeof envelope === 'object' && 'data' in envelope) return envelope.data;
  return parsed as T;
}

export const api = {
  get: <T>(p: string, o?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(p, { ...o, method: 'GET' }),
  post: <T>(p: string, b?: unknown, o?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(p, { ...o, method: 'POST', body: b }),
  patch: <T>(p: string, b?: unknown, o?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(p, { ...o, method: 'PATCH', body: b }),
  put: <T>(p: string, b?: unknown, o?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(p, { ...o, method: 'PUT', body: b }),
  delete: <T>(p: string, o?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(p, { ...o, method: 'DELETE' }),
};
