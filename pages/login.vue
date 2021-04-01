<template>
  <div class="login-wrap">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        :validate-status="mobileError() ? 'error' : ''"
        :help="mobileError() || ''"
      >
        <a-input
          v-decorator="[
            'mobile',
            {
              rules: [{ required: true, message: 'Please input your mobile!' }],
            },
          ]"
          placeholder="Mobile"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
      >
        <a-input
          v-decorator="[
            'code',
            {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            },
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >
          {{ $t('login.submit') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}
export default {
  // layout: 'empty',
  data() {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    mobileError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('mobile') && getFieldError('mobile')
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('code') && getFieldError('code')
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$api.login(values).then((res) => {
            const { access_token: token } = res
            this.$store.commit('SET_TOKEN', token)
            this.$cookies.set('token', token)
            localStorage.setItem('token', token)
            // 重定向处理
            const { redirectUrl } = this.$route.query
            if (redirectUrl) {
              this.$router.push({ path: decodeURIComponent(redirectUrl) })
            } else {
              this.$router.push({ path: '/' })
            }
          })
        }
      })
    },
  },
}
</script>
<style lang="less">
.login-wrap {
  width: 240px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
