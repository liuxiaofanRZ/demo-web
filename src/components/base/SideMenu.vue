<script lang="jsx">
import { useMenuStore } from '@/stores/menu'
import { Menu } from 'ant-design-vue'
import 'ant-design-vue/es/menu/style/index.css'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const { SubMenu, Item } = Menu
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
// import { MailOutlined } from '@ant-design/icons-vue'
import 'ant-design-vue/es/tooltip/style/css'

export default {
  name: 'sideMenu',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const menuStore = useMenuStore()
    const { menuList } = storeToRefs(menuStore)
    const mainStore = useMainStore()
    const { collapsed } = storeToRefs(mainStore)
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
            {{
              default: () => menu.title,
              /* icon: () => <MailOutlined />, */
            }}
          </Item>
        )
      }
    }
    function renderSubMenu(menu) {
      return (
        <SubMenu id={menu.path} key={menu.id} title={menu.title}>
          {{
            default: () => menu.children.map((subMenu) => renderItem(subMenu)),
            /* icon: () => <MailOutlined />, */
          }}
        </SubMenu>
      )
    }
    // 根据当前页id找到所有父级id，设置默认展开的页面
    let arr = []
    getTarget(menuList.value, route.meta.id)
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

    return () => (
      <Menu
        class='side-menu'
        onSelect={handleSelect}
        selectedKeys={selectedKeysArr.value}
        mode='inline'
        openKeys={collapsed.value ? [] : openKeys.value}
      >
        {menuList.value.map((menu) => renderItem(menu))}
      </Menu>
    )
  },
}
</script>
