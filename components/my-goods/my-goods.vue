<template>
	<!-- 商品列表项封装 -->
	<!-- <view> -->
		
		<view class="list-outer"  @click="gotodetial(item)" >
			<!-- 商品左侧图片 -->
			<view class="item-left">
				<image :src="item.goods_small_logo" mode="widthFix" ></image>
			</view>
			<!-- 商品右侧介绍 -->
			<view class="item-right">
				<!-- 商品信息 -->
				<view class="item-title">
					{{item.goods_name}}
				</view>
				<!-- 商品价格 -->
				<view class="item-pic">
			     ￥{{item.goods_price}}
				</view>
			</view>
		</view>
	<!-- </view> -->
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.list-outer{
	display: flex;
	margin: 5px;
	border-bottom: 1px solid #f0f0f0;
	.item-left{
		image{
			width: 100px;
		}
	}
	.item-right{
		margin: 10px 15px;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.item-pic{
			font-size: 16px;
			color: red;
		}
	}
}
</style>