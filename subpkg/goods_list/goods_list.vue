<template>
	<view>
		
		<!-- 商品列表 -->
		<view class="list-outer" v-for="(item,i) in goodsList" :key="i" @click="gotodetial(item)" >
			<!-- 商品左侧图片 -->
			<view class="item-left">
				<image :src="item.goods_small_logo||defaultPic" mode="widthFix" ></image>
			</view>
			<!-- 商品右侧介绍 -->
			<view class="item-right">
				<!-- 商品信息 -->
				<view class="item-title">
					{{item.goods_name}}
				</view>
				<!-- 商品价格 -->
				<view class="item-pic">
			     ￥{{item.goods_price|tofixed}}
				</view>
				
			</view>
		</view>
		<!-- <view class="defaultPic" v-if="goodsList.length==0">
			<image :src="defaultPic" mode="widthFix" ></image>
			<view class="tit">
				暂无商品信息
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					cid:"",
					query:"",
					pagenum:1,
					pagesize:10
				},
				defaultPic:"https://img0.baidu.com/it/u=3820671488,609799335&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200",
				goodsList:[],
				total:0,
				// 节流阀
				isload:false
			};
		},
		onLoad(option) {
			// 获取传过来的商品列表参数
			this.queryObj.cid=option.cid||''
			this.queryObj.query=option.query||''
			this.getShopList()
		},
		methods:{
			// 获取商品列表
			async getShopList(cb){
				
				this.isload=true
				const {data:res}=await uni.$http.get("/api/public/v1/goods/search",this.queryObj)
				this.isload=false
				// 接收传进来的回调函数,当数据加载完成关闭下拉刷新操作
				cb&&cb()
				if(res.meta.status!==200) return uni.$showMsg()
				this.goodsList=[...this.goodsList,...res.message.goods]
				this.total=res.message.total
				// this.goodsList=res.message.goods
				
			},
			gotodetial(v){
				console.log(v);
				uni.navigateTo({
					url:"/subpkg/goods_detial/goods_detial?goods_id="+v.goods_id
				})
			}
			
		},
		// 上拉重新加载数据
		onPullDownRefresh() {
			// 重置相关数据
			this.queryObj.pagenum=1
			this.goodsList=[]
			this.total=0
			this.isload=false
			// 重新发起数据请求,刷新数据
			// uni.stopPullDownRefresh()函数用于关闭下拉刷新
			this.getShopList(()=>uni.stopPullDownRefresh())
		},
		// 上拉触底加载更多
		onReachBottom(cb) {
			// 判断是否还有下一页的数据,并且判断当前是否还有请求，有下一页数据并且不在请求中的时候，才会发起请求
			if(this.queryObj.pagenum*this.queryObj.pagesize>this.total) return uni.$showTost()
			if(this.isload) return
			// this.queryObj.pagenum=this.queryObj.pagenum+1
			this.queryObj.pagenum++
			this.getShopList()
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
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
.defaultPic{
	width: 220px;
	margin: 10px auto;
	image{
		width: 220px;
	}
	.tit{
		text-align: center;
		font-size: 24px;
		color: #999;
	}
}
</style>
