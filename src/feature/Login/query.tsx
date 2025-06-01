import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { post } from '../ApiProvider';

/**
 * api key 관리
 */
export const QUERY_KEY = '/api/login';

/**
 * 통신 관련 처리
 * @param {*} params
 * @returns
 */
const fetcher = async (params) => {
  try {
    const data = await post(QUERY_KEY, { body: params });
    return data;
  } catch (error) {
    throw error;
  }
};

export const useLoginQuery = () => {
  const result = useMutation((params) => fetcher(params), {
    keepPreviousData: true,
  });

  return {
    mutateLogin: result?.mutateAsync,
  };
};
