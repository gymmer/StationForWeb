/*
	初始化书架
*/
function initialShelf()
{
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("shelf")) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (cats.length<1) return false;

	var shelf = document.getElementById("shelf");
	var shelfUl = document.createElement("ul");

	// 向书架的<ul>中添加<li>
	for (var i=0; i<cats.length; i++)
	{
		var shelfLi = document.createElement("li");
		shelfLi.appendChild(document.createTextNode(cats[i]));
		shelfUl.appendChild(shelfLi);

		// 每一个<li>的onclick。根据<li>中文本更新左侧content
		shelfLi.onclick = function()
		{
			initialContent(this.firstChild.nodeValue)
		};
	}
	shelf.appendChild(shelfUl);
}

/*
	创建每本书的<div>
*/
function createBookDiv(book)
{
	// 每本书的<div>分为左、右两部分
	var bookDiv = document.createElement("div");
	var bookLeftDiv = document.createElement("div");
	var bookRightDiv = document.createElement("div");
	bookDiv.setAttribute("class","book");
	bookLeftDiv.setAttribute("class","book-left");
	bookRightDiv.setAttribute("class","book-right");

	// 左侧的圆角
	var bookRadius = document.createElement("div");
	bookRadius.setAttribute("class", "book-radius");
	bookLeftDiv.appendChild(bookRadius);

	// 左侧的封面。若没提供封面，用默认的
	var bookPoster = document.createElement("img");
	var src = book.poster?("images\/posters\/"+book.poster):("images\/poster.jpg");
	bookPoster.setAttribute("class","book-poster");
	bookPoster.setAttribute("src",src);	
	bookPoster.setAttribute("alt",book.title);
	bookRadius.appendChild(bookPoster);	
	
	// 右侧的标题、副标题
	if (book.title)
	{
		var bookTitle = document.createElement("p");
		var bookTitleText = document.createTextNode(book.title);
		bookTitle.setAttribute("class","book-title");
		bookTitle.appendChild(bookTitleText);
		bookRightDiv.appendChild(bookTitle);
	}
	if (book.title2)
	{
		var bookTitle2 = document.createElement("p");
		var bookTitleText2 = document.createTextNode(book.title2);
		bookTitle2.setAttribute("class","book-title2");
		bookTitle2.appendChild(bookTitleText2);
		bookRightDiv.appendChild(bookTitle2);
	}

	// 右侧的喜爱星级
	if (book.like>0 && book.like<6)
	{
		var bookLike = document.createElement("img");
		bookLike.setAttribute("class","book-like");
		bookLike.setAttribute("src","images\/star"+book.like+".png");
		bookRightDiv.appendChild(bookLike);
	}

	// 右侧的图标：信息
	if (book.intro.length>0)
	{
		var bookInfor = document.createElement("a");
		var bookInforIcon = document.createElement("img");
		bookInfor.setAttribute("href","");
		bookInforIcon.setAttribute("class","icon");
		bookInforIcon.setAttribute("src", "images\/infor.png");
		bookInfor.appendChild(bookInforIcon);
		bookRightDiv.appendChild(bookInfor);
	 	
	 	// 介绍的<ul>。每条介绍作为一个<li>
	 	var bookIntro = document.createElement("ul");
	 	bookIntro.setAttribute("class","book-intro");

	 	for (quote in book.intro)
	 	{
	 		if (quote)
			{
				var bookInroItem = document.createElement("li");
				var bookIntroText = document.createTextNode(book.intro[quote]);
				bookInroItem.appendChild(bookIntroText);
				bookIntro.appendChild(bookInroItem);
			}
	 	}
		bookRightDiv.appendChild(bookIntro);
		bookInforIcon.bookIntro = bookIntro;

		// 鼠标移到图标上，才显示介绍的<ul>。移走则隐藏。
		bookInforIcon.onmouseover = function()
		{
			this.bookIntro.style.display = "block";
		}

		bookInforIcon.onmouseout = function()
		{
			this.bookIntro.style.display = "none";
		}
		bookInfor.onclick = function()
		{
			return false;
		}
	}

	// 右侧的图标：PDF
	if (book.pdf)
	{
		var bookPdf = document.createElement("a");
		var bookPdfIcon = document.createElement("img");
		bookPdf.setAttribute("href",pdfFilesPath+book.pdf);
		bookPdf.setAttribute("title","查看PDF");
		bookPdf.setAttribute("target","_blank");
		bookPdfIcon.setAttribute("class","icon");
		bookPdfIcon.setAttribute("src","images\/pdf.png");
		bookPdf.appendChild(bookPdfIcon);
		bookRightDiv.appendChild(bookPdf);
	}

	// 右侧的图标：图书馆
	if (book.library)
	{
		var bookLibrary = document.createElement("a");
		var bookLibraryIcon = document.createElement("img");
		bookLibrary.setAttribute("href",book.library);
		bookLibrary.setAttribute("title","查看北师大图书馆资源");
		bookLibrary.setAttribute("target","_blank");
		bookLibraryIcon.setAttribute("class","icon");
		bookLibraryIcon.setAttribute("src","images\/library.png");
		bookLibrary.appendChild(bookLibraryIcon);
		bookRightDiv.appendChild(bookLibrary);
	}

	// 把左、右两部分加入到book的<div>中
	bookDiv.appendChild(bookLeftDiv);
	bookDiv.appendChild(bookRightDiv);
	return bookDiv;
}

