<template>
  <div>
    <Button style="flex:1" type="text" @click="modal1 = true">查看详情</Button>
    <Modal v-model="modal1" title="票页详情">
      <img :src="url">
      <div slot="footer">
        <Button @click="del()" >退票</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Stats } from "fs";
export default {
  data() {
    return {
      modal1: false,
      meg:{},
      url: ''
    };
  },
  props: {
    ticketId: String,
    item: Object
  },
  methods: {
    // ok() {
    //   this.$Message.info("Clicked ok");
    // },
    // cancel() {
    //   this.$Message.info("Clicked cancel");
    // }
    
  },
  mounted() {
    let _this = this;
    axios
      .get("http://manage.ptt.com/ticket/query/5e7b064de2fe419ea986ea631696d6a2",{
          text: this.ticketId
      })
      .then(function(response) {
        console.log(response);
        _this.meg = response.data;
        _this.url =  'http://qr.liantu.com/api.php?'+ 'text=' + '电影名:' + response.data.schedule.movie.movieName + '%0A影厅:'+ response.data.schedule.studio.studioName + '%0A行:' + response.data.schedule.studio.rowsCount + '列:' + response.data.schedule.studio.colsCount;
        console.log(_this.url)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
