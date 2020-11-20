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
          <el-input placeholder="请输入内容" v-model="params.query"></el-input>
        </el-col>
        <el-col :span='8'>
          <el-button type='primary' @click="getUserList">搜索</el-button>
          <el-button type='primary' @click="clearUserList">重置</el-button>
          <el-button @click="addUser" type='primary'>添加用户</el-button>
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
        <el-table-column label='状态'>
          <template slot-scope="scope">
            <el-switch @change="userState(scope.row)" v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label='操作'>
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-tooltip :enterable='false' class="item" effect="dark" content="修改" placement="top">
              <el-button @click="editUser(scope.row.id)" type='primary' size='mini' icon='el-icon-edit'></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip :enterable='false' class="item" effect="dark" content="删除" placement="top">
              <el-button @click="delUser(scope.row.id)" type='danger' size='mini' icon='el-icon-delete'></el-button>
            </el-tooltip>
            <!-- 设置按钮 -->
            <el-tooltip :enterable='false' class="item" effect="dark" content="分配角色" placement="top">
              <el-button type='warning' size='mini' icon='el-icon-setting'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 用户列表部分结束 -->
      <!-- 分页部分开始 -->
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 分页部分结束 -->
      <!-- 添加用户弹框部分开始 -->
      <add-user-pop-up :dialogVisible='dialogVisible' @close='close' @addUsers='addUsers'></add-user-pop-up>
      <!-- 添加用户弹框部分结束 -->
      <!-- 修改用户弹框部分开始 -->
      <edit-user-pop-up :editList='editList' :editPopUpShow='editPopUpShow' @editClose='editClose' @editUsers='editUsers'></edit-user-pop-up>
      <!-- 修改用户弹框部分结束 -->
    </el-card>
    <!-- 内容部分结束 --> 
  </div>
</template>

<script>
import addUserPopUp from './userPopUp/addUserPopUp';
import editUserPopUp from './userPopUp/editUserPopUp'; 

export default {
  components: {
    addUserPopUp,
    editUserPopUp
  },
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
      total: 0, // 数据数量
      dialogVisible: false, // 控制添加用户弹框显示与隐藏
      editPopUpShow: false, // 控制修改数据弹框显示与隐藏
      editList:{}, // 修改的用户数据
    };
  },
  computed: {},
  methods: {
    // 获取用户列表数据
    async getUserList(){
      const { data:res } = await this.$axios.get('users',{ params: this.params });
      if(res.meta.status!==200) return this.$message.error(res.meta.msg);
      this.userList = res.data.users;
      this.total = res.data.total;
      console.log(res,'用户列表数据');
    },
    // 监听pageSize改变的事件
    handleSizeChange(newSize){
      // console.log(newSize);
      this.params.pagesize = newSize;
      this.getUserList();
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage){
      // console.log(newPage);
      this.params.pagenum = newPage;
      this.getUserList();
    },
    // 监听用户状态变化
    async userState(userInfo){
      // console.log(userInfo,'usereInfo');
      const { data:res } = await this.$axios.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
      if(res.meta.status!==200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      // console.log(res,'状态');
    },
    // 重置
    clearUserList(){
      this.params.query = '';
      this.getUserList();
    },
    // 点击取消关闭添加用户弹框方法
    close(){
      this.dialogVisible = false;
    },
    // 点击修改弹框中取消按钮隐藏修改弹框
    editClose(){
      this.editPopUpShow = false;
    },
    // 隐藏添加用户弹框，并调用数据列表更新数据
    async addUsers(){
      this.getUserList();
      this.dialogVisible = false;
    },
    // 隐藏修改用户弹框，并调用数据列表更新数据
    async editUsers(){
      this.getUserList();
      this.editPopUpShow = false;
    },
    // 添加用户弹框显示
    addUser(){
      // console.log(this.popUpType,'users');
      this.dialogVisible = true;
    },
    // 修改用户弹框显示
    async editUser(id){
      const { data:res } = await this.$axios.get(`users/${id}`);
      // console.log(res,'修改用户数据');
      this.editList = res.data;
      this.getUserList();
      this.editPopUpShow = true;
    },
    // 删除用户操作
    async delUser(id){
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err);
      // console.log(confirmResult);
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }
      const { data:res } = await this.$axios.delete(`users/${id}`);
      this.getUserList();
      if (res.meta.status == 200) return this.$message.success(res.meta.msg);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
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