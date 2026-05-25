import axios, { AxiosError, AxiosResponse } from 'axios';

// Configure the base URL for the Axios instance
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

// Rate-limiting configuration: maximum 5 requests per 2 seconds (2000ms)
const LIMIT_INTERVAL_MS = 2000;
const MAX_REQUESTS_PER_INTERVAL = 5;
let requestTimestamps: number[] = [];

const checkRateLimit = (): Promise<void> => {
  const now = Date.now();
  // Filter timestamps to keep only those within the current interval window
  requestTimestamps = requestTimestamps.filter((t) => now - t < LIMIT_INTERVAL_MS);

  if (requestTimestamps.length >= MAX_REQUESTS_PER_INTERVAL) {
    const oldestTimestamp = requestTimestamps[0];
    const waitTime = LIMIT_INTERVAL_MS - (now - oldestTimestamp);
    // Wait for the window slot to open, then re-check
    return new Promise((resolve) => setTimeout(resolve, waitTime)).then(checkRateLimit);
  }

  requestTimestamps.push(now);
  return Promise.resolve();
};

// Add request interceptor for rate-limiting
axios.interceptors.request.use(async (config) => {
  await checkRateLimit();
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Intercept responses to handle errors globally
axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError<any, any>) => {
    if (!error.response) {
      console.error('Network error or server unreachable');
      return Promise.reject(error);
    }
    const { data, status } = error.response;
    switch (status) {
      case 400:
        if (data && data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          console.error('Validation errors:', modelStateErrors.flat());
        } else {
          console.error('Bad request:', data ? data.title : 'Bad request');
        }
        break;
      case 401:
        console.error('Unauthorized:', (data && data.title) || 'Unauthorized');
        break;
      case 403:
        console.error('Forbidden: You are not allowed to do that!');
        break;
      case 500:
        console.error('Server Error:', (data && data.title) || 'Server Error!');
        break;
      default:
        console.error('An unexpected error occurred.');
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Search = {
  global: (query: string) => {
    if (typeof query !== 'string') {
      return Promise.reject(new TypeError('Search query must be a string'));
    }
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      return Promise.reject(new Error('Search query cannot be empty'));
    }
    if (trimmed.length > 500) {
      return Promise.reject(new Error('Search query exceeds maximum limit of 500 characters'));
    }
    return requests.get('search/global', new URLSearchParams({ query: trimmed }));
  },
  local: (query: string) => {
    if (typeof query !== 'string') {
      return Promise.reject(new TypeError('Search query must be a string'));
    }
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      return Promise.reject(new Error('Search query cannot be empty'));
    }
    if (trimmed.length > 500) {
      return Promise.reject(new Error('Search query exceeds maximum limit of 500 characters'));
    }
    return requests.get('search/local', new URLSearchParams({ query: trimmed }));
  },
};

const Status = {
  check: () => requests.get('status'),
};

const agent = {
  Search,
  Status,
};

export default agent;
