<template>
  <a-layout class="base-container">
    <a-layout-header class="base-header">Header</a-layout-header>
    <a-layout>
      <a-layout-sider class="base-sider" theme="light">
        <SideMenu></SideMenu>
      </a-layout-sider>
      <a-layout-content class="base-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

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
  z-index: 10;
}

.base-sider {
  overflow: auto;
  height: calc(100vh - @headerHeight);
  position: fixed;
  top: @headerHeight;
  left: 0;
  bottom: 0;
}
.base-content {
  margin-left: 200px;
  padding: (@headerHeight + 20) 20px 20px;
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
</style>
