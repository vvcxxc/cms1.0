import request from '@/plugins/axios.js';

export default {
    // 查询所有物料信息
    getManageList: () => {
        return request({
            url: '/api/MaterialManage/QueryMaterials',
            method: 'post'
        });
    },

    // 查询所有设备信息
    getEquipmentData: () => {
        return request({
            url: '/api/MaterialManage/QueryEquipmentDatas',
            method: 'post'
        });
    },

    // 查询物料编码规则类型
    getCodeRuleTypes: () => {
        return request({
            url: '/api/MaterialManage/QueryItemRuleTypes',
            method: 'post'
        });
    },

    // 查询物料编码规则详情
    getCodeRuleInfo: mid => {
        return request({
            url: `/api/MaterialManage/QueryItemByMaterial?mid=${mid}`,
            method: 'post'
        });
    },

    // 新增物料
    addManage: data => {
        return request({
            url: 'api/MaterialManage/MaterialManage_Add',
            method: 'post',
            data
        });
    },

    // 修改物料
    updateManage: data => {
        return request({
            url: '/api/MaterialManage/MaterialManage_Update',
            method: 'post',
            data
        });
    },
    // 检查物料是否被引用
    deleteOrEditVerify: data => {
        return request({
            url: `/api/MaterialManage/MaterialManage_DeleteOrEditVerify?argMIds=${data.argMIds}&Del=${data.Del}`,
            method: 'post',
        });
    },
    // 检查物料是否被引用
    isUseManage: data => {
        return request({
            url: `/api/MaterialManage/MaterialManage_DeleteVerify?argMIds=${data}`,
            method: 'post',
        });
    },

    // 删除物料
    delManage: val => {
        return request({
            url: `/api/MaterialManage/MaterialManage_Delete?argMIds=${val}`,
            method: 'post'
        });
    },

    // 新建物料编码
    addManageCode: data => {
        return request({
            url: '/api/MaterialManage/MaterialManage_AddItem',
            method: 'post',
            data
        });
    },


    // 编辑物料编码
    updateManageCode: data => {
        return request({
            url: '/api/MaterialManage/MaterialManage_UpdateItem',
            method: 'post',
            data
        });
    },

    // 删除物料编码
    delManageCode: argIds => {
        return request({
            url: `/api/MaterialManage/MaterialManage_DeleteItem?argIds=${argIds}`,
            method: 'post'
        });
    },

    // 上移物料编码
    postUpCodeSort: data => {
        return request({
            url: '/api/MaterialManage/MaterialManage_MoveUpItem',
            method: 'post',
            data
        });
    },

    // 下移物料编码
    postDownCodeSort: data => {
        return request({
            url: '/api/MaterialManage/MaterialManage_MoveDownItem',
            method: 'post',
            data
        });
    },

    // 查询所有产品型号
    getProdList: () => {
        return request({
            url: '/api/MaterialBOMManage/QueryProductType',
            method: 'post'
        });
    },
    AddOrEditProductType: (data, _name) => {
        return request({
            url: `/api/MaterialBOMManage/AddOrEditProductType`,
            method: 'post',
            data
        });
    },
    DelProductType: Id => {
        return request({
            url: `/api/MaterialBOMManage/DelProductType/${Id}`,
            method: 'post',
        });
    },
    // 根据产品型号查询Bom
    getAsynsBomt: (ProductTypeId) => {
        return request({
            url: `/api/MaterialBOMManage/QueryAsynsBom?ProductTypeId=${ProductTypeId}`,
            method: 'post'
        });
    },
    // 添加或者编辑Bom
    AddOrEditBom: (data, _name) => {
        return request({
            url: `/api/MaterialBOMManage/AddOrEditBom?LoginUserName=${_name}`,
            method: 'post',
            data
        });
    },

    DelBom: Id => {
        return request({
            url: `/api/MaterialBOMManage/DelBom/${Id}`,
            method: 'post',
        });
    },

    QueryMaterials: () => {
        return request({
            url: `/api/MaterialManage/QueryMaterials`,
            method: 'post',
        });
    },
    QueryWorkSections: () => {
        return request({
            url: `/api/ProcessParameterConfigure/QueryWorkSections`,
            method: 'post',
        });
    },
    VerifyBOM: (ID, Operate) => {
        return request({
            url: `/api/MaterialBOMManage/VerifyBOM/${ID}?Operate=${Operate}`,
            method: 'post'
        });
    },

};
