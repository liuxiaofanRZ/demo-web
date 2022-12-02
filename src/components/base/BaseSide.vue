<script lang="jsx">
import { Menu } from 'ant-design-vue'
const { SubMenu, Item } = Menu
export default {
  name: 'sideMenu',
  data() {
    return {
      selectedKeys: [],
      menuData: [
        { title: '百度', url: 'https://www.baidu.com', id: 1 },
        {
          title: '管理',
          id: 2,
          children: [
            { title: '首页', url: '/Home', id: 21 },
            { title: '菜单管理', url: '/MenuMgt', id: 22 },
            { title: '系统管理', url: '/Member', id: 23 },
          ],
        },
      ],
    }
  },
  methods: {
    // event
    handleSelect({ item, key, selectedKeys }) {
      console.log(item)
      if (!item.id) return
      if (item.id.indexOf('http') === 0) {
        window.open(item.id)
      } else {
        this.$router.push(item.id)
        this.selectedKeys = selectedKeys
      }
    },
    // render
    renderItem(menu) {
      if (menu.children && menu.children.length > 0) {
        return this.renderSubMenu(menu)
      } else {
        return (
          <Item id={menu.url} key={menu.id} title={menu.title}>
            {menu.title}
          </Item>
        )
      }
    },
    renderSubMenu(menu) {
      return (
        <SubMenu id={menu.url} key={menu.id} title={menu.title}>
          {menu.children.map((subMenu) => this.renderItem(subMenu))}
        </SubMenu>
      )
    },
  },
  render() {
    // return
    return (
      <div class='base-side'>
        <Menu
          style='height: 100%;'
          onSelect={this.handleSelect}
          selectedKeys={this.selectedKeys}
          mode='inline'
        >
          {this.menuData.map((menu) => this.renderItem(menu))}
        </Menu>
      </div>
    )
  },
}
</script>
