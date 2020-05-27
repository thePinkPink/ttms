<template>
  <Content id="movieContent">
    <Menu id="menu" mode="horizontal" style="z-index:100" :active-name="activeName">
      <MenuItem name="1" to="showing" replace>
        <Icon type="ios-paper"/>正在热映
      </MenuItem>
      <MenuItem name="2" to="commingsoon" @click="changeAName('2')" replace>
        <Icon type="ios-people"/>即将上映
      </MenuItem>
    </Menu>
    <router-view></router-view>
  </Content>
</template>
<script>

export default {
  data() {
    return {
      activeName: '1'
    }
  },
  methods: {
    changeAName(name) {
      this.activeName = name
    }
  },
  mounted() {
    var array = this.$route.path.split('/');
    if(array[3] == 'commingsoon') {
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
