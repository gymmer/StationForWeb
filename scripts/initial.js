function initialNav()
{
	if (!document.getElementsByTagName) return false;
	if (!document.getElementsByTagName("nav")) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (cats.length<1) return false;

	var nav = document.getElementsByTagName("nav")[0];
	var navUl = document.createElement("ul");
	nav.appendChild(navUl);

	for (var i=0; i<cats.length; i++)
	{
		var navLi = document.createElement("li");
		var navLiText = document.createTextNode(cats[i]);
		navLi.appendChild(navLiText);
		navUl.appendChild(navLi);
	}
}

function initialContent(cat)
{
	if (!document.getElementById) return false;
	if (!document.getElementById("content")) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;

	var content = document.getElementById("content");

	for (var i=0; i<books.length; i++)
	{
		var book = books[i];
		if (book.cat != cat) continue;
		var bookDiv = document.createElement("div");
		bookDiv.setAttribute("class","book");
		content.appendChild(bookDiv);
		
		if (book.title)
		{
			var bookTitle = document.createElement("p");
			var bookTitleText = document.createTextNode(book.title);
			bookTitle.setAttribute("class","book-title");
			bookTitle.appendChild(bookTitleText);
			bookDiv.appendChild(bookTitle);
		}
		if (book.title2)
		{
			var bookTitle2 = document.createElement("p");
			var bookTitleText2 = document.createTextNode(book.title2);
			bookTitle2.setAttribute("class","book-title2");
			bookTitle2.appendChild(bookTitleText2);
			bookDiv.appendChild(bookTitle2);
		}
		if (book.poster)
		{
			var bookPoster = document.createElement("img");
			bookPoster.setAttribute("class","book-poster");
			bookPoster.setAttribute("src","images\/posters\/"+book.poster);
			bookPoster.setAttribute("alt",book.title);
			bookDiv.appendChild(bookPoster);
		}

		var bookRightDiv = document.createElement("div");
		bookRightDiv.setAttribute("class","book-right");
		bookDiv.appendChild(bookRightDiv);
		
		if (book.like>0 && book.like<6)
		{
			var bookLike = document.createElement("img");
			bookLike.setAttribute("class","book-like");
			bookLike.setAttribute("src","images\/star"+book.like+".png");
			bookRightDiv.appendChild(bookLike);
		}
		if (book.intro.length>0)
		{
			var bookIntro = document.createElement("ul");
			bookIntro.setAttribute("class","book-intro");
			bookRightDiv.appendChild(bookIntro);
		}
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
		if (book.pdf)
		{
			var bookPdf = document.createElement("a");
			var bookPdfIcon = document.createElement("img");
			bookPdf.setAttribute("href","files\/"+book.pdf);
			bookPdf.setAttribute("target","_blank");
			bookPdfIcon.setAttribute("class","book-link");
			bookPdfIcon.setAttribute("src","images\/pdf.png");
			bookPdf.appendChild(bookPdfIcon);
			bookRightDiv.appendChild(bookPdf);
		}
		if (book.library)
		{
			var bookLibrary = document.createElement("a");
			var bookLibraryIcon = document.createElement("img");
			bookLibrary.setAttribute("href",book.library);
			bookLibrary.setAttribute("target","_blank");
			bookLibraryIcon.setAttribute("class","book-link");
			bookLibraryIcon.setAttribute("src","images\/library.png");
			bookLibrary.appendChild(bookLibraryIcon);
			bookRightDiv.appendChild(bookLibrary);
		}
	}
}

function changeTab()
{
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementsByTagName("nav")) return false;
	if (!document.getElementById("content")) return false;
	
	var nav = document.getElementsByTagName("nav")[0];
	var navList = nav.getElementsByTagName("li");

	for (var i=0; i<navList.length; i++)
	{
		navList[i].onclick = function()
		{
			document.body.removeChild(document.getElementById("content"));
			var content = document.createElement("section");
			var footer = document.getElementsByTagName("footer")[0];
			content.setAttribute("id","content");
			document.body.insertBefore(content,footer);

			var menu = this.firstChild.nodeValue;
			initialContent(menu);
			removeFirstSlide();
		}
		navList[i].onmouseover = function()
		{
			this.className = "mouseover";
		}
		navList[i].onmouseout = function()
		{
			this.className = "mouseout";
		}
	}
}

function removeFirstSlide()
{
	if (!document.getElementById) return false;
	if (!document.getElementById("content")) return false;

	var content = document.getElementById("content");
	var firstBook = content.firstChild;
	if (firstBook)
	{
		firstBook.style.backgroundImage = "url()";
	}
}

addLoadEvent(initialNav);
addLoadEvent(initialContent,"HTML & CSS");
addLoadEvent(changeTab);
addLoadEvent(removeFirstSlide);