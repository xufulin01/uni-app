<template>
	<view class="main">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"
			class="outer">
			<swiper-item v-for="(item,i) in swiperList" :key="i" class="swi">
				<image :src="item" @click="previed(i)"></image>
			</swiper-item>
		</swiper>
		<view class="name">
			商品名称：{{id}}
		</view>
		<view class="money">
			价格：{{id}}
		</view>
		<rich-text :nodes="imglist"></rich-text>
		<!-- 商品导航区域，底部导航栏 -->
		<view class="goos_nav">
			<uni-goods-nav class="footer":fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: ["https://img0.baidu.com/it/u=544872902,228049904&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200",
					"https://img2.baidu.com/it/u=2364113080,774807360&fm=253&fmt=auto?w=130&h=170",
					"https://img1.baidu.com/it/u=118763193,2397896178&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
					"https://img0.baidu.com/it/u=311113674,679283213&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
					"https://img0.baidu.com/it/u=1642615,3476525951&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500"
				],
				id: 0,
				imglist: "<div><img src='https://img0.baidu.com/it/u=544872902,228049904&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200'/><img src='https://img1.baidu.com/it/u=118763193,2397896178&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'/></div>",
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(option) {
			const goods_id = parseInt(option.goods_id)
			this.id = option.goods_id
			this.getShopDetial(goods_id)
			// 替换原来的img标签,给原来的结构添加样式,解决图片间隙的问题
			this.imglist = this.imglist.replace(/<img /g, "<img style='width:100%;display:block'")
		},
		methods: {
			async getShopDetial(goods_id) {
				const {
					dataa: res
				} = await uni.$http.get("/api/punlic/v1/goods/detail", {
					goods_id: goods_id
				})
			},
			previed(i) {
				console.log(i);
				// 查看大图
				uni.previewImage({
					current: i,
					urls: [...this.swiperList]
				})
			},
			onClick(e) {
				console.log(e);
				if(e.content.text==="购物车"){
					console.log(123);
					uni.switchTab({
						url:"/pages/cart/cart"
					})
				}
			},
			buttonClick(e) {
				console.log(e)
				this.options[1].info++
			}

		}
	}
</script>

<style lang="scss">
	.main{
		padding-bottom: 50px;
	}
	.goos_nav{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.outer {
		height: 300px;
	}

	.swi {
		width: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
