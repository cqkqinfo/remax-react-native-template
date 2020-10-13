import { request } from 'remax/wechat';

type RequestOptions = WechatMiniprogram.RequestOption &
  import('@remax/shared').PromisifyArgs<
    WechatMiniprogram.RequestSuccessCallbackResult,
    WechatMiniprogram.GeneralCallbackResult
  > & { headers?: any };

interface RequestInterceptor {
  (options: RequestOptions): Promise<RequestOptions> | RequestOptions;
}

interface ResponseInterceptor {
  (
    result: WechatMiniprogram.RequestSuccessCallbackResult,
    options: RequestOptions
  ):
    | Promise<WechatMiniprogram.RequestSuccessCallbackResult | void>
    | WechatMiniprogram.RequestSuccessCallbackResult
    | void;
}

export default class Request {
  constructor(
    private config: {
      baseUrl: string | undefined;
    }
  ) {}
  private getRequestOptions(options: RequestOptions): RequestOptions {
    return {
      ...options,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      url: `${/http/.test(options.url) ? '' : this.config.baseUrl}${
        options.url
      }`
    };
  }
  public request = async <T extends any>(
    options: RequestOptions
  ): Promise<
    Omit<WechatMiniprogram.RequestSuccessCallbackResult, 'data'> & { data: T }
  > => {
    let requestOptions = this.getRequestOptions(options);
    for (const item of this.requestInterceptors) {
      requestOptions = await item(requestOptions);
    }
    let result = await request(requestOptions);
    for (const item of this.responseInterceptors) {
      result = (await item(result, requestOptions)) || result;
    }
    return result;
  };
  private responseInterceptors: ResponseInterceptor[] = [];
  private requestInterceptors: RequestInterceptor[] = [];
  interceptors = {
    request: {
      use: (fn: RequestInterceptor) => {
        this.requestInterceptors.push(fn);
      }
    },
    response: {
      use: (fn: ResponseInterceptor) => {
        this.responseInterceptors.push(fn);
      }
    }
  };
}
