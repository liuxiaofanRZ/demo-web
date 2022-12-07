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
    const { menuData } = useMenuStore()
    const selectedKeysArr = ref([route.meta.id])

    // event
    function handleSelect({ item, key, selectedKeys }) {
      console.log(item, selectedKeys)
      if (!item.id) return
      if (item.id.indexOf('http') === 0) {
        window.open(item.id)
      } else {
        router.push(item.id)
        selectedKeysArr.value = selectedKeys
      }
    }
    // render
    function renderItem(menu) {
      if (menu.children && menu.children.length > 0) {
        return renderSubMenu(menu)
      } else {
        return (
          <Item id={menu.path} key={menu.id} title={menu.title}>
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

    onMounted(() => {})
    return {
      selectedKeysArr,
      menuData,
      handleSelect,
      renderItem,
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
        >
          {this.menuData.map((menu) => this.renderItem(menu))}
        </Menu>
      </div>
    )
  },
}
</script>
