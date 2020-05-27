<template>
<div>
  <ManagerTable :table="table"></ManagerTable>
</div>
  
</template>
<script>
import ManagerTable from "../../../components/manager/ManagerTable";
import UserItem from "../../../components/manager/UserItem";

export default {
  data() {
    return {
      table: {
        col: [
          {
            type: "id",
            key: "userId"
          },
          {
            title: "用户名",
            key: "userName"
          },
          {
            title: "邮箱",
            key: "email"
          },
          {
            title: "手机号",
            key: "phoneNum"
          },
          {
            title: "创建日期",
            key: "createDate"
          },
          {
            title: '更新日期',
            key: 'updateDate'
          },
          {
            title: "Action",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(UserItem, {
                  props: {
                    item: params.row
                  }
                }),
                
              ]);
            }
          }
        ]
      }
    };
  },
  components: {
    ManagerTable,
    UserItem
  },
  methods: {
    remove(index, id) {
      this.table.list.splice(index, 1);
      let _this = this;
      //let url = "http://manage.ptt.com/movie/delete/" + id;
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
      .get("http://sso.ptt.com/user/list")
      .then(function(response) {
         response.data.forEach(element => {
          element.userId = element.userId.toString();
          let date = new Date(element.createDate);
          let date2 = new Date(element.updateDate);
          date = date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8); 
          date2 = date2.toLocaleDateString().replace(/\//g, "-") + " " + date2.toTimeString().substr(0, 8); 
          element.createDate = date;
          element.updateDate = date2;
        });
        _this.$set(_this.table, "list", response.data);
        console.log(_this.table)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style lang="less" scoped>
</style>
