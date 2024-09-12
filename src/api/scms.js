import axios from "@/plugins/axios";

const scms = {
    /**
     * @description: 请求登陆接口模版
     * @param {type} 
     * @return: 
     */
    login({username, password}) {
        return axios.post("/login", {
            username,
            password
        })
    }
}


export default scms;