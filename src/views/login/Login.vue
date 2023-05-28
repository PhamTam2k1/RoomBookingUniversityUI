<template>
  <div class="flex login">
    <div class="t-left"><div class="login-logo"></div></div>
    <div class="t-right">
      <form @submit.prevent="handleSubmit">
        <div class="form-body">
          <div class="logo"></div>
          <div class="dx-fieldset-header">Đăng nhập</div>
          <div class="input-container">
            <div class="mgb-8">Email</div>
            <DxTextBox
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
            <div class="mgb-8">Password</div>
            <DxTextBox
              v-model:value="password"
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
            <div class="error" v-if="error != ''">{{ error }}</div>
            <DxButton
              width="100%"
              :use-submit-behavior="true"
              text="Đăng nhập"
              type="default"
              class="mgt-16"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import DxButton from 'devextreme-vue/button'
import DxValidator, { DxValidationRule } from 'devextreme-vue/validator'
import DxTextBox from 'devextreme-vue/text-box'
export default {
  components: {
    DxTextBox,
    DxValidator,
    DxValidationRule,
    DxButton,
  },
  data() {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async handleSubmit() {
      const user = { Username: this.username, Password: this.password }
      localStorage.setItem('user', JSON.stringify(user))
      debugger
      try {
        // Gọi action login trong store để thực hiện yêu cầu đăng nhập
        await store.dispatch('auth/login', user)
        this.error = ''
        // Chuyển hướng đến trang Dashboard sau khi đăng nhập thành công
        if (localStorage.getItem('roleOption') - 0 === 3) {
          this.$router.push('/booking/booking-await')
        } else {
          this.$router.push('/')
        }
      } catch (error) {
        this.error = 'Tên đăng nhập hoặc mật khẩu không đúng!'
        // console.error(error)
        // Hiển thị thông báo lỗi đăng nhập
      }
    },
  },
}
</script>
<style scoped lang="scss">
aside {
  display: none;
}
.error {
  color: #e14242;
  font-size: 13px;
  font-family: 'Roboto';
}
#content-header {
  display: none;
}
.content {
  height: 100vh;
  width: 100vw;
}
.t-left {
  width: 50%;
  height: 100vh;
  // background: #f8fafb;
}
.t-right {
  width: 50%;
  height: 100vh;

  // background: #f8fafb;
}
.login {
  .logo {
    @media (min-width: 1568px) {
      margin-top: 165px;
    }
  }
  // border: 1px solid #ccc;
  // @media (min-width: 768px) {
  //   display: none !important;
  // }
}
.login-logo {
  // border-top: 1px solid #ccc;
  // border-bottom: 1px solid #ccc;
  // border-left: 1px solid #ccc;

  width: 100%;
  height: 77%;
  margin: 0 auto;
  background: url('@/assets/Scholl.png') no-repeat;
  background-size: contain;
  margin-top: 15%;
  margin-left: 150px;
}
form {
  margin: 0 auto;
  display: flex;
  height: 100vh;
  // margin-top: 180px;
  left: 0;
  margin-left: 103px;

  .dx-fieldset-header {
    text-align: center;
    font-size: 20px;
  }
  .logo {
    width: 130px;
    height: 130px;
    margin: 0 auto;
    background: url('@/assets/logoUniversity.png') no-repeat;
    background-size: contain;
    margin-bottom: 20px;
    margin-top: 90px;
  }
  .input-container {
    width: 100%;
  }
  .form-body {
    width: 400px;
    height: 420px;
    // border: 1px solid #ddd;
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
      background: url('@/assets/images/Icon_process.2df8445b.svg') no-repeat;

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
