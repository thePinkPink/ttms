<template>
  <div class="orderItem" style="margin: 0 0 20px;">
    <div class="orderItemTop" style="display:flex;">
      <span style="flex:5;font-size:16px">{{ item.updateTime }}</span>
      <span style="flex:12">订单号:{{ item.orderId }}</span>
      <Button style="flex:1" type="text" @click="delS()">删除</Button>
    </div>
    <div class="orderItemContent" v-for="item2 in item.orderItems">
      <img style="flex:1" :src="item2.movieImg">
      <div style="flex:5">
        <p style="font-size:16px;color:black;">《{{ item2.movieName }}》</p>
        <p>{{ item2.row }}排{{ item2.column }}座</p>
        <!-- <p style="color: red;">周五 4月26日 15:40</p> -->
      </div>
      <div style="flex:1">￥{{ item.totalPrice }}</div>
      <div style="flex:1">{{status[item.status]}}</div> 
      <qrCode :ticketId="item2.ticketId"></qrCode>
      <Button @click="delT(item2.ticketId)">退票</Button>
    </div>
  </div>
</template>
<script>
import qrCode from "../../../components/user/ContentGuide/qrCode";
export default {
  data() {
    return {
      status: {
        1: "未付款",
        2: "已付款",
        3: "已退票"
      },
      ticketId: "",
      del: true
    };
  },
  props: {
    item: Object
  },
  mounted() {
    console.log(this.item);
    let data1 = new Date(this.item.updateTime);
    this.item.updateTime =
      data1.toLocaleDateString().replace(/\//g, "-") +
      " " +
      data1.toTimeString().substr(0, 5);
  },
  components: {
    qrCode
  },
  methods: {
    delS() {
      let _this = this;
      console.log(this.item);
      axios
        .delete(
          "http://order.ptt.com/order/delete/" +
            _this.item.userId +
            "/" +
            _this.item.orderId
        )
        .then(function(response) {
          //console.log(response);
          _this.$router.go(0);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    delT(tic) {
      let _this = this;
      // _thi.sitem2.ticketId;
      axios
        .get(
          "http://manage.ptt.com/ticket/update/" + tic + '/1'
        )
        .then(function(response) {
          // console.log(response);
          if(response.data.msg == 200) {
            _this.$Message.success("退票成功!");
          }
         // _this.$router.go(0);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.orderItem {
  padding: 0 10px;
  font-size: 17px;
  border: 1px solid rgb(245, 247, 249);
}
.orderItemTop {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(245, 247, 249);
}
.orderItemContent {
  padding: 22px;
  vertical-align: middle;
  text-align: center;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgb(153, 153, 153);
}
.orderItemContent img {
  width: 66px;
}
</style>

