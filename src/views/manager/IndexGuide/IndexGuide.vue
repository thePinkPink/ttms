<template>
  <Content :style="{padding: '24px 0', minHeight: '800px', background: '#fff',margin: '16px 0'}">
    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu :active-name="activeName" theme="light" width="auto" :open-names="['1']">
          <MenuItem name="1" to="/manager/index/movie">电影管理</MenuItem>
          <MenuItem name="2" to="/manager/index/studio">影厅管理</MenuItem>
          <MenuItem name="3" to="/manager/index/schedule">演出计划管理</MenuItem>
          <MenuItem name="4" to="/manager/index/user">用户管理</MenuItem>
        </Menu>
      </Sider>
      <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
        <router-view></router-view>
      </Content>
    </Layout>
  </Content>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1"
    };
  },
  mounted() {
    var array = this.$route.path.split("/");
    console.log(array);
    if (array[3] == "studio") {
      this.activeName = "2";
    } else if (array[3] == "schedule") {
      this.activeName = "3";
    } else if (array[3] == "user") {
      this.activeName = "4";
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>