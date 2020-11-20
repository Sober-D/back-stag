<template>
  <div id="App">
    <el-dialog
      title="修改用户信息"
      :visible.sync="editPopUpShow"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :rules="rules" hide-required-asterisk :model="editList" class="user_form" label-width='70px'>
        <!-- 用户名部分 -->
        <el-form-item label='用户名' prop="username">
          <el-input :disabled="true" maxlength='6' v-model="editList.username" prefix-icon="el-icon-user" placeholder="用户名"></el-input>
        </el-form-item>
        <!-- 邮箱部分 -->
        <el-form-item label='邮箱' prop="email">
          <el-input maxlength='18' type="email" v-model="editList.email" prefix-icon="el-icon-message" placeholder="邮箱"></el-input>
        </el-form-item>
        <!-- 手机部分 -->
        <el-form-item label='手机' prop="mobile">
          <el-input maxlength='18' type="mobile" v-model="editList.mobile" prefix-icon="el-icon-mobile-phone" placeholder="手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editClose">取消</el-button>
        <el-button type="primary" @click="editUsers">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    editPopUpShow: {
      type: Boolean,
      default: false
    },
    editList:{
      type: Object
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
      // 表单验证
      rules: {
        // 邮箱验证
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        // 手机验证
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
      },
    };
  },
  computed: {},
  methods: {
    editUsers(){
      this.$refs.ruleForm.validate(async valid => {
        if( !valid ) return;
        const { data:res } = await this.$axios.put(`users/${this.editList.id}`,{ email:this.editList.email, mobile:this.editList.mobile });
        if( res.meta.status !== 200 ){
          this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        console.log(res,'修改用户数据');
        this.$emit('editUsers',this.editPopUpShow);
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        this.$emit('editClose',this.editPopUpShow);
      })
      .catch(_ => {});
    },
    editClose() {
      this.$emit('editClose',this.editPopUpShow);
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