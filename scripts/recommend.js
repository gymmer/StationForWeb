var referBook = [
	{
		title:"w3school",
		link:"http://www.w3school.com.cn/"
	},
	{
		title:"菜鸟教程",
		link:"http://www.runoob.com/"
	},
	{
		title:"自强学堂",
		link:"http://www.ziqiangxuetang.com/"
	},
	{
		title:"手册网",
		link:"http://www.shouce.ren/"
	},
	{
		title:"W3Cfuns-资源",
		link:"http://www1.w3cfuns.com/feres.php"
	},
	{
		title:"幕客",
		link:"http://www.imooc.com/"
	}
]

var techTeaching = [
	{
		title:"ECMAScript 6",
		link:"http://es6.ruanyifeng.com/" 
	},
	{
		title:"JavaScript",
		link:"http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000"
	},
	{
		title:"Bootstrap",
		link:"http://www.runoob.com/bootstrap/bootstrap-tutorial.html"
	},
	{
		title:"Django",
		link:"http://www.ziqiangxuetang.com/django/django-tutorial.html"
	},
	{
		title:"Git",
		link:"http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000"
	},
	{
		title:"Font Awesome",
		link:"http://fontawesome.dashgame.com/"
	},
	{
		title:"Sublime",
		link:"http://www.cnblogs.com/manfredHu/p/4941307.html"
	},
	{
		title:"Python科学计算",
		link:"http://old.sebug.net/paper/books/scipydoc/index.html"
	},
	{
		title:"MySQL",
		link:"http://www.cnblogs.com/mr-wid/archive/2013/05/09/3068229.html#d1"
	}
]

var recommendWeb = [
	{
		title:"BootCDN",
		link:"http://www.bootcdn.cn/"
	},
	{
		title:"CSS禅意花园",
		link:"http://www.csszengarden.com/"
	},
	{
		title:"色轮",
		link:"https://color.adobe.com/zh/create/color-wheel/?base=2&rule=Analogous&selected=2&name=我的 Color 主題&mode=rgb&rgbvalues=0.03203312036748851,0.10985207970366584,1,0.017198723902626816,0.3101637032416498,0.91,0.06889969659629325,0.6051095421295232,1,0.04862681773976891,0.7580843076126083,0.91,0.018899696596293203,1,0.9246810445080357&swatchOrder=0,1,2,3,4"
	},
	{
		title:"配色表",
		link:"http://www.wufangbo.com/demo/tool/16/index.html"
	},
	{
		title:"有字库",
		link:"http://www.youziku.com/"
	},
	{
		title:"JavaScript在线压缩",
		link:"http://tool.css-js.com/"
	},
	{
		title:"MarkDown在线编辑",
		link:"http://mahua.jser.me/"
	},
	{
		title:"猪八戒网",
		link:"http://www.zbj.com/wzkf/"
	},
	{
		title:"Chrome调试台主题",
		link:"http://mikeking.io/devtools-author/"
	},
	{
		title:"Chrome开发者工具系列",
		link:"http://www.cnblogs.com/constantince/p/4565261.html"
	}
]

var experience = [
	{
		title:"迷茫中，求建议",
		link:"https://bbs.byr.cn/#!article/Job/1792956"
	},
	{
		title:"各位都是怎么找到第一份前端的实习的呢？求指导求拍醒",
		link:"https://bbs.byr.cn/#!article/WWWTechnology/32365"
	},
	{
		title:"[完结]写给想要做前端的同学",
		link:"https://bbs.byr.cn/#!article/WWWTechnology/35955"
	},
	{
		title:"给初心者的前端练级攻略",
		link:"https://bbs.byr.cn/#!article/WWWTechnology/38487"
	},
	{
		title:"[经历] 2016届 前端岗找工作经历",
		link:"https://bbs.byr.cn/#!article/WWWTechnology/37938"
	},
	{
		title:"筛选简历规则zz",
		link:"http://bbs.cloud.icybee.cn/article/Job/501796"
	},
	{
		title:"今天帮公司筛选简历，谈谈感受",
		link:"http://bbs.cloud.icybee.cn/article/Job/116934"
	},
	{
		title:"今天看简历的一点感想（转载强烈建议找工作的同学看一下）",
		link:"http://bbs.cloud.icybee.cn/article/Job/51399"
	},
	{
		title:"[原创]怎样写简历及其它",
		link:"http://bbs.cloud.icybee.cn/article/ParttimeJob/117190"
	},
	{
		title:"[建议]该如何写简历",
		link:"http://bbs.cloud.icybee.cn/article/Focus/48785"
	}
]

/*
	创建单个推荐的div
*/
function createRecommendDiv(elemId,array)
{
	if (!document.getElementById) return false;
	if (!document.getElementById(elemId)) return false;
	if (!document.createElement) return false;

	var elem = document.getElementById(elemId);
	var recommendUl = document.createElement("ul");
	for (var i=0; i<array.length; i++)
	{
		var recommendLi = document.createElement("li");
		var recommendLink = document.createElement("a");
		recommendLink.setAttribute("href", array[i].link);
		recommendLink.setAttribute("target", "_blank")
		recommendLink.appendChild(document.createTextNode(array[i].title));
		recommendLi.appendChild(recommendLink);
		recommendUl.appendChild(recommendLi);
	}
	elem.appendChild(recommendUl);
}

/*
	初始化所有的推荐div
*/
function initialRecommend()
{
	createRecommendDiv("refer-book",referBook);
	createRecommendDiv("tech-teaching",techTeaching);
	createRecommendDiv("recommend-web",recommendWeb);
	createRecommendDiv("experience",experience);
}

addLoadEvent(initialRecommend);