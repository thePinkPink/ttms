<template>
  <div id="login">
    <Card :bordered="false">
      <p slot="title">登录</p>
      <Form ref="formInline" :model="formInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (
            this.formInline.user == "admin" &&
            this.formInline.password == "admin"
          ) {
            this.$Message.success("Success!");
            this.$router.push({ path: "/manager/index/movie" });
          } else {
            this.$Message.error("用户名或密码错误");
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>

<style <style lang="less" scoped>
#login {
  width: 800px;
  margin: 200px auto;
}
</style>
