<template>
  <div>
    <!-- 面包屑部分开始 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑部分结束 -->
    <!-- 内容部分开始 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column label="#" type='index'></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level=='0'">一级</el-tag>
            <el-tag v-if="scope.row.level=='1'" type="success">二级</el-tag>
            <el-tag v-if="scope.row.level=='2'" type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 内容部分结束 -->
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      rightsList:[], // 权限数据列表
    };
  },
  computed: {},
  methods: {
    /**
     * 获取数据列表
     * @param type
     * @returns 
     * from zhaojian@51talk.com
     */
    async getRights(){
      const { data:res } = await this.$axios.get('rights/list');
      this.rightsList = res.data;
      console.log(res,'权限列表数据');
      if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
    }
  },
  created() {
    this.getRights();
  },
  mounted() {},
};
</script>
<style lang='less' scoped>

</style>