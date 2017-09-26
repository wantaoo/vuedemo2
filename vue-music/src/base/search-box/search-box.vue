<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input ref="query" class="box" v-model="query" :placeholder="placeholder" />
        <i @click="clear" v-show="query" class="icon-dismiss"></i>
    </div>
</template>

<script type="text/javascript">
    import {debounce} from '../../common/js/util.js'
    export default {
        props: {
            placeholder: {
                type:  String,
                default: '搜索歌曲、歌手'
            }
        },
        data(){
            return {
                query: ''
            }
        },
        methods: {
            clear(){
                this.query = ''
            },
            setQuery(query){
                this.query = query
            },
            blur(){
              this.$refs.query.blur()
            }
        },
        created() {
              //query变化时派发事件
              this.$watch('query', debounce((newQuery) => {
                  this.$emit('query', newQuery)
              }, 200))
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: #d7c4b9
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: #806e63
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: #d7c4b9
      color: white
      font-size: $font-size-medium
      outline:none
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>