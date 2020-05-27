<template>
<div>
  <StudioItem :add="true" v-on:headCallBack="headCall"></StudioItem>
  <ManagerTable :table="table"></ManagerTable>
</div>
  
</template>
<script>
import ManagerTable from "../../../components/manager/ManagerTable";
import StudioItem from "../../../components/manager/StudioItem";

export default {
  data() {
    return {
      table: {
        col: [
          {
            type: "id",
            key: "studioId"
          },
          {
            title: "名称",
            key: "studioName"
          },
          {
            title: "行",
            key: "rowsCount"
          },
          {
            title: "列",
            key: "colsCount"
          },
          {
            title: "Action",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(StudioItem, {
                  props: {
                    item: params.row
                  }
                }),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.remove(params.index, params.row.studioId);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ]
      }
    };
  },
  components: {
    ManagerTable,
    StudioItem
  },
  methods: {
    remove(index, id) {
      this.table.list.splice(index, 1);
      let _this = this;
      let url = "http://manage.ptt.com/studio/delete/" + id;
      axios
        .delete(url)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    headCall: function (msg) { //回调方法，接收子组件传的参数
      this.table.list.unshift(msg);
    }
  },
  created() {
    let _this = this;
    axios
      .get("http://manage.ptt.com/studio/query/list")
      .then(function(response) {
         response.data.forEach(element => {
          element.studioId = element.studioId.toString();
        });
        _this.$set(_this.table, "list", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style lang="less" scoped>
</style>
