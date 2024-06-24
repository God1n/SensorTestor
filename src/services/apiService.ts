import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://example.com';

class ApiService {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: Infinity, // Set your desired timeout value
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    // const {tokens} = JSON.parse(AsyncStorage.getItem('persist:auth') || '{}');
    // const {accessToken, refreshToken} = JSON.parse(tokens || '{}');
    ApiService.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: Infinity, // Set your desired timeout value
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${accessToken}`,
        // refreshToken: refreshToken,
      },
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.axiosInstance.get(
      url,
      config,
    );
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    console.log(BASE_URL);
    const response: AxiosResponse<T> = await ApiService.axiosInstance.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await ApiService.axiosInstance.put(
      url,
      data,
      config,
    );
    return response.data;
  }

  public updateTokens(accessToken: string, refreshToken: string) {
    ApiService.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: Infinity, // Set your desired timeout value
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        refreshToken: refreshToken,
      },
    });
  }

  // You can also add interceptors, error handling, etc. to this service
}

export default ApiService;
