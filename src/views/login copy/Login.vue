<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-body">
      <div class="logo"></div>
      <div class="dx-fieldset-header">Đăng nhập</div>
      <div class="input-container">
        <DxTextBox
          label="Email"
          label-mode="static"
          class="input-field"
          v-model:value="username"
        >
          <DxValidator>
            <DxValidationRule
              type="required"
              message="Email không được để trống"
            />
            <DxValidationRule
              type="email"
              message="Email không đúng định dạng"
            />
          </DxValidator>
          <div class="input-field-icon icon-email"></div>
        </DxTextBox>
        <DxTextBox
          v-model:value="password"
          label="Password"
          label-mode="static"
          class="input-field"
          mode="password"
        >
          <DxValidator>
            <DxValidationRule
              type="required"
              message="Password không được để trống"
            />
          </DxValidator>
          <div class="input-field-icon icon-password"></div>
        </DxTextBox>
        <DxButton
          width="100%"
          :use-submit-behavior="true"
          text="Đăng nhập"
          type="default"
        />
      </div>
    </div>
  </form>
</template>

<script>
import store from "@/store";
import DxButton from "devextreme-vue/button";
import DxValidator, { DxValidationRule } from "devextreme-vue/validator";
import DxTextBox from "devextreme-vue/text-box";

export default {
  components: {
    DxTextBox,
    DxValidator,
    DxValidationRule,
    DxButton,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    async handleSubmit() {
      const user = { Username: this.username, Password: this.password };
      localStorage.setItem("user", JSON.stringify(user));
      try {
        // Gọi action login trong store để thực hiện yêu cầu đăng nhập
        await store.dispatch("auth/login", user);

        // Chuyển hướng đến trang Dashboard sau khi đăng nhập thành công
        this.$router.push("/");
      } catch (error) {
        // console.error(error)
        // Hiển thị thông báo lỗi đăng nhập
      }
    },
  },
};
</script>
<style scoped lang="scss">
aside {
  display: none;
}
#content-header {
  display: none;
}
.content {
  height: 100vh;
  width: 100vw;
}
form {
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  justify-content: center;
  top: 0;
  left: 0;

  .dx-fieldset-header {
    text-align: center;
    font-size: 20px;
  }
  .logo {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    background: url("@/assets/logoUniversity.png") no-repeat;
    background-size: contain;
    margin-bottom: 20px;
  }
  .input-container {
    width: 100%;
  }
  .form-body {
    width: 400px;
    height: 400px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 40px;
    background-color: #fff;
  }
  .input-field {
    height: 40px;
    position: relative;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 30px;

    .input-field-icon {
      position: absolute;
      width: 20px;
      height: 20px;
      z-index: 1;
      margin-left: -20px;
      background: url("@/assets/images/Icon_process.2df8445b.svg") no-repeat;

      &.icon-email {
        background-position: -156px -205px;
      }
      &.icon-password {
        background-position: -204px -229px;
      }
    }
  }
}
</style>
