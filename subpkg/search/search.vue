
<template>
	<view>
		<!-- 搜索框 -->
		<view class="searchbar">
			<!-- 点击历史记录回填重新搜索 -->
			<!-- <uni-search-bar @confirm="search" @input="input" :value="inputValue"placeholder="请输入搜索内容" radius="100" cancelButton="none" :focus="true"></uni-search-bar> -->
			<uni-search-bar @confirm="search" @input="input" placeholder="请输入搜索内容" radius="100" cancelButton="none" :focus="true"></uni-search-bar>

		</view>
		<!-- 搜索结果列表 -->
		<view class="search-list" v-if="searchList.length!==0">
			<view class="search-item" v-for="(item,index) in searchList" :key="index" @click="gotogoodsDetail(item)">
				<view class="item">
					{{item.goods_name}}
				</view>
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史记录列表 -->
		<view class="history-outer" v-else>
			<!-- 标题区域 -->
			<view class="history-top" v-if="historyList.length>0">
				<view class="text">
					搜索历史
				</view>
				<uni-icons type="trash-filled" size="20" @click="clear"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-item">
				<!-- 这里渲染重排后的历史数据 -->
				<view class="item-h" v-for="(item,i) in histories" :key="i" @click="nextSearch(item)">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				// 搜索关键字
				inputValue:'',
				// 搜索结果列表数据
				searchList:[],
				// 搜索历史记录数据
				historyList:[]
			};
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					this.inputValue=e
					// console.log(e)
					this.getSearchList()
				},500)
				
			},
			// 搜索列表数据请求
			async getSearchList(){
				if(this.inputValue===''){
					this.searchList=[]
					return 
				}
				// const {data:res}=await uni.$http.get("/api/public/v1/goods/qsearch?query="+this.inputValue)
				const {data:res}=await uni.$http.get("/api/public/v1/goods/qsearch",{query:this.inputValue})
				if(res.meta.status!==200) return uni.$showMsg()
				this.searchSeavehistory()
				this.searchList=res.message
			},
			// 对搜索历史记录进行处理
			searchSeavehistory(){
				// 下面操作将搜索历史记录里面的数据进行去重,并且将新搜索的字段添加到历史数据的最后面
				const set=new Set(this.historyList)
				// 删除set数据中的this.inputValue
				set.delete(this.inputValue)
				// 再重新添加this.inputValue
				set.add(this.inputValue)
				this.historyList=Array.from(set)
				// 数据持久化,存储到本地存储
				uni.setStorageSync("kw",JSON.stringify(this.historyList))
			},
			// 跳转到详情页
			gotogoodsDetail(item){
				
				uni.navigateTo({
					url:"/subpkg/goods_detial/goods_detial?goods_id="+item.goods_id
				})
			},
			// 清空历史记录
			clear(){
				this.historyList=[]
				uni.setStorageSync("kw",JSON.stringify("[]"))
			},
			// 点击历史记录回填重新搜索
			// nextSearch(v){
			// 	this.inputValue=v
			// 	this.getSearchList()
			// }
			// 点击历史记录跳转到商品列表页面
			nextSearch(v){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?query="+v
				})
			}
		},
		computed:{
			// 通过计算属性将搜索历史记录进行反转重排
			histories(){
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList=JSON.parse(uni.getStorageSync("kw")||"[]")
		}
	}
</script>

<style lang="scss">
.searchbar{
	background-color: #C00000;
	position: sticky;
	top: 0;
	z-index: 999;
}
.search-item{
	
	border-bottom: 1px solid #ececec;
	display: flex;
	// line-height: 36px;
	font-size: 12px;
	padding: 13px 0px;
	.item{
		padding: 0 5px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		width: 95%;
	}
}
.history-top{
	padding:8px 10px ;
	font-size: 14px;
	// line-height: 28px;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ececec;
	}
	.history-item{
		display: flex;
		flex-wrap: wrap;
		.item-h{
			font-size: 14px;
			padding: 5px;
			background-color: #ececec;
			border: 1px solid #ececec;
			margin: 5px;
		}
	}
</style>
