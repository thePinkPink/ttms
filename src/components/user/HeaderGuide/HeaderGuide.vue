<template>
  <Header id="indexHeader">
    <Menu id="indexMenu" mode="horizontal" theme="dark" active-name="1">
      <router-link to="/theater/index">
        <div class="layout-logo"></div>
      </router-link>
      <div class="layout-nav">
        <!-- <MenuItem name="2">
          <Input search width="50px" placeholder="Enter something..."/>
        </MenuItem> -->
        <MenuItem name="1" to="/theater/index">
          <Icon type="ios-navigate"></Icon>首页
        </MenuItem>
        <MenuItem name="2" to="/theater/movie">
          <Icon type="ios-keypad"></Icon>电影
        </MenuItem>
        <MenuItem name="3" to="/theater/top">
          <Icon type="ios-analytics"></Icon>榜单
        </MenuItem>
        <Submenu name="4" v-if="$store.state.user.islog">
          <template slot="title">
            <Icon type="ios-stats"/>个人中心
          </template>
            <MenuItem name="5-1" to="/theater/personal">我的订单</MenuItem>
            <MenuItem name="5-2" to="/theater/personal/formation">个人信息</MenuItem>
            <MenuItem name="5-3" @click.native="signOut()">退出登陆</MenuItem>
        </Submenu>
        <MenuItem name="5" v-if="!$store.state.user.islog">
          <login></login>
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>
<script>

import login from './login'
import api from "../../../api/api"

export default {
  data(){
    return {

    }
  },
  components: {
    login
  },
  methods:{
    signOut() {
      api.cookie.delete('PTT_TOKEN');
      this.$store.dispatch('SignOut');
    }
  }
};
</script>
<style lang="less" scoped>
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 700px;
  margin: 0 auto;
  //float: right;
  margin-right: 20px;
}

</style>

