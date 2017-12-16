<template>
  <div>
    <header class="header">
      <div class="back iconfont">&#xe60f;</div>
      <div class="search iconfont"><a href="javascript:;" class="search-icon"><i>&#xe738;</i><span class="search-cont">输入城市/景点/游玩主题</span></a></div>
      <div class="city"><div class="cityname">齐齐哈尔</div><a href="javascript:;" class="pull iconfont">&#xe600;</a></div>
    </header>
    
    <swiper :options="swiperOption" >
      <swiper-slide v-for="(item ,index) in swiperInfo" :key="item.id">
        <div class="swiper-img-con">
          <img  class="swiper-img" :src="item.imgUrl"/>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div> 
    </swiper>
    <swiper >
      <swiper-slide v-for="(item ,index) in pageNum" :key="index">
        <div v-for="innerItem in item">
          <img  class="swiper-img" :src="item.imgUrl"/>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div> 
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      swiperInfo: [],
      iconInfo: [],
      swiperOption: {
        autoplay: 1000,
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  methods: {
    getIndexData () {
      this.$http.get('/static/index.json')
          .then(this.handelGetDataIndexSucc.bind(this))
    },
    handelGetDataIndexSucc (res) {
      const body = res.body
      if (body && body.data && body.data.swiperinfo) {
        this.swiperInfo = body.data.swiperinfo
      }
    }
  },
  computed: {
    pageNum () {
      const pages = []
      this.iconInfo.forEach( (value, index) => {
        let page = Math.floor(index / 8)
        if(!pages[page]){
          pages[page] = []
        }
        pages[page].push(value)
      })
      return pages
    }
  },
  created () {
    this.getIndexData()
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    background: #05bad5;
    color: #fff;
  }
  .back {
    width: .64rem;
    line-height: .86rem;
    text-align:center;
  }
  .search {
    flex: 1;
    margin: .14rem .18rem;
    background: #fff;
    border-radius: .1rem;
    font-size: .26rem;
    line-height: .6rem; 
    height: .6rem;
    color:#e7e7e7;
    align-items:center;
    padding-left:.2rem;
  }
  .search-icon{
    font-size: .26rem;
    color:#e7e7e7;
  }
  .search-cont{
    padding-left:.2rem;
    color:#e7e7e7;
  }
  .city {
    display:flex;
    justify-content: space-around;
    width: 1.43rem;
    line-height: .86rem;
    text-align: center;
  }
  .cityname{
    max-width: 1.3rem;
    white-space:nowrap;
    overflow:hidden;
  }
  .pull{
    color:#fff;
  }
  .swiper-img-con {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 31.25%;
  }
  .swiper-img {
    width: 100%;
  }
  
</style>
