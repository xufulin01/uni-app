<template>
	<view class="scroll-outer">
		<scroll-view scroll-y="true" :style="{height:wx+'px'}" class="scroll-left">
			<view :class="['scroll-left-item',isActive===i?'active':'']" v-for="(item,i) in cateList"
				@click="handleItemClick(i)">{{item.cat_name}}</view>

		</scroll-view>
		<scroll-view scroll-y="true" :style="{height:wx+'px'}" class="scroll-right" :scroll-top="scollTop">
			<view class="scroll-right" v-for="(item2,i2) in cateLable2" :key="i2">
				<view class="scroll-right-title">
					/{{item2.cat_name}}/
				</view>
				<view class="scroll-right-item" >
					<view class="children-item" v-for="(temp,j) in item2.children" :key="j" @click="gotoGoodsList(temp)">
<!-- 						<image src="https://img0.baidu.com/it/u=3820671488,609799335&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200" mode="widthFix"></image>
 -->						<image :src="temp.cat_icon.replace('dev','web')" mode="widthFix"></image>
						<view class="child-item-title">
							{{temp.cat_name}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wx: 0,
				isActive: 0,
				// 切换滚动条置顶
				scollTop:0,
				// 一级分类数据
				cateList: [],
				// 二级分类数据
				cateLable2:[]
			};
		},
		onLoad(option) {
			// 获取当前手机的屏幕可用高度，指除去头部和底部tab的空白页面
			this.wx = uni.getSystemInfoSync().windowHeight
			// console.log(uni.getSystemInfoSync())
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories');
				// console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				
				this.cateList = res.message
				console.log(res.message[0].children)
				this.cateLable2=res.message[0].children
			},
			handleItemClick(i) {
				this.isActive = i
				// 重置滚动条数据
				this.scollTop=this.scollTop?0:1
				this.cateLable2=this.cateList[i].children
			},
			gotoGoodsList(val){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?cid="+val.cat_id
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.scroll-outer {
		display: flex;
	}

	.scroll-left {

		width: 120px;

		.scroll-left-item {
			background-color: #fff;
			height: 60px;
			line-height: 60px;
			text-align: center;

			// border: #e2e2e2 solid 1rpx;
			&.active {

				position: relative;

				&::before {
					content: " ";
					display: block;
					height: 30px;
					width: 3px;
					background-color: red;
					position: absolute;
					top: 15px;
				}
			}
		}
	}

	.scroll-right {
		.scroll-right-title{
			font-weight: 800;
			text-align: center;
			padding: 15px 0;
			}
		.scroll-right-item{
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
			.children-item{
				width: 26%;
				margin: 18rpx;
				image{
					width:100% ;
					
				}
				.child-item-title{
					text-align: center;
					font-size: 30rpx;
				}
			}
			
		}
	}
</style>
