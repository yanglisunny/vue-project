<template>
  <div class="content">
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
    <swiper :options="iconOption" >
      <swiper-slide v-for="(item ,index) in pageNum" :key="index">
      <div class="icon-wriper">
        <div v-for="innerItem in item" :key="innerItem.id" class="icon-item">
          <div class="icon-img-con">
            <img  class="icon-img" :src="innerItem.imgUrl"/>
          </div>
          <div v-text="innerItem.imgText"></div>
        </div>
      </div>  
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div> 
    </swiper>
    <ul class="mp-listeitem-con">
      <li class="mp-listentrance-item mp-item-border">
        <span class="mp-iconfont iconfont">&#xe611;</span>
        <i>定位失败</i>
      </li>
      <li class="mp-listentrance-item">
        <a href="javascript:;" class="mp-listentrance-a">
          <span class="mp-iconfont iconfont">&#xe603;</span>
          <i>五折泡温泉</i>
        </a>
      </li>
    </ul>
    <ul class="mp-saleitem-con">
      <li class="mp-saleitem-itemleft mp-item-border">
        <a href="javascript:;">
        </a>
      </li>
      <li class="mp-saleitem-itemright">
        <a href="javascript:;">
        </a>
      </li>
    </ul>
    <div class="hotsale">
      <div class="hotsale-title">热销推荐</div>
      <div class="hotsale-con">
        <ul class="hotsaleList">
          <li class="hotsale-list" v-for="(item, index) in hotlist" :key="item.id">
            <a href="javascript:;">
              <div class="hot-list-left">
                <img :src="item.imgUrl" alt="" class="hot-list-img">
              </div>
              <div class="hot-list-right">
                <div class="hot-list-rightT">
                  <div class="top-topic" v-text="item.topic"></div>
                  <div class="top-desc" v-text="item.description"></div>
                </div>
                <div class="hot-list-rightB">
                  <i>￥</i>
                  <em v-text="item.price"></em>
                  <span>起</span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="hotsale-more"><a href="javascript:;">查看所有商品</a></div>
    </div>

    <div class="weekend-to-where">
      <div class="hotsale-title">周末去哪儿</div>
      <div class="weekend-con">
        <ul class="weekendList">
          <li class="weekend-list" v-for="(item, index) in weekendList" :key="item.id">
            <a href="javascript:;">
              <div class="weekend-list-top">
                <img :src="item.imgUrl" alt="" class="weekend-list-img">
              </div>
              <div class="weekend-list-bottom">
                <div class="weekend-list-topic" v-text="item.topic"></div>
                <div class="weekend-list-desc" v-text="item.description"></div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  <div class="warning">
    <em class="iconfont">&#xe6d5;</em>
    <span class="warning-pos">票面价</span>
    <i>是指通过景区指定窗口售卖的纸质门票上标注的价格</i>
  </div>

  <div class="qunaer-footer">
    <div class="main-nav-wrap">
      <ul class="main-nav-list">
        <li class="main-nav-li" v-for="(item, index) in footerList" :key="item.id">
          <a href="javascript:;">
            <div class="iconfont icon" v-html="item.icons"></div>
            <span class="" v-text="item.text"></span>
          </a>
        </li>
      </ul>
    </div>
    <div class="verison">
      <div class="touch"><a href="javascript:;">触屏版</a></div>
      <div class="pc"><a href="javascript:;">电脑版</a></div>
    </div>
    <div class="copyright">
      <span>Qunar 京ICP备05021087</span>
      <a href="javascript:;">意见反馈</a>
    </div>
  </div>
  
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      swiperInfo: [],
      iconInfo: [],
      hotlist: [],
      weekendList: [],
      footerList: [],
      swiperOption: {
        autoplay: 1000,
        pagination: '.swiper-pagination',
        loop: true
      },
      iconOption: {
        pagination: '.swiper-pagination',
        loop: false
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
        this.iconInfo = body.data.icons
        this.hotlist = body.data.hotList
        this.weekendList = body.data.weekendList
        this.footerList = body.data.footerList
      }
    }
  },
  computed: {
    pageNum () {
      const pages = []
      this.iconInfo.forEach((value, index) => {
        let page = Math.floor(index / 8)
        if (!pages[page]) {
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
  .content{
    background:#f5f5f5;
  }
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
  .icon-wriper{
    height:3.8rem;
    background:#fff;
  }
  .icon-item {
    box-sizing: border-box;
    text-align:center;
    width:25%;
    float:left;
    padding-top:.4rem;
  }
  .icon-img-con{
    width:100%;
    height:0;
    padding-bottom: .86rem;
  }
  .icon-img {
    width:.66rem;
  }
  .mp-listeitem-con {
    background:#fff;
    height:.98rem;
    font-size:.26rem;
    color:#232323;
  }
  .mp-listentrance-item {
    float:left;
    text-align:center;
    padding:.32rem 1.09rem .32rem 1.09rem;
    border-top:.01rem solid #e1e1e1;
  }
  .mp-listentrance-a {
    font-size:.26rem;
    color:#232323;
  }
  .mp-item-border {
    border-right:.01rem solid #e1e1e1;
  }
  .mp-saleitem-con {
    margin-top:.2rem;
    width:100%;
    height:1.38rem;
    background:#fff;
    border-top:.01rem solid #e1e1e1;
    border-bottom:.01rem solid #e1e1e1;
  }
  .mp-saleitem-itemleft{
    height:1.38rem;
    width:3.6rem;
    background:url("http://img1.qunarzz.com/piao/fusion/1710/a2/e395615b16fb1302.png") center center no-repeat;
    float:left;
    background-size:100% auto;
  }
  .mp-saleitem-itemright{
    height:1.38rem;
    width:3.6rem;
    float:left;
    background:url("http://img1.qunarzz.com/piao/fusion/1711/8a/4c62d1a89fc2d602.png") center center no-repeat;
    background-size:100% auto;
  }
  .hotsale-title {
    font-size:.26rem;
    line-height:.26rem;
    padding:.27rem;
    color:#181818;
  }
  .hotsale-con{
    background:#fff;
  }
  .hotsale-list{
    padding:.26rem .9rem .23rem .24rem;
    overflow:hidden;
    border-bottom:.01rem solid #e1e1e1;
  }
  .hotsale-list a{
    color:#171717;
  }
  .hot-list-left {
    height:1.4rem;
    width:1.4rem;
    float:left;
  }
  .hot-list-img {
    width:100%;
  }
  .hot-list-right{
    float:left;
    margin-left:.21rem;
    font-size:.26rem;
  }
  .hot-list-right .hot-list-rightT {
    width:4.7rem;
    white-space:nowrap;
    overflow:hidden;
  }
  .top-desc {
    width:4.7rem;
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    color:#959595;
    display:block;
    margin-top:.2rem;
    margin-bottom:.26rem;
  }
  .hot-list-rightB i{
    color:#d8853f;
    font-size:.12rem;
  }
  .hot-list-rightB em{
    color:#d8853f;
    font-weight:900;
    font-size:.30rem;
  }
  .hot-list-rightB span{
    color:#a0a0a0;
    font-size:.22rem;
  }
  .hotsale-more{
    background:#fff;
  }
  .hotsale-more a{
    font-size:.26rem;
    display:block;
    padding: .29rem 2.93rem .32rem 2.92rem;
  }
  .weekend-to-where {
    margin-bottom:.1rem;
  }
  .weekend-con{
    background:#fff;
  }
  .weekend-list-top{
    width:100%;
    height:2.8rem;
  }
  .weekend-list-img{
    width:100%;
  }
  .weekend-list-bottom{
    padding:.25rem 0 .4rem .21rem;
  }
  .weekend-list-bottom .weekend-list-topic{
    color:#2e2e2e;
    font-size:.26rem;
    margin-bottom:.2rem;
  }
  .weekend-list-desc{
    color:#575757;
    font-size:.22rem;
  }
  .warning{
    font-size:.22rem;
    padding:.19rem 0 .19rem .13rem;
    background:#fff;
    color:#6d6d6d;
  }
  .warning .warning-pos{
    color:#555;
  }
  .main-nav-wrap{
    padding:.19rem .92rem .33rem .96rem;
  }
  .main-nav-list{
    float:left;
    height:.4rem;
    overflow:hidden;
  }
  .main-nav-li{
    float:left;
    margin-bottom:.11rem;
    margin-right:.13rem;
  }
  .main-nav-li a{
    color:#b7b7b7;
  }
  .main-nav-li .icon{
    display:inline-block;
    /*float:left;*/
  }
  .main-nav-li span{
    text-decoration:underline;
  }
  .verison{
    /*height:1.17rem;*/
    width:100%;
    border-top:.01rem solid #c4c4c4;
    padding:.22rem 2.57rem .22rem 2.63rem;
    font-size:.24rem;
  }
  .verison .touch{
    display:inline-block;
    margin-right:.64rem;
  }
  .verison .touch a{
    color:#1a1a1a;
  }
  .verison .pc{
     display:inline-block;
  }
  .copyright{
    display:block;
    font-size:.26rem;
    text-align:center;
    padding-bottom:.2rem;
  }
  .copyright a{
    color:#a4a4a4;
  }
  .copyright span{
    color:#a4a4a4;
  }
</style>
