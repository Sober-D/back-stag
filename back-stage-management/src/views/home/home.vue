<template>
  <!-- 列表头部开始 -->
  <el-container class="box">
    <el-header height='60px'>
      <div class="header_left">
        <img src="@/assets/dark_house.jpg" alt="" />
        <span>后台管理系统</span>
      </div>
      <div class="header_right">
        <el-button @click="signOut" size="small" type="info">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="menuShow ? '64px' : '200px  '">
        <div class="toggle" @click="toggleShow">|||</div>
        <el-menu
          :collapse-transition='false'
          :collapse='menuShow'
          :unique-opened='true'
          :default-active='$route.path'
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :router='true'
        > 
          <!-- 一级菜单部分开始 -->
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id  + ''">
            <!-- 一级菜单模板区域开始 -->
            <template slot="title">
                <!-- 一级菜单图标 -->
              <i :class="iconList[item.id]"></i>
              <!-- 一级菜单标题 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 一级菜单模板区域结束 -->
            <!-- 二级菜单部分开始 -->
            <el-menu-item v-for="v in item.children" :key="v.id" :index="'/' + v.path">
              <!-- 二级菜单模板区域开始 -->
              <template slot="title">
                <!-- 二级菜单图标 -->
                <i class="el-icon-menu"></i>
                <!-- 二级菜单标题 -->
                <span>{{v.authName}}</span>
              </template>
              <!-- 二级菜单模板区域结束 -->
            </el-menu-item>
            <!-- 二级菜单部分结束 -->
          </el-submenu>
          <!-- 一级菜单部分结束 -->
        </el-menu>
      </el-aside>
      <el-main :style="{left: menuShow ? '64px' : '200px'}">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- 列表头部结束 -->
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuList:{}, // 左侧列表数据
      iconList:{
          '125': 'el-icon-user-solid',
          '103': 'el-icon-platform-eleme',
          '101': 'el-icon-s-goods',
          '102': 'el-icon-s-order',
          '145': 'el-icon-s-platform'
      }, //一级菜单图标列表
      menuShow: false, // menu菜单是否折叠
    };
  },
  computed: {},
  methods: {
    // 退出管理系统
    signOut() {
      this.$confirm("确定退出后台管理系统吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            sessionStorage.removeItem("token");
            this.$router.push("/");
            this.$message({
            type: "success",
            message: "成功退出",
            });
        })
        .catch(() => {
            this.$message({
            type: "info",
            message: "取消退出",
            });
        });
    },
    // 请求列表数据
    async getMenuList(){
        const { data:res } = await this.$axios.get('menus');
        if(res.meta.status!==200) return this.$message.error(res.meta.msg);
        this.menuList = res.data;
        // console.log(res,'左侧菜单列表');
    },
    // menu菜单栏折叠
    toggleShow(){
        this.menuShow = !this.menuShow;
    },
  },
  created() {
    // 调用获取菜单栏数据方法
    this.getMenuList();
  },
  mounted() {},
};
</script>
<style lang='less' scoped>
.box {
  height: 100%;
}
// 头部样式开始
.el-header {
  width: 100%;
  background: #373d41;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 0;
  box-sizing: border-box;
  align-items: center;
  // 头部左侧样式开始
  .header_left {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      background: #000;
      border-radius: 50%;
    }
    span {
      font-size: 18px;
      color: white;
      margin-left: 10px;
    }
  }
  // 头部左侧样式结束
}
// 头部样式结束
// 左侧样式开始
.el-aside {
  background: #333744;
  color: white;
  position: relative;
  // 顶部切换样式开始
  .toggle{
      width: 100%;
      text-align: center;
      font-size: 10px;
      letter-spacing: 0.1em;
      height: 24px;
      line-height: 24px;
      cursor: pointer;
      background: #4a5064;
  }
  // 顶部切换样式结束
  // menu菜单样式开始
  .el-menu{
    border-right: none;
  }
  // menu菜单样式结束
}
// 左侧样式结束
//中间样式开始
.el-main {
  background: #EAEDF1;
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
}
//中间样式结束
</style>