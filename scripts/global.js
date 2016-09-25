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