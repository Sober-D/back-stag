<template>
  <div id="App">
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :rules="rules" :model="addForm" class="user_form" label-width='70px'>
        <!-- 用户名部分 -->
        <el-form-item label='用户名' prop="username">
          <el-input maxlength='6' v-model="addForm.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <!-- 密码部分 -->
        <el-form-item label='密码' prop="password">
          <el-input maxlength='18' type="password" v-model="addForm.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
        </el-form-item>
        <!-- 邮箱部分 -->
        <el-form-item label='邮箱' prop="email">
          <el-input maxlength='18' type="email" v-model="addForm.email" prefix-icon="el-icon-message" placeholder="邮箱"></el-input>
        </el-form-item>
        <!-- 手机部分 -->
        <el-form-item label='手机' prop="mobile">
          <el-input maxlength='18' type="mobile" v-model="addForm.mobile" prefix-icon="el-icon-mobile-phone" placeholder="手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="addUsers">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 邮箱验证规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if(regEmail.test(value)) {
        return cb();
      }
      cb(new Error('请输入正确的邮箱格式'));
    }
    // 手机号验证规则
    var checkMobile = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regMobile = /^(0|86|179 51)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if(regMobile.test(value)) {
        return cb();
      }
      cb(new Error('请输入正确的手机号格式'));
    }
    return {
      // 表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
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
        ],
        // 邮箱验证
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        // 密码验证
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
      },
    };
  },
  computed: {
  },
  methods: {
    addUsers(){
      this.$refs.ruleForm.validate(async valid => {
        if( !valid ) return;
        const { data:res } = await this.$axios.post('users',this.addForm);
        if( res.meta.status !== 201 ){
          this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        console.log(res,'添加用户');
        this.$emit('addUsers',this.addForm);
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        this.$emit('close',this.dialogVisible);
      })
      .catch(_ => {});
    },
    close() {
      this.$emit('close',this.dialogVisible);
    },
  },
  created() {
    
  },
  mounted() {
    
  },
};
</script>
<style lang='less' scoped>
</style>