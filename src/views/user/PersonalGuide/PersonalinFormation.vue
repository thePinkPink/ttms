<template>
  <Form ref="formDate" :model="formDate" :rules="ruleValidate" :label-width="80">
    <FormItem id="a" label="头像" prop="img">
      <Avatar icon="ios-person" size="large" :src="formDate.image" shape="square"/>
      <Upload
        action="http://manage.ptt.com/pic/upload"
        name="uploadFile"
        :on-success="changeImg"
        :show-upload-list="false"
        v-if="!disabled"
      >
        <Button icon="ios-cloud-upload-outline">修改头像</Button>
      </Upload>
    </FormItem>
    <FormItem label="Name" prop="userName">
      <Input
        v-model="formDate.userName"
        placeholder="Enter your name"
        :disabled="disabled"
      ></Input>
    </FormItem>
    <FormItem label="E-mail" prop="email">
      <Input v-model="formDate.email" placeholder="Enter your e-mail" disabled></Input>
    </FormItem>
    <FormItem label="PhoneNum" prop="phoneNum">
      <Input v-model="formDate.phoneNum" placeholder="Enter your phoneNum" :disabled="disabled"></Input>
    </FormItem>
    <FormItem v-if="!disabled">
      <Button type="primary" @click="handleSubmit('formDate')">提交</Button>
      <Button @click="handleReset('formDate')" style="margin-left: 8px">重置</Button>
    </FormItem>
    <FormItem v-if="disabled">
      <!-- <Button type="primary" @click="changeFormDate()">修改个人信息</Button> -->
    </FormItem>
  </Form>
</template>
<script>

import api from '../../../api/api';

export default {
  data() {
    return {
      formDate: {},
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 20,
            message: "用户名长度为6-20",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "E-mail 不能为空",
            trigger: "blur"
          },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ],
        phoneNum: [
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ]
      },
      disabled: true
    };
  },
  methods: {
    handleSubmit(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .get("http://sso.ptt.com/user/token/" + api.cookie.get("PTT_TOKEN"))
            .then(function(response) {
              console.log(_this.formDate.userName);
              let id = response.data.userId;
              axios
                .post("http://sso.ptt.com/user/update/"+ api.cookie.get("PTT_TOKEN"),{
                  userId: id,
                  userName: _this.formDate.userName,
                  image: _this.formDate.image,
                  phoneNum : _this.formDate.phoneNum
                })
                .then(function(response) {
                  console.log(response);
                  if(response.status == 200) {
                    console.log(_this.$store.state.nowUser)
                    _this.$store.state.nowUser = response.data.user;
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            })
            .catch(function(error) {
              console.log(error);
            });

          this.$Message.success("Success!");
          this.disabled = true;
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    changeFormDate() {
      this.disabled = false;
    },
    changeImg(res, file) {
      console.log(res);
      this.formDate.image = res.url;
    }
  },
  mounted() {
    let _this = this
    //this.formDate = this.$store.state.user.nowUser;
    console.log(this.formDate);
     axios
            .get("http://sso.ptt.com/user/token/" + api.cookie.get("PTT_TOKEN"))
            .then(function(response) {
              _this.formDate = response.data;
              
              console.log(_this.formDate);
            })
            .catch(function(error) {
              console.log(error);
            });
  }
};
</script>
<style lang="less" scoped>
.ivu-avatar-large {
  width: 120px;
  height: 120px;
  line-height: 120px;
}

.ivu-upload {
  display: inline-block;
  margin-left: 20px;
}
</style>

