<template>
  <div id="App">
    <!-- 面包屑部分开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑部分结束 -->
    <!-- 内容部分开始 -->
    <el-card>
      <el-button type='primary'>添加角色</el-button>
      <el-table :data='rolesList' border>
        <el-table-column type='expand'>
          <template slot-scope="scope">
            <pre>{{ scope.row.children }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="#" type='index'></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type='primary' icon='el-icon-edit' size='mini'>编辑</el-button>
            <el-button type='danger' icon='el-icon-delete' size='mini'>删除</el-button>
            <el-button type='warning' icon='el-icon-setting' size='mini'>分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 内容部分结束 -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      rolesList:[], // 角色列表数据
      active: 2,
    };
  },
  computed: {},
  methods: {
    /**
     * 获取角色列表数据
     * @param 
     * @returns 
     * from zhaojian@51talk.com
     */
    async getRolesList(){
      const { data:res } = await this.$axios.get('roles');
      if( res.meta.status == 200 ){
        this.rolesList = res.data;
      }else{
        this.$message.error(res.meta.msg);
      }
      console.log(res,'角色列表数据');
    }
  },
  created() {
    // 调用获取角色列表数据方法
    this.getRolesList();
  },
  mounted() {},
};
</script>
<style lang='less' scoped>
</style>