import { getUserInfo } from "@/util/user"
import { getRightTree, getPowerById } from '@/api/rzdn/common.js'
import { findPathByLeafId, getUrlParam } from '@/util/index.js'

export default {
    methods: {
        async needPower(name, fn) {
            let { data } = await this.getPowerByName(name)
            if (data) {
                if (typeof fn === 'function') fn()
            } else {
                this.confirm_Pop2(this, '该账户无操作权限！')
            }
        },
        getPowerByName(name) {
            return new Promise((resolve, reject) => {
                let powers = this.$store.state.btnPowerData
                let btnObj = {}
                let buttons = findPathByLeafId(getUrlParam('id'), powers)[0].Children
                buttons.forEach((item) => {
                    btnObj[item.RightDesc] = item
                });
                /* 获取按钮权限 */
                getPowerById(getUserInfo('SCMSUserID'), btnObj[name].RightID).then(res => {
                    resolve(res.data)
                }, rej=> {
                    reject(new Error())
                })
            })
          },
    }
}