import axios, {AxiosInstance} from 'axios';
import * as AxiosLogger from 'axios-logger';
import md5 from 'blueimp-md5';
import Config from 'react-native-config';

export default class Services {
  instance: AxiosInstance = null;
  constructor() {
    const time = Date.now();
    this.instance = axios.create({
      // baseURL: Config.SERVER,
      baseURL: 'http://192.168.0.101:3000/api/chnqoo-notebook',
      timeout: 2000,
      headers: {
        t: time,
        s: md5(`Chnqoo@t:${time}`),
      },
    });
    this.instance.interceptors.request.use(request => {
      return AxiosLogger.requestLogger(request, {
        prefixText: 'react-native/axios',
        dateFormat: 'yyyy-mm-dd HH:MM:ss',
        params: true,
        headers: true,
        method: true,
      });
    });
    this.instance.interceptors.response.use(response => {
      let result = response.data;
      if (result.success) {
      } else {
        console.log(result);
      }
      return response;
    });
  }

  async selectLogin() {
    let result = await this.instance.get('/login');
    return result.data;
  }

  async upload(datas: {id: string; idQoo: number | never; file: any}) {
    let form = new FormData();
    Object.keys(datas).map(it => {
      form.append(it, datas[it]);
    });
    this.instance.defaults.baseURL = Config.COMMON_SERVER;
    // this.instance.defaults.headers = {'Content-Type': 'multipart/form-data'};
    let result = await this.instance.post('/fileUploader', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return result.data;
  }

  async testBaidu() {
    this.instance.defaults.baseURL = 'https://www.baidu.com';
    // this.instance.defaults.headers = {'Content-Type': 'multipart/form-data'};
    let result = await this.instance.get('/');
    return result.data;
  }

  /**
   * 首页三大指数涨跌家数
   * @returns
   */
  async selectDfcfFundCounts() {
    this.instance.defaults.baseURL = 'https://push2.eastmoney.com';
    this.instance.defaults.headers['referer'] =
      'https://data.eastmoney.com/zjlx/dpzjlx.html';
    let result = await this.instance.get(
      '/api/qt/ulist.np/get?cb=&fltt=2&secids=1.000001%2C0.399001&fields=f1%2Cf2%2Cf3%2Cf4%2Cf6%2Cf12%2Cf13%2Cf104%2Cf105%2Cf106',
    );
    return result.data;
  }
}
