<template>
  <div>
    <p class="title">我的订单</p>
    <OrderItem v-for="(item,index) in OrderList" :item="item" :index="index"></OrderItem>
  </div>
</template>
<script>
import OrderItem from "../../../components/user/ContentGuide/OrderItem";

import api from "../../../api/api";

export default {
  data() {
    return {
      item: null,
      index:0,
      OrderList:[]
    };
  },
  components: {
    OrderItem
  },
  mounted() {
    let _this = this;
    let a = this.$store.state.user;
    axios
      .get("http://sso.ptt.com/user/token/" + api.cookie.get("PTT_TOKEN"))
      .then(function(response) {
        let value = response.data;
        axios
          .get("http://order.ptt.com/order/query/" + parseInt(value.userId))
          .then(function(response) {
            console.log(response);
            _this.OrderList= response.data.lists
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style lang="less" scoped>
.title {
  font-size: 22px;
  border-bottom: 1px solid rgb(245, 247, 249);
  margin-bottom: 15px;
}
</style>
