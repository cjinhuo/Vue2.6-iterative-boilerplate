<script type="text/jsx">
import {EnterpriceService} from '@/router/routerFilter'
export default {
    name: 'BaseSiderMenu',
    data() {
        return {
            path: this.$route.path,
            menuData: []
        }
    },
    computed: {
        isSinglePage() {
            const arr = this.$route.path.split('/')
            return `${arr[1]}${arr[2]}`
        }
    },
    watch: {
        $route(to) {
            this.findPath(to.path)
        },
        // 页面切换到别的模块后需要重新初始化menuData
        isSinglePage() {
            this.init()
        },
        menuData() {
            this.findPath(this.$route.path)
        }
    },
    created() {
        this.init()
    },
    methods: {
        // 向上寻找，直到找到在mapRoute对应的name时返回这个对象，多个module的时候使用
        upFindRouterObject() {
            const matched = this.$route.matched
            const length = matched.length
            for (let i = length - 1; i > 0; i--) {
                if (newMapRouter[matched[i].name]) {
                    return newMapRouter[matched[i].name]
                }
            }
            return []
        },
        init() {
          console.log(this.$route.path)
            const currentPath = this.$route.path
            // const originMenuData = this.upFindRouterObject()
            const originMenuData = EnterpriceService
            console.log(EnterpriceService)
            this.menuData = JSON.parse(JSON.stringify(originMenuData.children))
            this.filterMenuData(this.menuData)
            this.findPath(currentPath)
            // 过滤menuData（去除hideInMenu等等）
        },
        // 根据当前地址找到触发的侧边栏地址并且赋值
        findPath(currentPath) {
            const currentPathArray = currentPath.split('/')
            const allPath = this.recursionBackPaths(this.menuData)
            while (!allPath[currentPathArray.join('/')] && currentPathArray.length > 1) {
                currentPathArray.pop()
            }
            this.path = currentPathArray.join('/')
        },
        filterMenuData(menuData) {
            // 删除所有含有hideInMenu为true的对象数组
            if (!Array.isArray(menuData)) return {}
            menuData.forEach((value, index) => {
                if (value.meta && value.meta.hideInMenu) {
                    menuData.splice(index, 1)
                    return this.filterMenuData(menuData)
                }
                if (value.children) {
                    return this.filterMenuData(value.children)
                }
            })
        },
        // 返回侧边栏的所有的path
        recursionBackPaths(menuData) {
            const pathArray = {}
            if (!Array.isArray(menuData)) return {}
            menuData.forEach(v => {
                if (v.children) {
                    if (v.path) {
                        pathArray[v.path] = true
                    }
                    Object.assign(pathArray, this.recursionBackPaths(v.children))
                } else if (v.path) {
                    pathArray[v.path] = true
                }
            })
            return pathArray
        },
        renderMenu(menuData) {
            let dom = []
            menuData.forEach(item => {
                // 子集并且有icon就说明是主菜单
                if (item.children && item.children.length !== 0 && item.meta && item.meta.icon) {
                    dom.push(
                        <el-submenu key={item.path} index={item.path} >
                            <template slot="title">
                            <i class="datasimba-icon" class={item.meta.icon} style="margin-right: 8px"/>
                            <span>{item.meta.title}</span>
                            <i class="el-submenu__icon-arrow el-icon-caret-bottom" />
                        </template>
                        {this.renderMenu(item.children)}
                        </el-submenu>,
                    )
                } else {
                    dom.push(
                    <el-menu-item key={item.path} index={item.path} >
                        <i class="datasimba-icon" class={item.meta.icon || ''} style="margin-right: 8px"/>
                        <span slot="title">{ item.meta.title }</span>
                    </el-menu-item>,
                    )
                }
            })
            return dom
        }
    },
    render() {
        return (
            <el-menu default-active={this.path} router>
                {this.renderMenu(this.menuData)}
            </el-menu>
        )
    }
}
</script>
