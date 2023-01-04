<template>
	<view class="my-search" :style="{'background-color':bgColor}">
		<view class="my-serch-box" :style="{'border-radius':borderRadius+'px'}" @click="searchHandlerClick">
			<uni-icons type="search" size="18"></uni-icons>
			<text class="text">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		//定义动态样式
		props:{
		//背景颜色
		bgColor:{
			type:String,
			default:"#C00000"
		},
		//圆角尺寸
		borderRadius:{
			type:Number,
			default:18
		},
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchHandlerClick(){
				// 触发组件的自定义事件
				this.$emit('myclick')
				// console.log('123')
			}
		}
	}
</script>

<style lang="scss">
 .my-search{
	 // background-color: #C00000;
	  
	  height: 50px;
	  display: flex;
	  align-items: center;
	  padding: 0 10px;
	  .my-serch-box{
		  width: 100%;
		  height: 36px;
		  // margin-top: 8px;
		  
		  // border-radius: 18px;
		  background-color: #fff;
		  text-align: center;
		  line-height: 36px;
		  .text{
			  font-size :16px;
			  margin-left: 5px;
			  
			  
		  }
	  }
 }
</style>