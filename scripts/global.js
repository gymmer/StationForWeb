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
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}