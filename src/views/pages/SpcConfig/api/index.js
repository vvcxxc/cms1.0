import axios from '@/plugins/axios';
import { Message } from 'element-ui';
import _ from 'lodash';

const api = axios.create({});
api.interceptors.response.use(
    function(response) {
        const { code, msg } = response.data;
        if (msg && _.isNumber(code) && code !== 0) Message.error(msg);
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

// 获取子组容量列表
export const getSubgroupCapacity = () => {
    return api({
        url: '/api/SPCAnalysis/GetSubgroupCapacity',
        method: 'get'
    });
};

export const SPCConfigApi = {
    /**批量新增SPC*/
    InsertMany(data = {}, params = {}) {
        return api({
            url: `/api/SPCConfig/InsertMany`,
            method: 'post',
            data,
            params
        });
    },
    /**批量修改SPC*/
    UpdateMany(data = {}, params = {}) {
        return api({
            url: `/api/SPCConfig/UpdateMany`,
            method: 'post',
            data,
            params
        });
    },
    /**恢复修改SPC*/
    UpdateRecover(data = {}, params = {}) {
        return api({
            url: `/api/SPCConfig/UpdateRecover`,
            method: 'post',
            data,
            params
        });
    },
    /**删除*/
    DeleteMany(data = {}, params = {}) {
        return api({
            url: `/api/SPCConfig/DeleteMany`,
            method: 'delete',
            data,
            params
        });
    },
    /**获取分页列表*/
    getPagedList(params) {
        const str = '?' + new URLSearchParams(params).toString();
        return api({
            url: `/api/SPCConfig/GetPagedList${str}`,
            method: 'get'
        });
    },
    /**导出*/
    Export(data = {}, params = {}) {
        return api({
            url: `/api/SPCConfig/Export`,
            method: 'get',
            responseType: 'blob',
            data,
            params
        });
    },
    /**SPC修改记录*/
    GetHisPagedListAsync(data = {}, params = {}) {
        return api({
            url: `/api/SPCConfig/GetHisPagedListAsync`,
            method: 'get',
            data,
            params
        });
    },
    /**导出SPC修改记录*/
    ExportHisAsync(data = {}, params = {}) {
        return api({
            url: `/api/SPCConfig/ExportHisAsync`,
            method: 'get',
            responseType: 'blob',
            data,
            params
        });
    }
};
