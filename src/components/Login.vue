<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form ref="formRef" :model="form" :rules="rules" label-width="0px" class="login_form" @submit.native.prevent>
                <el-form-item prop="username">
                    <el-input  v-model="form.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="form.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login()" native-type="submit">登陆</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                // 规则名要和表单名一样
                username: [
                    { required: true, message: '请输入用户名', triggle: 'blur' },
                    { min: 3, max: 10, message: '长度3到10个字符', triggle: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', triggle: 'blur' },
                    { min: 6, max: 16, message: '长度6到16个字符', triggle: 'blur' }
                ]
            }
        }
    },
    methods: {
        resetForm () {
            this.$refs.formRef.resetFields()
        },
        login () {
            this.$refs.formRef.validate(async valid => {
                if (!valid) return
                // 直接返回是promise， 需要添加 await， await 需要 async修饰
                // { data: res }  解构返回数据， data 负值给res
                const { data: res } = await this.$http.post('login', this.form)
                console.log(res)
                if (res.meta.status !== 200) return this.$message.error('登陆失败')
                this.$message.success('登陆成功')

                window.sessionStorage.setItem('token', res.data.token)
                this.$router.push('/home')
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    height: 300px;
    width: 450px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>
