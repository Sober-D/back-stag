<template>
  <div id="App">
    <!-- <h3>订单列表</h3> -->
    <div class="block">
    <p>使用 render-content</p>
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
  </div>
  </div>
</template>

<script>
let id = 1000;
const data = [
  {
    id: 1,
    label: "一级 1",
    children: [
      {
        id: 4,
        label: "二级 1-1",
        children: [
          {
            id: 9,
            label: "三级 1-1-1",
          },
          {
            id: 10,
            label: "三级 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "一级 2",
    children: [
      {
        id: 5,
        label: "二级 2-1",
      },
      {
        id: 6,
        label: "二级 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "一级 3",
    children: [
      {
        id: 7,
        label: "二级 3-1",
      },
      {
        id: 8,
        label: "二级 3-2",
      },
    ],
  },
];
export default {
  components: {},
  data() {
    return {
      data: data
    };
  },
  computed: {},
  methods: {
    append(data) {
      const newChild = { id: id++, label: "分类", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <i 
              class="el-icon-circle-plus-outline"
              on-click={() => this.append(data)}
            ></i>
            <i 
              class="el-icon-edit-outline"
            ></i>
            <i 
              class="el-icon-delete"
              on-click={() => this.remove(node, data)}
            ></i>
          </span>
        </span>
      );
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang='less' scoped>
  .block {
    width: 300px;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      span {
        
      }
    }
  }
</style>
