<template>
    <div class="LoginInfor">
        <div class="content">
            <cube-form ref="loginForm" :model="model"   @validate="validateHandler"  @submit="submitHandler">
                <cube-form-group>
                    <cube-form-item :field="fields[0]"></cube-form-item>
                    <cube-form-item :field="fields[1]"></cube-form-item>

                    <div class="code">
                        <cube-form-item :field="fields[2]"></cube-form-item>
                            <div class="login-code">
                                <img :src="codeUrl"  alt="validCode"  @click="getCode">
                            </div>
                    </div>



<!--                    <cube-form-item >
                        <ul>
                            <li class="list-unstyled list-inline"><label>验证码</label></li>
                            <li><cube-input  v-model="model.code" laebl="验证码" placeholder="验证码" style="width: 63%" @keyup.enter.native="submitHandler"></cube-input></li>
                            <li><div class="login-code">
                                <img :src="codeUrl"  alt="validCode"  @click="getCode"></div>
                            </li>
                        </ul>

                    </cube-form-item>-->

<!--                    <cube-form-item :field="fields[3]">
                        <div class="login-code">
                            <img :src="codeUrl"  alt="validCode"  @click="getCode">
                        </div>
                    </cube-form-item>-->
                    <cube-checkbox v-model="model.rememberMe" position="center" shape="square" :hollow-style="true">
                        记住我
                    </cube-checkbox>
                    <!--<cube-form-item :field="fields[3]"></cube-form-item>-->

                </cube-form-group>

                <cube-form-group>
                    <cube-button type="button"  @click="submitHandler">登录</cube-button>
                </cube-form-group>
            </cube-form>
        </div>

    </div>

    <!--    <div>
            <form >
                <div ><label style="float:left">用户名:</label><cube-input style="width: 80%;" v-model="name" ></cube-input></div>
                <br/>
                <div><label style="float:left">密码: </label><cube-input type="password" v-model="password"   :placeholder="密码"
                                     :eye="eye"></cube-input>
                    <cube-button type="button" @click="login()">登录</cube-button></div>

            </form>
        </div>-->
</template>


<script>
    //import {getCodeImg} from "../api/login";
    import qs from "qs"

    export default {
        name: "login",
        created() {
            this.getCode()
            this.getCookie()
        },
        data() {
            return {
                validity: {},
                valid: undefined,
                cookiePass: '',
                codeUrl:"",
                loginUrl:this.$store.state.baseUrl+"/auth/login",
                vCodeUrl:this.$store.state.baseUrl+"/auth/vCode",
                loginRules: {
                    username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
                    password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
                    code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
                },
                loading: false,
                redirect: undefined,
                model: {
                    username: "",
                    password: "",
                    code:"",
                    uuid:"",
                    rememberMe: false
                },
                fields: [
                    {
                        type: "input",
                        modelKey: "username",
                        label: "用户名",
                        props: {
                            placeholder: "请输入用户名"
                        },
                        rules: {
                            required: true
                        }
                    },
                    {
                        type: "input",
                        modelKey: "password",
                        label: "密码",
                        props: {
                            placeholder: "请输入密码"
                        },
                        rules: {
                            required: true
                        }
                    },
                    {
                        type: "input",
                        modelKey: "code",
                        label: "验证码",
                        props: {
                            placeholder: "请输入验证码"
                        },
                        rules: {
                            required: true
                        }
                    },
                    {
                        type: "checkbox",
                        modelKey: "rememberMe",
                        option: {
                            shape:"square",
                            label: '记住我',
                            value: true
                        },
                        rules: {
                            required: false
                        }
                    }
                ]
            };
        },
        methods: {
            getCode() {
                //alert("getCode")
                this.getCodeImg()
/*                    .then(response => {

                    this.codeUrl = 'data:image/gif;base64,' + response.img
                    this.model.uuid = res.uuid
                })*/
            },
            getCodeImg() {
                return this.axios.request({
                    url: this.vCodeUrl,
                    method: 'get'
                }).then(response => {
                    //alert("interceptors response"+response.data.uuid)
                    this.codeUrl = 'data:image/gif;base64,' + response.data.img
                    this.model.uuid = response.data.uuid
                })
            },
            getCookie() {
                const username = this.$cookies.get('username')
                let password = this.$cookies.get('password')
                const rememberMe = this.$cookies.get('rememberMe')
                // 保存cookie里面的加密后的密码
                this.cookiePass = password === undefined ? '' : password
                password = password === undefined ? this.model.password : password
                this.model = {
                    username: username === undefined ? this.model.username : username,
                    password: password,
                    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
                    code: ''
                }
            },
            submitHandler(e) {

                //由于axios默认发送数据时，数据格式是Request Payload，而并非我们常用的Form Data格式，PHP后端未必能正常获取到，所以在发送之前，需要使用qs模块对其进行处理。
                //this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                /*alert(
                    this.model.username +
                    "**" +
                    this.model.password +
                    "**" +
                    this.model.code +"**"
                    + this.model.uuid
                );*/
                // 新创建 axios 实例配置

                const $axios = this.axios.create({
                    baseURL: this.$store.state.baseURL,
                    timeout: 50000,
                    headers: {
                        //'Content-Type': 'application/x-www-form-urlencoded',
                        withCredentials: true,// 指定某个请求应该发送凭据。允许客户端携带跨域cookie，也需要此配置
                    }
                });
                $axios.request({
                    url: this.loginUrl,
                    method: 'post',
                    data: {
                        username:this.model.username,
                        password:this.model.password,
                        code:this.model.code,
                        uuid:this.model.uuid
                    }
                }).then(response => {
                    //alert("response.status="+response.status)
                    if (response.status===200){
                        console.log("response data:"+ JSON.stringify(response.data))

                        this.$router.push({path:"/"});  //登录成功后页面跳转
                    }

                }).catch(err => {
                    let errTxt=err.name+":"+err.message
                    this.$refs["loginForm"].reset() //发生错误，重置表单

                    const toast = this.$createToast({
                        time: 2000,
                        txt: errTxt,
                        type:'error',
                        mask:true
                    })
                    toast.show()

                    //console.log('Error Info:' + JSON.stringify(err))
                })
                return false;
            },
            validateHandler(result) {
                this.validity = result.validity
                this.valid = result.valid
                console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
            }
        }

    };
</script>

<style scoped>

    .LoginInfor {
        background-color: #FFA07A;
        width: 100%;
        height: 1600px;

    .content {
        display: inline-block;
        width: 90%;
        height: 1500px;
        background-color: #fff;
        margin-top: 15px;
    }

    .cube-form-item {
        font-size: 15px;
    }

    .btn {
        background-color: #ffffff;
        color: #C0C0C0;
    }

    .cube-form_standard .cube-validator {
        padding-right: 90px;
    }

    .ss {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }

    }
    .login-code {
        width: 33%;
        display: inline-block;
        height: 38px;
        float: right;
    img {
        cursor: pointer;
        vertical-align: middle
    }
    }
    .code {
        flex: 1 1 auto;

        display: flex;
    }

</style>

