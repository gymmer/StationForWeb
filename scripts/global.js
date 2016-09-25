/*
	window.onload 注册函数
*/
function addLoadEvent(func,args)
{
	var oldFunc = window.onload;
	if (typeof window.onload != "function")
	{
		window.onload = function()
		{
			func(args);
		}
	}
	else
	{
		window.onload = function()
		{
			oldFunc();
			func(args);
		}
	}
}

/*
	window.onscroll 注册函数
*/
function addScrollEvent(func,args)
{
	var oldFunc = window.onscroll;
	if (typeof window.onscroll != "function")
	{
		window.onscroll = function()
		{
			func(args);
		}
	}
	else
	{
		window.onscroll = function()
		{
			oldFunc();
			func(args);
		}
	}
}

/*
	从数组arr中删除值为val的元素
*/
function removeByValue(arr, val) 
{
  for(var i=0; i<arr.length; i++)
  {
    if(arr[i] == val) 
    {
      arr.splice(i, 1);
      break;
    }
  }
}

/*
	判断str不是非空字符串的话，返回true
*/
function isNotEmptyString(str)
{
	if (typeof str == "string" && str!="")
	{
		return true;
	}
}

// 创建<form>
function createForm(method,action,id)
{
	var form = document.createElement("form");
	if (isNotEmptyString(method)) 		form.method = method;
	if (isNotEmptyString(action)) 		form.action = action;
	if (isNotEmptyString(id))			form.id = id;
	return form;
}
	
/*
	创建一个<input>表单
*/
function createInputForm(type,name,value)
{
	var input = document.createElement("input");	
	if (isNotEmptyString(type))		input.type = type;
	if (isNotEmptyString(name))		input.name = name;
	if (isNotEmptyString(value))	input.value= value;
	return input;
}

/*
	创建一个<select>表单,其<option>的value来自于数组
*/
function createSelectForm(name,arr)
{
	var select = document.createElement("select");
	if (isNotEmptyString(name))		select.name = name;
	for (var i=0; i<cats.length; i++)
	{
		var str = cats[i];
		if (isNotEmptyString(str))
		{
			var option = new Option(str,str);
			select.appendChild(option);	
		}
	}
	return select;
}

/*
	弹性返回顶部
	页面滚动条处于低端,点击回到顶部，并且隐藏掉
	http://www.jb51.net/article/38228.htm
*/
function goToTop() 
{ 
	var obj = document.getElementById("go-to-top"); 

	function getScrollTop() 
	{ 
		return document.documentElement.scrollTop + document.body.scrollTop; 
	} 

	function setScrollTop(value) 
	{ 
		if (document.documentElement.scrollTop) 
		{ 
			document.documentElement.scrollTop = value; 
		} 
		else 
		{ 
			document.body.scrollTop = value; 
		} 
	} 

	function handleWindowScroll()
	{
		getScrollTop() > 0 ? obj.style.display = "block": obj.style.display = "none"; 
	}

	addScrollEvent(handleWindowScroll);
	obj.onclick = function() 
	{ 
		var goTop = setInterval(scrollMove, 10); 
		function scrollMove() 
		{ 
			setScrollTop(getScrollTop() / 1.1); 
			if (getScrollTop() < 1) clearInterval(goTop); 
		} 
	} 
}

addLoadEvent(goToTop);