/*
	初始化左边的书籍列表，这些书都属于cat类
*/
function initialContent(cat)
{
	if (!document.getElementById) return false;
	if (!document.getElementById("content")) return false;
	if (!document.createElement) return false;

	var content = document.getElementById("content");
	content.className = cat;
	content.innerHTML = "";
	var fragment = document.createDocumentFragment();
	var firstBook = true;

	// 分别显示每一本属于cat类的书
	for (var i=0; i<books.length; i++)
	{
		var book = books[i];
		if (book.cat != cat) continue;
		var bookDiv = createBookDiv(book);
		fragment.appendChild(bookDiv);	
	}
	content.appendChild(fragment);


	// 如果该类别没有书，给出提示信息
	if (!content.innerHTML)
	{
		content.innerHTML = '<p class="no-book-intro">尚无'+cat+'类的图书<br>在工具箱中添加单册吧！</p>';
		
		//添加一个按钮（添加单册）。这个按钮和工具->添加单册的<li>共享onclick，
		var form = createForm("post","#");
		var button = createInputForm("button","add-single","添加单册");
		button.className = "no-book-button";
		button.onclick = handleAddSingleOnclick;
		form.appendChild(button);
		content.appendChild(form);
	}
}

/*
	为工具箱中每个选项指定onclick
*/
function addToolBoxEvent()
{
	if (!document.getElementById) return false;
	if (!document.getElementById("tool")) return false;

	// 得到每个选项的<li>
	var toolBox = document.getElementById("tool");
	var toolItems = toolBox.getElementsByTagName("li");
	var addCat = toolItems[0];
	var delCat = toolItems[1];
	var addSingle = toolItems[2];

	// 为每个<li>指定onclick
	addCat.onclick = handleAddCatOnclick;
	delCat.onclick = handleDelCatOnclick;
	addSingle.onclick = handleAddSingleOnclick;
}

/*
	添加类别的onclick。在工具箱最下边显示<form>
*/
function handleAddCatOnclick()
{
	hideCatPanel();

	// 创建<form>，包括一个输入框（输入类别名）、确认按钮、取消按钮
	var form = createForm("post","#");
	var inputBox = createInputForm("text","cat-name")
	var okButton = createInputForm("button","confirm","确定")
	var noButton = createInputForm("button","cancel","取消")	
	inputBox.setAttribute("placeholder", "请输入类别名称")

	// 输入框聚焦后，自动选择文本
	inputBox.onfocus = function(){this.select();};
	// 为确认、取消按钮指定onclick。如果取消，只是删除<form>达到隐藏
	okButton.onclick = handleAddCatOk;
	noButton.onclick = hideCatPanel;

	// 把<form>及其元素显示在工具箱最下边
	var catPanel = document.createElement("li");
	catPanel.setAttribute("id","cat-panel");

	form.appendChild(inputBox)
	form.appendChild(okButton)
	form.appendChild(noButton)
	catPanel.appendChild(form);
	this.parentNode.appendChild(catPanel);
}

