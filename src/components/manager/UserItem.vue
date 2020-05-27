<template>
  <div style="display: inline-block;">
    <Button type="primary" size="small" @click="modal1 = true">查看</Button>
    <Modal v-model="modal1" :title="item1.UserId">
      <Form ref="item1" :model="item1" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="userName" style="margin-top:25px;">
          <Input v-model="item1.userName" placeholder="User Name" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="item1.email" placeholder="email" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="手机号" prop="phoneNum">
          <Input v-model="item1.phoneNum" placeholder="phoneNum" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="创建日期" prop="createDate">
          <Input v-model="item1.createDate" placeholder="createDate" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem label="更新日期" prop="updateDate">
          <Input v-model="item1.updateDate" placeholder="updateDate" :disabled="!add&&disabled"></Input>
        </FormItem>
        <FormItem>
          <div style=" display:flex; flex-wrap: wrap;">
            <div v-for="seat in item1.seats" class="seat" :style="seatStatus[seat.status]">
              <svg class="icon" aria-hidden="true" @click="choose(item)">
                <use xlink:href="#iconkexuanzuobiankuang"></use>
              </svg>
            </div>
          </div>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      item1: {},
      disabled: true,
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "影厅名不能为空",
            trigger: "blur"
          }
        ],
        phoneNum: [
          {
            required: true,
            message: "行不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "列不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    item: Object,
    add: Boolean
  },
  mounted() {
    if (this.item) {
      this.item1 = { ...this.item };
    }
  },
  methods: {
  }
};
</script>
<style lang="less" scoped>
</style>
