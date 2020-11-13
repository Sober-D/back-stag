<template>
  <div id="App">
    <!-- 登录部分 -->
      <div class="login">
        <!-- 用户头像部分 -->
        <div class="user_head">
          <img src="@/assets/logo.png" alt="">
        </div>
        <!-- 用户头像部分结束 -->
        <!-- 登录表单部分 -->
        <el-form ref="ruleForm" :rules="rules" :model="form" class="login_form">
          <!-- 用户名部分 -->
          <el-form-item prop="username">
            <el-input maxlength='6' v-model="form.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
          </el-form-item>
          <!-- 密码部分 -->
          <el-form-item prop="password">
            <el-input maxlength='18' type="password" v-model="form.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="loginForm" size='small' type="primary">登录</el-button>
            <el-button @click="resetForm" size='small' type="info">重置</el-button>
          </el-form-item>
           
        </el-form>
        <!-- 登录表单部分结束 -->
      </div>
    <!-- 登录部分结束 -->

  </div>
</template>

<script>

export default {
  name: 'login',
  components: {},
  data() {
    return {
      // 表单数据
      form: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证
      rules: {
        // 用户名验证
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        // 密码验证
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    };
  },  
  computed: {},
  methods: {
    // 重置
    resetForm(){
      this.$refs.ruleForm.resetFields();
    },
    // 登录
    loginForm(){
      this.$refs.ruleForm.validate((valid) => {
        if(valid){
          this.$axios.post('login',this.form).then(res => {
            if(res.data.meta.msg=='登录成功'){
              console.log(res,'login');
              this.$message.success(res.data.meta.msg);
              sessionStorage.setItem('token', res.data.data.token);
              this.$router.push('/home');
            }else{
              this.$message.error(res.data.meta.msg)
            }
          })
        }else {
          return false;
        }
      })
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='less' scoped>
#App{
  width: 100%;
  min-height: 100vh;
  background: #2b4b6b;
  // 登录样式开始
  .login{
    width: 450px;
    height: 300px;
    background: white;
    position: absolute;
    border-radius: 3px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    // 用户头像样式开始
    .user_head{
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      box-shadow: 0 0 10px #ddd;
      padding: 10px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      background: white;
      img{
        display: block;
        width: 100%;
        height: 100%;
        background: #eee;
        border-radius: 50%;
      }
      // img:focus{
      //   background: #000;
      // }
    }
    // 用户头像样式结束
    // 登录表单样式开始
    .login_form{
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
    }
    // 登录表单样式结束
  }
  // 登录样式结束
}
</style>