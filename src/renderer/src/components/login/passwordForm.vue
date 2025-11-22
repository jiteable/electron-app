<template>
  <el-form ref="formRef" :model="form" :rules="rules" class="login-form-container">
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" clearable>
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password>
        <template #prefix>
          <el-icon>
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item prop="captcha">
      <div class="captcha-container">
        <el-input v-model="form.captcha" placeholder="请输入验证码" clearable>
          <template #prefix>
            <el-icon>
              <Key />
            </el-icon>
          </template>
        </el-input>
        <div class="captcha-image" @click="refreshCaptcha">
          <!-- 这里应该显示验证码图片 -->
          <div class="placeholder-captcha">验证码</div>
        </div>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="submitForm">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { loginByJson } from '../../api/login'

const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
  captcha: '',
  key: '' // 验证码的key
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
})

// 刷新验证码
const refreshCaptcha = () => {
  console.log('刷新验证码')
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 调用登录API
        const res = await loginByJson({
          username: form.username,
          password: form.password,
          key: form.key,
          captcha: form.captcha
        })

        console.log('登录结果:', res)

        // 如果登录成功，保存token到localStorage
        if (res.data && res.data.token) {
          localStorage.setItem('TOKEN', res.data.token)
          // 这里应该跳转到主页面
          window.location.href = '#/'
        }
      } catch (error) {
        console.error('登录失败:', error)
        // 可以在这里显示错误信息
      }
    }
  })
}

</script>

<style scoped>
.login-form-container {
  padding: 20px 0;
}

.captcha-container {
  display: flex;
  gap: 10px;
}

.captcha-container :deep(.el-input) {
  flex: 1;
}

.placeholder-captcha {
  width: 120px;
  height: 40px;
  background-color: #f5f7fa;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #909399;
  font-size: 14px;
}

.placeholder-captcha:hover {
  border-color: #c0c4cc;
}
</style>