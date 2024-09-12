import request from '@/plugins/axios.js';

export default {
    // 查询所有物料信息
    getManageList: () => {
        return request({
            url: '/api/Material/GetAllMaterialList',
            method: 'get'
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
            url: `/api/Material/GetMaterialItemList?mid=${mid}`,
            method: 'get'
        });
    },

    // 新增物料
    addManage: data => {
        return request({
            url: '/api/Material/CreateMaterial',
            method: 'post',
            data
        });
    },

    // 修改物料
    updateManage: (id, data) => {
        return request({
            url: `/api/Material/UpdateMaterial/${id}`,
            method: 'put',
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
            url: `/api/Material/DeleteMaterial/${val}`,
            method: 'delete'
        });
    },

    // 新建物料编码
    addManageCode: data => {
        return request({
            url: '/api/Material/CreateMaterialItem',
            method: 'post',
            data
        });
    },


    // 编辑物料编码
    updateManageCode: (id, data) => {
        return request({
            url: `/api/Material/UpdateMaterialItem/${id}`,
            method: 'put',
            data
        });
    },

    // 删除物料编码
    delManageCode: id => {
        return request({
            url: `/api/Material/DeleteMaterialItem/${id}`,
            method: 'delete'
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
            url: '/api/FormulaManage/QueryProductType',
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
            url: `/api/Bom/GetList?productTypeID=${ProductTypeId}`,
            method: 'get'
        });
    },
    // 添加或者编辑Bom
    addBom: (data) => {
        return request({
            url: `/api/Bom/Create`,
            method: 'post',
            data
        });
    },
    updateBom: (data, id) => {
        return request({
            url: `/api/Bom/Update/${id}`,
            method: 'put',
            data
        });
    },

    DelBom: Id => {
        return request({
            url: `/api/Bom/Delete/${Id}`,
            method: 'delete',
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
