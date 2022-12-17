<template>
	<view>
	    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
	    	<swiper-item v-for="(item,i) in swiperList" :key="i" class="swi">
	    		<view class="swiper-item">
					<img :src="item.url"></img>
				</view>
	    	</swiper-item>
	    	
	    </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[
					{
						id:1,
						url:"https://img0.baidu.com/it/u=1618970823,1350528377&fm=253&fmt=auto&app=138&f=JPEG?w=650&h=203"
					},{
						id:2,
						url:"https://img0.baidu.com/it/u=4221556751,3134031808&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=220"
					},{
						id:3,
						url:"https://img1.baidu.com/it/u=118763193,2397896178&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
					}
				]
			};
		},
		onLoad(){
			this.getSwiperList()
		},
		methods:{
			async getSwiperList(){
				const res=await uni.$http.get("/api/public/v1/home/swoperdata")
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">
.swi{
	width: 100%;
	height: 300px;
	.swiper-item{
		width: 100%;
		height: 100%;
		img{
			width: 100%;
			height: 100%;
		}
	}
}
</style>
