<template>
	<view>
		<!-- 搜索组件的吸顶效果设置 -->
		<view class="search-box">
			<!-- 自定义样式，背景颜色和圆角尺寸 -->
			<my-search :bgColor="'pink'" :borderRadius="'10'" @myclick="gotosearch"></my-search>
		</view>

		
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i" class="swi">
				<navigator class="swiper-item" :url="'/subpkg/goods_detial/goods_detial?goods_id='+item.id">
					<image :src="item.url"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<!-- <view class="nav">
			<view v-for="(item,i) in navList" :key="item.id" :style="{backgroundColor: item.color}">
				{{item.title}}
			</view>
		</view> -->
		<view class="nav">
			<view v-for="(item,i) in navList" :key="i" @click="navClickHandel(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层区 -->
		<view class="floor-outer">
			<view class="floor" v-for="(item,i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-img-box">
					<!-- 左侧大图 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<!-- 右侧小图 -->
					<view class="right-img-box">
						<navigator v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0" :url="item2.url">
							<image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList: [{
					id: 1,
					url: "https://img0.baidu.com/it/u=1618970823,1350528377&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=203"
				}, {
					id: 2,
					url: "https://img0.baidu.com/it/u=4221556751,3134031808&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=220"
				}, {
					id: 3,
					url: "https://img1.baidu.com/it/u=118763193,2397896178&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
				}],
				//导航条数据
				// navList:[
				// 	{
				// 		id:11,
				// 		title:"分类",
				// 		color:"#ff0000"
				// 	},{
				// 		id:12,
				// 		title:"秒杀拍",
						
				// 		color:"#00ff00"
				// 	},{
				// 		id:13,
				// 		title:"超值购",
				// 		color:"#0000ff"
				// 	},{
				// 		id:14,
				// 		title:"更多",
				// 		color:"#999"
				// 	}
				// ]
				navList:[],
				floorList:[],
				
				

			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const res = await uni.$http.get("/api/public/v1/home/swoperdata")
				// console.log(res)
				if(res.data.meta.status!==200) return uni.$showMsg()
			},
			async getNavList() {
			      const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				  // console.log(res)
			      if (res.meta.status !== 200) return uni.$showMsg()
			      this.navList = res.message
			    
			  },
			 
			  
			navClickHandel(val){
				// console.log(val)
				if(val.name==="分类"){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			async getFloorList() {
			     const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				 // console.log(res)
			     if (res.meta.status !== 200) return uni.$showMsg()
				 // 对数据进行处理
				 res.message.forEach(floor=>{
					 floor.product_list.forEach(pre=>{
						 pre.url="/subpkg/goods_list/goods_list?"+pre.navigator_url.split("?")[1]
					 })
				 })
			     this.floorList = res.message
			   },
			   gotosearch(){
				   uni.navigateTo({
				   	url:"/subpkg/search/search"
				   })
				   
			   }
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.swi {
		width: 100%;
		height: 300px;
	
	.swiper-item {
			width: 100%;
			height: 100%;

			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.nav{
		display: flex;
		justify-content: space-around;
		margin: 15px;
		view{
			width: 18%;
			height: 60px;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.floor-img-box{
		display: flex;
		margin-left: 10px;
		.right-img-box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
	}
	}
</style>
