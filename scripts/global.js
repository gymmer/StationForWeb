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