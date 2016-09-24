function initialShelf()
{
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("shelf")) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (cats.length<1) return false;

	var shelf = document.getElementById("shelf");
	var shelfUl = document.createElement("ul");

	for (var i=0; i<cats.length; i++)
	{
		var shelfLi = document.createElement("li");
		var shelfLiText = document.createTextNode(cats[i]);
		shelfLi.onclick = handleShelfLiClick;
		shelfLi.appendChild(shelfLiText);
		shelfUl.appendChild(shelfLi);
	}
	shelf.appendChild(shelfUl);
}

function handleShelfLiClick()
{
	var content = document.getElementById("content");
	var parent = content.parentNode;
	parent.removeChild(content);

	content = document.createElement("div");
	content.setAttribute("id","content");
	parent.insertBefore(content, parent.firstElementChild);

	var menu = this.firstChild.nodeValue;
	initialContent(menu);
}

function createBookDiv(book)
{
	var bookDiv = document.createElement("div");
	var bookLeftDiv = document.createElement("div");
	var bookRightDiv = document.createElement("div");
	bookDiv.setAttribute("class","book");
	bookLeftDiv.setAttribute("class","book-left");
	bookRightDiv.setAttribute("class","book-right");

	if (book.poster)
	{
		var bookRadius = document.createElement("div");
		bookRadius.setAttribute("class", "book-radius");

		var bookPoster = document.createElement("img");
		bookPoster.setAttribute("class","book-poster");
		bookPoster.setAttribute("src","images\/posters\/"+book.poster);
		bookPoster.setAttribute("alt",book.title);
		bookLeftDiv.appendChild(bookRadius);
		bookRadius.appendChild(bookPoster);
	}	
	
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

	
	if (book.like>0 && book.like<6)
	{
		var bookLike = document.createElement("img");
		bookLike.setAttribute("class","book-like");
		bookLike.setAttribute("src","images\/star"+book.like+".png");
		bookRightDiv.appendChild(bookLike);
	}

	if (book.intro.length>0)
	{
		var bookInfor = document.createElement("a");
		var bookInforIcon = document.createElement("img");
		bookInfor.setAttribute("href","");
		bookInforIcon.setAttribute("class","icon");
		bookInforIcon.setAttribute("src", "images\/infor.png");
		bookInfor.appendChild(bookInforIcon);
		bookRightDiv.appendChild(bookInfor);
	 	
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

	bookDiv.appendChild(bookLeftDiv);
	bookDiv.appendChild(bookRightDiv);
	return bookDiv;
}

function initialContent(cat)
{
	if (!document.getElementById) return false;
	if (!document.getElementById("content")) return false;
	if (!document.createElement) return false;

	var content = document.getElementById("content");
	var fragment = document.createDocumentFragment();
	var firstBook = true;

	for (var i=0; i<books.length; i++)
	{
		var book = books[i];
		if (book.cat != cat) continue;
		var bookDiv = createBookDiv(book);

		if (firstBook)
		{
			var row = document.createElement("div");
			row.setAttribute("class", "row");
			bookDiv.classList.add("first");
			firstBook = false;
		}
		else
		{
			bookDiv.classList.add("second");
			firstBook = true;
		}
		row.appendChild(bookDiv);
		fragment.appendChild(row);	
	}
	content.appendChild(fragment);
}

function addToolBoxEvent()
{
	if (!document.getElementById) return false;
	if (!document.getElementById("tool")) return false;

	var toolBox = document.getElementById("tool");
	var toolItems = toolBox.getElementsByTagName("li");
	var addCat = toolItems[0];
	var delCat = toolItems[1];
	var addSingle = toolItems[2];

	addCat.onclick = handleAddCatOnclick;
	delCat.onclick = handleDelCatOnclick;
	addSingle.onclick = handleAddSingleOnclick;
}

function handleAddCatOnclick()
{
	hideCatPanel();

	var form = document.createElement("form");
	form.method = "post";
	form.action = "#";

	var inputBox = document.createElement("input");
	var okButton = document.createElement("input");
	var noButton = document.createElement("input");
	inputBox.type = "text";
	inputBox.name = "cat-name";
	inputBox.setAttribute("placeholder", "请输入类别名称")
	okButton.type = "button";
	okButton.name = "confirm";
	okButton.value= "确定";
	noButton.type = "button";
	noButton.name = "cancel";
	noButton.value= "取消";

	inputBox.onfocus = handleInputFocus;
	okButton.onclick = handleAddCatOk;
	noButton.onclick = hideCatPanel;

	var addCatPanel = document.createElement("li");
	addCatPanel.setAttribute("id","cat-panel");

	form.appendChild(inputBox)
	form.appendChild(okButton)
	form.appendChild(noButton)
	addCatPanel.appendChild(form);
	this.parentNode.appendChild(addCatPanel);
}

function handleInputFocus()
{
	this.select();
}

function handleAddCatOk()
{
	var form = this.form;
	var inputBox = form.elements["cat-name"];
	var newName = inputBox.value;
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
	cats.push(newName);

	var shelf = document.getElementById("shelf");
	var shelfUl = shelf.getElementsByTagName("ul")[0];
	shelf.removeChild(shelfUl);
	initialShelf();
}

function handleDelCatOnclick()
{
	hideCatPanel();

	var form = document.createElement("form");
	form.method = "post";
	form.action = "#";

	var okButton = document.createElement("input");
	var noButton = document.createElement("input");
	var selectBox = document.createElement("select");
	
	for (var i=0; i<cats.length; i++)
	{
		var option = new Option(cats[i],cats[i]);
		selectBox.appendChild(option);
	}

	selectBox.name = "cat-name";
	okButton.type = "button";
	okButton.name = "confirm";
	okButton.value= "确定";
	noButton.type = "button";
	noButton.name = "cancel";
	noButton.value= "取消";

	okButton.onclick = handleDelCatOk;
	noButton.onclick = hideCatPanel;

	var delCatPanel = document.createElement("li");
	delCatPanel.setAttribute("id","cat-panel");

	form.appendChild(selectBox)
	form.appendChild(okButton)
	form.appendChild(noButton)
	delCatPanel.appendChild(form);
	this.parentNode.appendChild(delCatPanel);
}

function handleDelCatOk()
{
	var delCatName = this.form["cat-name"].value;
	removeByValue(cats, delCatName)

	var shelf = document.getElementById("shelf");
	var shelfUl = shelf.getElementsByTagName("ul")[0];
	shelf.removeChild(shelfUl);
	initialShelf();
	hideCatPanel();
	/*
		这里还应该把该目录书全部删掉
	*/
}

function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}

function handleAddSingleOnclick()
{
	hideCatPanel();
	/*

	添加新内容

	*/
}

function hideCatPanel()
{
	if (!document.getElementById("cat-panel")) return;
	var catPanel = document.getElementById("cat-panel");
	catPanel.parentNode.removeChild(catPanel);
}

addLoadEvent(initialContent,"HTML & CSS");
addLoadEvent(initialShelf);
addLoadEvent(addToolBoxEvent);