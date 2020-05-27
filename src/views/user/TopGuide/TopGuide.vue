<template>
  <Content id="topContent">
    <Menu id="menu" mode="horizontal" style="z-index: 100" :active-name="activeName">
      <MenuItem name="1" to="showing" replace>
        <Icon type="ios-paper"/>热映榜
      </MenuItem>
      <MenuItem name="2" to="score" replace>
        <Icon type="ios-people"/>口碑榜
      </MenuItem>
    </Menu>
    <router-view></router-view>
  </Content>
</template>
<script>
export default {
  data(){
    return {
      activeName:''
    }
  },
  mounted() {
    var array = this.$route.path.split('/');
    if(array[3] == 'score') {
      this.activeName = '2';
    } else {
      this.activeName = '1';
    }
  }
};
</script>
<style lang="less" scoped>
#menu {
    display: flex;
    justify-content: center;
}
</style>