/*
	添加类别时点了确认按钮的onclick
*/
function handleAddCatOk()
{
	// 获得输入框中的文本，即待加入的新类别名
	var form = this.form;
	var inputBox = form.elements["cat-name"];
	var newName = inputBox.value;

	// 检查表单。未输入类别名称、该名称已存在，则非法
	if (newName.length<1)
	{
		alert("请输入有效名称！")
		return;
	}
	for (var i=0; i<cats.length; i++)
	{
		if(cats[i].indexOf(newName)!=-1)
		{
			alert("该类别已经存在！");
			return;
		}
	}

	// 向cats中加入新的类别名
	cats.push(newName);

	// 加入类别名后，<input>要重置为空
	inputBox.value = "";

	// 加入新类别名后，边栏的书架也要更新,增加新类别的<li>
	var shelf = document.getElementById("shelf");
	var shelfUl = shelf.getElementsByTagName("ul")[0];
	var newLi = document.createElement("li");
	newLi.appendChild(document.createTextNode(newName));
	newLi.onclick = function()
	{
		initialContent(this.firstChild.nodeValue)
	};
	shelfUl.appendChild(newLi);
}

/*
	删除类别的onclick。在工具箱最下边显示<form>
*/
function handleDelCatOnclick()
{
	hideCatPanel();

	// 创建<form>,包括一个选择框（显示已有类别）、确认按钮、取消按钮
	var form = createForm("post","#");
	var selectBox = createSelectForm("cat-name",cats);
	var okButton = createInputForm("button","confirm","确定")
	var noButton = createInputForm("button","cancel","取消")

	// 为确认、取消按钮指定onclick。如果取消，只是删除<form>达到隐藏
	okButton.onclick = handleDelCatOk;
	noButton.onclick = hideCatPanel;

	// 把<form>及其元素显示在工具箱最下边
	var catPanel = document.createElement("li");
	catPanel.setAttribute("id","cat-panel");

	form.appendChild(selectBox)
	form.appendChild(okButton)
	form.appendChild(noButton)
	catPanel.appendChild(form);
	this.parentNode.appendChild(catPanel);
}

/*
	删除类别时点了确认按钮的onclick
*/
function handleDelCatOk()
{
	// 如果已经没有类别了，没有必要做其他了
	if (cats.length==0) 
	{
		alert("已经将所有类别都删光啦！");
		return;
	}

	// 从cats中删除该类别名。首先获得选择框的选中项，即待删除的类别
	var selectBox = this.form["cat-name"];
	var delCatName = selectBox.value;
	removeByValue(cats, delCatName);

	// 删除类别名后，<select>要更新
	selectBox.options.remove(selectBox.selectedIndex);

	// 删除类别名后，边栏的书架也要更新,找到该类别并删除
	var shelf = document.getElementById("shelf");
	var shelfLiItems = shelf.getElementsByTagName("li");
	for (var i=0; i<shelfLiItems.length; i++)
	{
		var shelfLi = shelfLiItems[i];
		if (delCatName == shelfLi.firstChild.nodeValue)
		{
			shelfLi.parentNode.removeChild(shelfLi);
		}
	}
	
	// 如果恰巧删的类别，就是左侧图书所属的类别，则左侧也重绘
	var content = document.getElementById("content");
	if (delCatName == content.className)
	{
		initialContent(cats[0]);
	}

	// 如果删完这个类别，cats空了，左侧content给出提示信息
	if (cats.length==0) 
	{
		content.innerHTML = '<p class="no-book-intro">已经将所有类别都删光啦！<br>在工具箱中添加书目吧！</p>';
	}

	/*
		这里还应该把该类别书从books中全部删掉
		！！！！！ 未完待续 ！！！！！
	*/
}

/*
	添加单册的onclick
*/
function handleAddSingleOnclick()
{
	hideCatPanel();
	alert("程序员正在开发这个功能，\n\n命本对话框先来占坑~~\n");
	/*

	添加新内容
	！！！！！ 未完待续 ！！！！！
	*/
}

/*
	删除工具箱中的<form>，达到隐藏的效果
*/
function hideCatPanel()
{
	if (!document.getElementById("cat-panel")) return;
	var catPanel = document.getElementById("cat-panel");
	catPanel.parentNode.removeChild(catPanel);
}

addLoadEvent(initialContent,cats[0]);
addLoadEvent(initialShelf);
addLoadEvent(addToolBoxEvent);