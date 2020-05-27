<template>
  <div>
    <div @click="modal1 = true">
      <div class="demo-avatar">
        <Avatar icon="ios-person"/>
      </div>
    </div>
    <Modal v-model="modal1" title="登录">
      <div id="login">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="userName">
            <Input type="text" v-model="formInline.userName" placeholder="Username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button @click="handleSubmit('formInline')" type="primary">Sign In</Button>
          </FormItem>
        </Form>
        <p style="overflow: hidden;">
          <router-link to="register" style="float:right;" @click.native="f">去注册</router-link>
        </p>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>

import api from "../../../api/api"

export default {
  data() {
    return {
      modal1: false,
      formInline: {
        userName: "",
        password: ""
      },
      ruleInline: {
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          // {
          //   type: "string",
          //   min: 6,
          //   message: "The password length cannot be less than 6 bits",
          //   trigger: "blur"
          // }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          axios
            .post("http://sso.ptt.com/user/login", _this.formInline)
            .then(function(response) {
              console.log(response);
              if (response.data.status == 0) {
                //console.log(api.cookie)
                api.cookie.set('PTT_TOKEN',response.data.PTT_TOKEN, 30)
                _this.$store.dispatch('SignIn',api.cookie.get('PTT_TOKEN'));
                _this.$Message.success("登陆成功");
              } else {
                _this.$Message.error("用户名或密码错误!");
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    f() {
      this.modal1 = false;
    }
  }
};
</script>
