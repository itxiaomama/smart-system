import Vue from 'vue'
import router from '../router'
import storage from '../utils/storage'
const permission = Vue.directive('permission', {
  inserted(el, binding, vnode) {
    let btns = [];
    let path = router.currentRoute.matched[0].path;
    let path1 = router.currentRoute.matched[1].path;
    let  list  = storage.get('routeList');
    list.map((el,index) =>{
      if(el.component === path){
        el.children.map((val,idx) =>{
          let perm = el.component+'/'+val.component;
          if(perm === path1){
            val.children.map((value) =>{
              if(value.status == 1){
              btns.push(value.menu_key)
              }
            })
          }
        })

      }
    })
    let btnPermissionValue = binding.value;
    let boolean = btns.includes(btnPermissionValue);
    !boolean && el.parentNode.removeChild(el)
  }
})
export default permission
