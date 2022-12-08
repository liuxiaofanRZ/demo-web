<script lang="jsx">
import { useMenuStore } from '@/stores/menu'
import { Menu } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { SubMenu, Item } = Menu
export default {
  name: 'sideMenu',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const { menuList } = useMenuStore()
    const selectedKeysArr = ref([route.meta.id])
    // event
    function handleSelect({ item: { menuDetail }, key, selectedKeys }) {
      if (!menuDetail.id) return
      if (menuDetail.isExternal) {
        window.open(menuDetail.path)
      } else {
        router.push(menuDetail.path)
        selectedKeysArr.value = selectedKeys
      }
    }
    // render
    function renderItem(menu) {
      if (menu.children && menu.children.length > 0) {
        return renderSubMenu(menu)
      } else {
        return (
          <Item
            menuDetail={menu}
            id={menu.path}
            key={menu.id}
            title={menu.title}
          >
            {menu.title}
          </Item>
        )
      }
    }
    function renderSubMenu(menu) {
      return (
        <SubMenu id={menu.path} key={menu.id} title={menu.title}>
          {menu.children.map((subMenu) => renderItem(subMenu))}
        </SubMenu>
      )
    }
    // 根据当前页id找到所有父级id，设置默认展开的页面
    let arr = []
    getTarget(menuList, route.meta.id)
    const openKeys = ref(arr)
    function getTarget(list, targetId) {
      if (!list || list.length <= 0) return
      for (let a in list) {
        let node = list[a]
        if (node.id === targetId || getTarget(node.children, targetId)) {
          arr.unshift(node.id)
          return true
        }
      }
    }

    return {
      selectedKeysArr,
      menuList,
      handleSelect,
      renderItem,
      openKeys,
    }
  },
  render() {
    // return
    return (
      <div class='base-side'>
        <Menu
          style='height: 100%;'
          onSelect={this.handleSelect}
          selectedKeys={this.selectedKeysArr}
          mode='inline'
          openKeys={this.openKeys}
        >
          {this.menuList.map((menu) => this.renderItem(menu))}
        </Menu>
      </div>
    )
  },
}
</script>
