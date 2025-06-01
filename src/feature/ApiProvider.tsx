import { useAuthStore } from '../store/autoStore';

/**
 * Base API URL
 * API주소 설정
 */
// const BASE_URL = process.env.REST_API_END_POINT + '/api';
const BASE_URL = '/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const getAccessTokenHeaders = async () => {
  const accessToken = useAuthStore.getState().accessToken;
  const headers = {
    ...defaultHeaders,
  };
  return headers;
};

// Helper function to make API requests (handles both JSON and FormData)
const apiRequest = async (
  method,
  url,
  body = null,
  customHeaders = {},
  retryCount = 0,
) => {
  if (retryCount > 2) {
    // 재귀 제한 (최대 2번 재시도)
    throw new Error('Too many authentication retries');
  }
  const tokenHeaders = await getAccessTokenHeaders(); // 토큰 헤더 가져오기
  let headers = {
    ...tokenHeaders,
    ...customHeaders,
  };
  if (body instanceof FormData) {
    delete headers['Content-Type'];
  } else if (body) {
    body = JSON.stringify(body);
  }
  const options = {
    method,
    headers,
    body: body ? body : null, // If body is null, no body is sent
    credentials: 'include',
  };
  try {
    const response = await fetch(`${BASE_URL}${url}`, options);
    const responseData = await response.json();
  
    if (!response.ok) {
      // 유효하지 않은 토큰의 경우
      if (response.status === 401) {
        if (typeof url === 'string' && url.includes('refresh')) {
          // 리프레쉬 토큰 만료 케이스 처리
          alert('토큰 만료');
          window.location.replace('/user/login');
          return;
        }
      }
  
      throw new Error('Re-authentication failed');
    }
  
    // 성공 케이스에서는 responseData 반환
    return responseData;
  
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error; // 필요시 외부에서 처리
  }
};
/**
 * Makes a request to the specified URL with optional path parameters and request body.
 *
 * @param {Object} params - The request parameters encapsulated in the RequestParam object.
 * @param {string} params.url - The URL to send the request to.
 * @param {Object} [params.query] - The URL to send the request to.
 * @param {Object|Array} [params.pathParam] - Path parameters to append to the URL. Can be an object or an array (optional).
 * @param {Object} [params.headers] - Headers to include with the request (optional).
 *
 * @returns {Promise} - Returns a promise that resolves with the response of the request.
 */
const get = ({ url, query, pathParam, headers = {} }) => {
  // 경로 파라미터 처리
  if (pathParam && typeof pathParam == 'object') {
    if (Array.isArray(pathParam)) {
      url = url + '/' + pathParam.join('/');
    } else {
      url = url + '/' + Object.values(pathParam).join('/');
    }
  }
  // 쿼리 파라미터 처리
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url = `${url}?${queryString}`;
  }

  return apiRequest('GET', url, null, headers);
};

/**
 * Makes a request to the specified URL with optional path parameters and request body.
 *
 * @param {Object} params - The request parameters encapsulated in the RequestParam object.
 * @param {string} params.url - The URL to send the request to.
 * @param {Object} [params.body] - The body of the request (optional).
 * @param {Object|Array} [params.pathParam] - Path parameters to append to the URL. Can be an object or an array (optional).
 * @param {Object} [params.headers] - Headers to include with the request (optional).
 *
 * @returns {Promise} - Returns a promise that resolves with the response of the request.
 */
const post = ({ url, body, pathParam = null, headers = {} }) => {
  // 경로 파라미터 처리
  if (pathParam && typeof pathParam == 'object') {
    if (Array.isArray(pathParam)) {
      url = url + '/' + pathParam.join('/');
    } else {
      url = url + '/' + Object.values(pathParam).join('/');
    }
  }

  return apiRequest('POST', url, body, headers);
};

export { get, post };
