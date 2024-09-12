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

// 获取产品型号列表
export const getAllProductList = () => {
    return api({
        url: '/api/Product/GetAllList',
        method: 'get'
    });
};

// 获取全部工序
export const getWorksectionList = () => {
    return api({
        url: `/api/WorkSection/GetAllList`,
        method: 'get'
    });
};

// 获取产品型号列表
export const getProductTree = productId => {
    return api({
        url: '/api/Product/GetTree?productId=' + productId,
        method: 'get'
    });
};

// 切换参数
export const getSpcConfig = id => {
    return api({
        url: '/api/SPCAnalysis/GetSpcConfig?parameterId=' + id,
        method: 'get'
    });
};

// 根据工序Id获取参数列表
export const getParameterByWorkSection = id => {
    return api({
        url: `/api/Formula2Version2WorkSection/Get/${id}`,
        method: 'get'
    });
};

// 获取工序参数列表
export const getTreeAsync = () => {
    return api({
        url: `/api/SPCAnalysis/GetTreeAsync`,
        method: 'get'
    });
};

export const SPCAnalysisApi = {
    /**获取异常规则*/
    getOOCRules() {
        return api({
            url: '/api/SPCAnalysis/GetOOCRules',
            method: 'get'
        });
    },
    /**查询图表数据*/
    QueryChartData(data) {
        return api({
            url: '/api/SPCAnalysis/QueryChartData',
            method: 'post',
            data
        });
    },
    /**获取样本数据*/
    getSampleData(data) {
        return api({
            url: '/api/SPCAnalysis/GetSampleData',
            method: 'post',
            data
        });
    },
    /**导出样本数据*/
    exportSampleData(data) {
        return api({
            url: '/api/SPCAnalysis/ExportSampleData',
            method: 'post',
            responseType: 'blob',
            data
        });
    },

    /**导出spc数据*/
    exportReport(data) {
        return api({
            url: '/api/SPCAnalysis/ExportReport',
            method: 'post',
            responseType: 'blob',
            data
        });
    },
    /**获取子组容量列表*/
    getSubgroupCapacity() {
        return api({
            url: '/api/SPCAnalysis/GetSubgroupCapacity',
            method: 'get'
        });
    },
    /**报警模式选择保存*/
    SaveAlarmShutDown(data = {}) {
        return api({
            url: '/api/SPCAnalysis/SaveAlarmShutDown',
            method: 'post',
            data
        });
    },
    /**判异规则修改*/
    SaveAlarmPattern(data = {}) {
        return api({
            url: '/api/SPCAnalysis/SaveAlarmPattern',
            method: 'post',
            data
        });
    },
    /**上下限修改*/
    SaveAlarmUpperLower(data = {}) {
        return api({
            url: '/api/SPCAnalysis/SaveAlarmUpperLower',
            method: 'post',
            data
        });
    },
    /**报警确认-权限验证*/
    CheckPower(data = {}) {
        return api({
            url: `/api/SPCAnalysis/CheckPower`,
            method: 'post',
            params: data
        });
    },
    /**报警确认-获取原因列表*/
    GetReason(data = {}) {
        return api({
            url: `/api/SPCAnalysis/GetReason`,
            method: 'get',
            params: data
        });
    },
    /**报警确认-根据原因获取处理方法*/
    GetHandleFromReason(data = {}, params = {}) {
        return api({
            url: `/api/SPCAnalysis/GetHandleFromReason`,
            method: 'get',
            data,
            params
        });
    },
    /**报警确认-报警信息列表*/
    GetAlarmList(data = {}) {
        return api({
            url: `/api/SPCAnalysis/GetAlarmList`,
            method: 'get',
            params: data
        });
    },
    /**报警确认*/
    AlarmAllSure(data = {}, params = {}) {
        return api({
            url: `/api/SPCAnalysis/AlarmAllSure`,
            method: 'post',
            data,
            params
        });
    },
    /**报警设置-列表*/
    QueryAlartSetting(data = {}) {
        return api({
            url: `/api/SPCAnalysis/QueryAlartSetting`,
            method: 'post',
            data
        });
    },
    /**报警设置-保存*/
    AddOrEditAlartSetting(data = {}) {
        return api({
            url: `/api/SPCAnalysis/AddOrEditAlartSetting`,
            method: 'post',
            data
        });
    },
    /**报警记录-报警信息列表*/
    GetAlarmRecordList(data = {}, params = {}) {
        return api({
            url: `/api/SPCAnalysis/GetAlarmRecordList`,
            method: 'get',
            data,
            params
        });
    },
    /**报警记录-导出*/
    ExportAlarmRecord(data = {}) {
        return api({
            url: `/api/SPCAnalysis/ExportAlarmRecord`,
            method: 'get',
            params: data,
            responseType: 'blob'
        });
    }
};
