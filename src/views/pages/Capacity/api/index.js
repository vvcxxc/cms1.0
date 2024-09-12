import axios from 'axios';
import { Message } from 'element-ui';
import _ from 'lodash';

const request = axios.create({});
request.interceptors.response.use(
    function(response) {
        const { code, msg } = response.data;
        if (msg && _.isNumber(code) && code !== 0) Message.error($$t(msg));
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export const CapacityApi = {
    /**产能报表-变量配置-列表*/
    GetConfigList: data => {
        let url = `/api/Capacity/GetConfigList`;
        return request({ url, method: 'get', params: data, data });
    },
    /**产能报表-变量配置-批量保存*/
    Save: data => {
        let url = `/api/Capacity/Save`;
        return request({ url, method: 'post', params: data, data });
    },
    /**产能报表-列表查询*/
    GetRecordListAsync: data => {
        let url = `/api/Capacity/GetRecordListAsync`;
        return request({ url, method: 'get', params: data });
    },
    /**产能报表-变量配置-列表*/
    ExportCapacityRecordAsync: data => {
        let url = `/api/Capacity/ExportCapacityRecordAsync`;
        return request({ url, method: 'post', data, responseType: 'blob' });
    }
};
