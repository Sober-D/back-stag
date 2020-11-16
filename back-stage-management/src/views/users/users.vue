<template>
  <div id="App">
    <!-- 面包屑部分开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑部分结束 -->
    <!-- 内容部分开始 -->
    <el-card class="box-card">
      <!-- 搜索框部分开始 -->
      <el-row :gutter='20'>
        <el-col :span='8'>
          <el-input placeholder="请输入内容">  
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span='4'>
          <el-button type='primary'>添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 搜索框部分结束 -->
      <!-- 用户列表部分开始 -->
      <el-table :data='userList' border stripe>
        <el-table-column label='#' type='index'></el-table-column>
        <el-table-column label='姓名' prop='username'></el-table-column>
        <el-table-column label='邮箱' prop='email'></el-table-column>
        <el-table-column label='电话' prop='mobile'></el-table-column>
        <el-table-column label='角色' prop='role_name'></el-table-column>
        <el-table-column label='状态' prop='mg_state'></el-table-column>
        <el-table-column label='操作' prop=''></el-table-column>
      </el-table>
      <!-- 用户列表部分结束 -->
    </el-card>
    <!-- 内容部分结束 -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      path:'/home',
      // 接口参数
      params:{
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userList:[], // 接口数据
      total: '', // 数据数量
    };
  },
  computed: {},
  methods: {
    // 获取用户列表数据
    async getUserList(){
      const { data:res } = await this.$axios.get('users',{ params: this.params });
      if(res.meta.status!==200) return this.$message.error(res.meta.msg);
      this.userList = res.data.users;
      this.total = res.total;
      console.log(res,'用户列表数据');
    }
  },
  created() {
    // 调用获取用户列表数据的方法
    this.getUserList();
  },
  mounted() {},
};
</script>
<style lang='less' scoped>

</style>