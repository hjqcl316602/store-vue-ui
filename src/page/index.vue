<script>
import routes from "../router/routes";
console.log(routes);
export default {
  name: "",
  data() {
    return {
      
    };
  },
  computed:{
    routes(){
      return routes.filter(route=>{ 
        return  route['meta'] && route['meta']['show']
      })
    }
  }
};
</script>

<template>
  <div class="">
    <router-link
      class="jq-border_bottom jq-border_thin list"
      v-for="(item,index) in routes"
      
      :key="index"
      tag="div"
      :to="item['path']"
    >
      <span>{{ item['meta'] && item['meta']['title'] }}</span>
      <span>{{ item['name']}}</span>
    </router-link>
  </div>
</template>

<style   scoped>
.list {
  padding: 15px 20px;
  background-color: #fff;
}
</style>