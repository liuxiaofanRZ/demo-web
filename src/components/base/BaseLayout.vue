<template>
  <a-layout class="base-container" @click="handleMobileCollapsed">
    <a-layout-header class="base-header">
      <div class="logo-box">
        <img class="logo" src="@/assets/logo.svg" alt="" />
        <menu-unfold-outlined
          @click.stop="setCollapsed(false)"
          v-if="collapsed"
        />
        <menu-fold-outlined @click.stop="setCollapsed(true)" v-else />
        <div style="flex: 1"></div>
        <div @click="logout" class="logout">退出</div>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="isDesktop"
        :trigger="null"
        :collapsed="collapsed"
        class="base-sider"
        theme="light"
      >
        <div class="base-title">demo1</div>
        <SideMenu></SideMenu>
      </a-layout-sider>
      <a-layout-sider
        v-else
        @click.stop
        collapsedWidth="0"
        :trigger="null"
        :collapsed="collapsed"
        class="base-sider-mobile"
        theme="light"
      >
        <div class="base-title">demo</div>
        <SideMenu></SideMenu>
      </a-layout-sider>
      <a-layout-content class="base-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { useMainStore, EnumDeviceType } from '@/stores/main'
import { useUserStore } from '@/stores/user'

import { storeToRefs } from 'pinia'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import enquire from 'enquire.js'
import { onMounted } from 'vue'
import SideMenu from './SideMenu.vue'
const userStore = useUserStore()
const mainStore = useMainStore()
const { logout } = userStore
const { setCollapsed } = mainStore
const { collapsed, isDesktop, isMobile } = storeToRefs(mainStore)

function handleMobileCollapsed() {
  if (isMobile.value && !collapsed.value) {
    setCollapsed(true)
  }
}

onMounted(() => {
  // 媒体查询
  enquire
    .register('screen and (max-width: 767.98px)', {
      match: function () {
        console.log('isMobile')
        mainStore.setDeviceType(EnumDeviceType.mobile)
      },
    })
    .register('screen and (min-width: 767.98px)', {
      match: function () {
        console.log('isDesktop')
        mainStore.setDeviceType(EnumDeviceType.desktop)
      },
    })
})
</script>

<style lang="less">
@headerHeight: 64px;
.base-container {
  min-height: 100vh;
}
.base-header {
  box-shadow: 0 1px 2px 0 var(--cb-color-shadow, rgba(0, 0, 0, 0.1));
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: 0;
}

.base-sider {
  // overflow: auto;
  height: calc(100vh - @headerHeight);
  position: sticky;
  top: @headerHeight;
  left: 0;
  bottom: 0;
  z-index: 10;
  border-right: 1px solid #f0f0f0;
}
.base-sider-mobile {
  border-right: 1px solid #f0f0f0;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 20;
}
.base-content {
  padding: (@headerHeight + 20) 20px 20px;
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
.base-title {
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}

.side-menu {
  height: calc(100% - 44px - 20px);
  border-right: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
.logo-box {
  padding: 0 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.logo {
  width: 40px;
  margin-right: 30px;
}
.logout {
  cursor: pointer;
}
</style>
