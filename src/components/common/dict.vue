<template>
  <div>
  <a-select v-model="selectValue"  placeholder="请选择" @change="handleChange">
      <a-select-option v-for="item in data " :value="item.key">
        {{item.title}}
      </a-select-option>
    </a-select>
    </div>
</template>

<script>
import axios  from 'axios';
export default {
  data(){
    return{
        data:[],
        selectValue:this.value
    }
  },
  props:{
    keyValue:{
      type:String,
      default:''
    },
    value:''
  },
  watch:{
    value(){
      this.selectValue = this.value;
    }
  },
  created(){
    this.getCon();
  },
  methods:{
    getCon(){
      axios.get('/api/common/dict?key='+this.keyValue).then((res) =>{
        console.log(res)
        let arr = [];
        let  obj = res.data;
        for(let key in obj ){
          let  newobj  = {
            key :key,
            title: obj[key]
          }
          arr.push(newobj)
        }
        this.data = arr ;
      })
    },
    handleChange(value){
      this.$emit('input',value)
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-select{
    width: 100%!important;
  }

</style>