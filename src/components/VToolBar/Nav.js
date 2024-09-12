/*
 * @Description: 顶部导航条
 * @Date: 2019-11-12 17:31:23
 * @Author: Tao
 * @LastEditors: 随风
 * @LastEditTime: 2019-11-26 09:37:43
 */

const nav = [{
        title: '报警管理',
        permission: 'alarm',
        to: '/alarm'
    },
    {
        title: '客户管理',
        permission: 'customer_management',
        to: '/customer'
    },
    {
        title: '售后服务',
        permission: 'after_sale_service',
        to: '/after-sale'
    },
    {
        title: '设备台账',
        to: '/equipment'
    },
    {
        title: '日志',
        to: '/log'
    },
    {
        title: '订单管理',
        to: '/order'
    },
    {
        title: '知识库',
        to: '/repository'
    },
    {
        title: '产品分析',
        to: '/analysis'
    },
    {
        title: '趋势图',
        to: '/tendency'
    },
    {
        title: '权限管理',
        to: '/permission',
        children: [{
                title: '用户管理',
                to: '/user_management'
            },
            {
                title: '角色管理',
                to: '/role_management'
            }
        ]
    },
    {
        title: "代办事项",
        to: "/to-do"
    },
    {
        title: "自来水系统",
        to: "/tapwater"
    },
    {
        title:"变配电系统",
        to:"/powerdistribution"
    },
    {
        title:"设备监控系统",
        to:"/Monitor"
    }
];

export default nav;