<template>
    <div class="LoginInfor">
        <div class="content">
            <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
                <cube-form-group>
                    <cube-form-item :field="fields[0]"></cube-form-item>
                    <cube-form-item :field="fields[1]"></cube-form-item>
                    <cube-form-item :field="fields[2]"></cube-form-item>

                </cube-form-group>

                <cube-form-group>
                    <cube-button type="submit">Submit</cube-button>
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
    export default {
        name: "login",
        data() {
            return {
                isReg: false,
                repeat: "",
                maxlength: 30,
                eye: {
                    open: true,
                    reverse: false
                },
                loginUrl:this.$store.state.baseUrl+"login",
                vCodeUrl:this.$store.state.baseUrl+"auth/vCode",
                validity: {},
                valid: undefined,
                model: {
                    name: "",
                    password: ""
                },
                fields: [
                    {
                        type: "input",
                        modelKey: "name",
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
                        modelKey: "password",
                        label: "验证码",
                        props: {
                            placeholder: "请输入验证码"
                        },
                        rules: {
                            required: true
                        }
                    }
                ]
            };
        },
        methods: {
            submitHandler(e) {
                alert(
                    this.model.name +
                    "*****" +
                    this.model.password +
                    "***"
                        + this.vCodeUrl
                );
                this.$axios.post('http://192.168.1.105:8000/login',{
                    username:this.model.name,
                    password:this.model.password

                })
                    .then(response =>{
                        alert(response.data);
                        console.log(response.data)

                    });
                //验证姓名和密码是否与locastorage一致
                //localStorage.getItem("name") === this.model.name &&
                //localStorage.getItem("password") === this.model.password

/*                if (this.model.name=="admin" && this.model.password=="123456"  ) {
                    alert("login ok")
                    this.$router.push("/#/login");
                } else {
                    alert('用户名或密码不正确');
                }*/
            },
            validateHandler(result) {
                this.validity = result.validity;
                this.valid = result.valid;
            }
        },
        reg() {
            this.isReg = true;
        },
        cancel() {
            this.isReg = false;
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
</style>
