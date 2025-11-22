<template>
  <div class="login">
    <div class="login_config">
      <div class="login-config-btn">
        <!-- 国际化 -->
        <el-dropdown trigger="click">
          <el-button circle size="small"><el-icon>
              <Refresh />
            </el-icon></el-button>
        </el-dropdown>
        <!-- 换主题颜色 -->
        <el-button circle size="small" @click="configDark">
          <el-icon v-if="dark">
            <Sunny />
          </el-icon>
          <el-icon v-else>
            <Moon />
          </el-icon>
        </el-button>
        <!-- 关闭 -->
        <el-button :icon="Close" circle size="small" @click="closeWindow" />
      </div>
    </div>
    <div class="login_adv">
      <div class="login_adv_title">
        <h2>小鹿线</h2>
        <h4>客户关系惯例系统</h4>
        <p>让业务在线更高效,加速企业数字化升级</p>
      </div>
      <div class="login_adv_mask"></div>
      <div class="login_adv_images">
        <img src="../../assets/images/data.png">
      </div>
      <div class="login_adv_bottom">
        小鹿线客户管理系统 1.0.0
      </div>
    </div>
    <!-- 右侧 -->
    <div class="login-main">
      <div class="login-form">
        <div class="login-header">
          <div class="login-img">
            <img src="../../assets/images/logo.png">
            <label>小鹿线客户管理系统</label>
          </div>
        </div>
        <el-tabs>
          <el-tab-pane label="账号登录" lazy style="height: 240px;">
            <passwordForm></passwordForm>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" lazy style="height: 240px;">
            <phoneForm></phoneForm>
          </el-tab-pane>
        </el-tabs>
        <template v-if="true">
          <el-divider>其他登录方式</el-divider>
          <div class="login-oauth">
            <el-button type="success" circle size="large">
              <el-icon size="large">
                <ChatDotRound />
              </el-icon>
            </el-button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
import passwordForm from '../../components/login/passwordForm.vue'
import phoneForm from '../../components/login/phoneForm.vue'

let dark = ref<string | null>(localStorage.getItem('dark'))
const configDark = () => {
  const element = document.querySelector('html') as HTMLElement | null;
  if (element) {
    if (dark.value) {
      element.className = ''
    } else {
      element.className = 'dark'
    }
    dark.value = element.className
    localStorage.setItem('dark', element.className)
  }
}

const closeWindow = () => {
  console.log('关闭')
}



</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: #fff;
  position: relative; // 确保作为定位上下文

  .login_adv {
    width: 40%;
    background: url('../../assets/images/auth_banner.jpg') no-repeat;
    position: relative;

    .login_adv_title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 40px;
      color: #fff;
      z-index: 2;

      h2 {
        font-size: 35px;
      }

      h4 {
        font-size: 16px;
        margin-top: 10px;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        line-height: 1.8;
        color: rgb(255, 255, 255, .6);
      }
    }

    .login_adv_images {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 80px;
      padding: 40px;
      z-index: 3;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login_adv_bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 40px 40px 40px;
      color: #fff;
    }

    .login_adv_mask {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      background: rgba(0, 0, 0, .5);
      color: #fff;
      z-index: 1;
    }
  }

  .login-main {
    flex: 1;

    .login-form {
      width: 400px;
      margin: auto;
      padding: 60px 0 0 0;

      .login-header {
        margin-bottom: 30px;

        .login-img {
          display: flex;
          justify-content: center;
          align-items: center;

          img {
            width: 40px;
            height: 40px;
            vertical-align: bottom;
            margin-right: 10px;
          }

          label {
            font-size: 26px;
            font-weight: bold;
          }
        }
      }

      .login-oauth {
        display: flex;
        justify-content: space-around;
      }
    }
  }

  .login_config {
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 999;
    width: auto;

    .login-config-btn {
      display: flex;
      gap: 10px; // 使用 gap 替代 margin 控制间距
      padding: 10px;
    }
  }
}

// 全局样式，确保 Element Plus 按钮之间没有默认边距
:deep(.el-button+.el-button) {
  margin-left: 0px;
}
</style>