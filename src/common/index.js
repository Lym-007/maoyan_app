import head from "./header/Head"
import tabItem from "./tabs/TabItem"
import tabs from "./tabs/Tabs"
import content from "./content/Content"

export default {
    install(Vue){
        // 添加全局组件
        Vue.component(head.name,head);
        Vue.component(tabItem.name,tabItem);
        Vue.component(tabs.name,tabs);
        Vue.component(content.name,content);
    }
}