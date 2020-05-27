<template>
  <Content class="content" id="PersonalContent" style="min-height:800px;">
    <div id="personalLeft">
      <div class="demo-avatar">
        <Avatar icon="ios-person" :src="$store.state.nowUser.image" size="large"/>
      </div>
      <p class="name">{{$store.state.nowUser.userName}}</p>
      <div id="functionalSelection">
        <div>
          <router-link to="order">我的订单</router-link>
        </div>
        <div>
          <router-link to="formation">我的资料</router-link>
        </div>
        <div>
          <router-link to="CPassword">修改密码</router-link>
        </div>
      </div>
    </div>
    <div id="personalRight">
      <router-view></router-view>
    </div>
  </Content>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.content {
  width: 1320px;
  margin: 0 auto;
  //padding: 0 60px;
  display: flex;
  background-color: #fff;
}
#personalLeft {
  flex: 2;
  background-color: rgb(81, 90, 110);
  padding: 60px 0;
  text-align: center;
  color: #fff;
}
#personalLeft a {
  color: #fff;
}
#personalLeft .ivu-avatar-large {
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 60px;
}
#personalLeft .name {
  margin-top: 10px;
  font-size: 25px;
  font-weight: 500;
}
#functionalSelection {
  margin-top: 80px;
}
#functionalSelection div {
  height: 50px;
  line-height: 50px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}
#personalRight {
  flex: 7;
  padding: 60px;
}
</style>
