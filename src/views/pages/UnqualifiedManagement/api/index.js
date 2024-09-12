import axios from 'axios';
import { Message } from 'element-ui';
import _ from 'lodash';

const request = axios.create({});
request.interceptors.response.use(
    function(response) {
        const { code, msg } = response.data;
        if (msg && _.isNumber(code) && code !== 0) Message.warning(msg);
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export const UnqualifiedApi = {
    /**获取不合格原因的列表*/
    GetAllReasonAsync: data => {
        let url = `/api/Unqualified/GetAllReasonAsync`;
        const method = 'post';
        // if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**提交不合格原因列表.*/
    SubmitReasonAsync: data => {
        let url = `/api/Unqualified/SubmitReasonAsync`;
        const method = 'put';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**获取判定的列表.*/
    GetJudgmentListAsync: data => {
        let url = `/api/Unqualified/GetJudgmentListAsync`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**获取判定详情.*/
    GetJudgmentAsyncById: data => {
        let url = `/api/Unqualified/GetJudgmentAsync/${data.Id}`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**创建判定.*/
    CreateJudgmentAsync: data => {
        let url = `/api/Unqualified/CreateJudgmentAsync`;
        const method = 'post';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**删除判定.*/
    DeleteJudgmentAsync: data => {
        let url = `/api/Unqualified/DeleteJudgmentAsync/${data.Id}`;
        const method = 'delete';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**导出详情.*/
    ExportJudgmentAsync: data => {
        let url = `/api/Unqualified/ExportJudgmentAsync`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data, responseType: 'blob' });
    },
    /**查询不合格列表.*/
    GetRecordListAsync: data => {
        let url = `/api/Unqualified/GetRecordListAsync`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**获取判断结果类型.*/
    GetJudgmentTypeAsync: data => {
        let url = `/api/Unqualified/GetJudgmentTypeAsync`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },

    /**获取产品列表.*/
    GetAllProductList: data => {
        let url = `/api/FormulaManage/QueryProductType`;
        const method = 'post';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**获取产品生产信息.*/
    GetRecordBySerialNumberAsync: data => {
        let url = `/api/Unqualified/GetRecordBySerialNumberAsync`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    }
};

export const TraceApi = {
    /**外部接口-获取trace列表.*/
    GetList: data => {
        let url = `/api/Trace/GetList`;
        const method = 'post';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    }
};

export const ProductApi = {
    /**根据ID获取信息*/
    GetByModel: (data = {}) => {
        let url = `/api/Product/Get`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    }
};

export const WorkSectionApi = {
    /**根据列表*/
    GetAllList: (data = {}) => {
        let url = `/api/WorkSection/GetAllList`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    }
};

export const SystemSettingApi = {
    /**根据Key获取信息*/
    GetItem: (data = {}) => {
        let url = `/api/SystemSetting/GetItem`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**根据Key获取信息*/
    GetAll: (data = {}) => {
        let url = `/api/SystemSetting/GetAll`;
        const method = 'get';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    }
};
export const UserManageApi = {
    /**获取所有角色*/
    UserManage_GstRole: (data = {}) => {
        let url = `/api/UserManage/UserManage_GstRole`;
        const method = 'post';
        url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    },
    /**获取某个用户的角色*/
    UserManage_GstUserRight: (data = {}) => {
        let url = `/api/UserManage/UserManage_GstUserRight`;
        const method = 'post';
        url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    }
};
export const MaterialApi = {
    /**获取工序关联的物料*/
    GetMaterials: (data = {}) => {
        let url = `/api/Material/GetMaterials`;
        const method = 'post';
        if (method === 'get') url += '?' + new URLSearchParams(data).toString();
        return request({ url, method, data });
    }
};

export const login = data => {
    return request({
        method: 'post',
        url:
            '/api/Login/Login_GstLoginIsSuccess?argUserAccount=' +
            data.username +
            '&argPassword=' +
            data.password,
        argUserAccount: data.username,
        argPassword: data.password
    });
};
