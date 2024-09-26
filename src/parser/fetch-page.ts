import axios, { AxiosRequestHeaders } from 'axios';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const request = axios.create();

export const fetchHTMLPage = async (
  url: string,
  method: RequestMethod = 'GET',
  body: any = {},
  headers?: AxiosRequestHeaders,
): Promise<any> => {
  return (await request({ url, method, data: body, headers })).data;
};
