var imgWidth = 1000;
var titleLeftDist = 40;
var titleTopDist = 50;
var autoSlideIntervaval = 3000;

var slider = [
  {
    img:"1.jpg",
    intro:"前端小站--分享前端资源",
    link:"index.html"
  },
  {
    img:"2.jpg",
    intro:"没错，画的就是你",
    link:"about.html"
  },
  {
    img:"3.jpg",
    intro:"纸上得来终觉浅，绝知此事要躬行",
    link:"book.html"
  },
  {
    img:"4.jpg",
    intro:"巨人的肩膀这么多，站谁身上好呢",
    link:"recommend.html"
  },
  {
    img:"5.jpg",
    intro:"我不生产代码，我只是GitHub的搬运工",
    link:"https://github.com/gymmer/StationForWeb"
  }
]

function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}

/*
    初始化轮播组件
*/
function initialSlider()
{
  // 1.创建图片及标题
  var sliderImg = document.getElementById("slider-img");
  var fragment = document.createDocumentFragment();
  for (var i=0; i<slider.length; i++)
  {
    // 图片
    var sliderItem = slider[i];
    var img = document.createElement("img");
    img.setAttribute("src","images\/slider\/"+sliderItem.img);
    img.setAttribute("id","img-"+i);
    img.setAttribute("alt",sliderItem.intro);
    img.style.left = i*imgWidth+"px";
    img.style.top = "0px";

    // 标题
    var title = document.createElement("a");
    title.setAttribute("href",sliderItem.link);
    title.setAttribute("id","title-"+i);
    title.style.left = (titleLeftDist+i*imgWidth)+"px";
    title.style.top = titleTopDist+"px";
    title.appendChild(document.createTextNode(sliderItem.intro));

    // 追加到DOM
    var item = document.createElement("div");
    item.appendChild(img);
    item.appendChild(title);
    fragment.appendChild(item);
  }
  sliderImg.appendChild(fragment);

  // 2.创建上一张、下一张
  if (slider.length>1)
  {
    // 上一张
    var pre = document.createElement("div");
    pre.setAttribute("id","pre");
    pre.style.left = (-40)+"px";
    pre.innerHTML = "<span class='arrow'>‹</span>";

    // 下一张
    var next = document.createElement("div");
    next.setAttribute("id","next");
    next.style.right = (-40)+"px";
    next.innerHTML = "<span class='arrow'>›</span>";

    // 追加到DOM
    var sliderIndex = document.getElementById("slider-index");
    sliderIndex.appendChild(pre);
    sliderIndex.appendChild(next);
  }

  // 3.创建导航点
  var fragment = document.createDocumentFragment();
  for (var i=0; i<slider.length; i++)
  {
    var dotSpan = document.createElement("span");
    dotSpan.setAttribute("id","dot-"+i)
    dotSpan.className = "unactive";
    fragment.appendChild(dotSpan);
  }
  fragment.firstElementChild.className = "active";
  var sliderDot = document.getElementById("slider-dot");
  sliderDot.appendChild(fragment);
}

/*
    为轮播组件添加动作
*/
function addSliderMovement()
{
  // 所有可能用到的DOM对象
  var slider = document.getElementById("slider");
  var sliderImg = document.getElementById("slider-img");
  var sliderDot = document.getElementById("slider-dot");
  var imgs   = sliderImg.getElementsByTagName("img");
  var titles = sliderImg.getElementsByTagName("a");
  var dots   = sliderDot.getElementsByTagName("span");
  var pre  = document.getElementById("pre");
  var next = document.getElementById("next");
  var getLeft = function(elem){ return parseInt(elem.style.left) }
  var setLeft = function(elem,value) { elem.style.left = value+"px"; }
  imgs.currIndex = 0;   // 用于让导航点知道，哪张图片被显示

  // 使第index个导航点处于激活状态
  var setDotActice = function(index)
  {
    // 重置导航点的颜色
    for (var i=0; i<dots.length; i++)
    {
      dots[i].className = "unactive";  
    }
    // 更新导航点的颜色
    dots[index].className = "active";
  }

  // 显示上一张图片
  var slideToPre = function()
  {
    imgs.currIndex --;

    // 边界情况
    if (getLeft(imgs[0])>=0)
    {
        for (var i=0; i<imgs.length; i++)
        {
          setLeft(imgs[i],  (i-imgs.length)*imgWidth);
          setLeft(titles[i],(i-imgs.length)*imgWidth+titleLeftDist);
        }
        imgs.currIndex = imgs.length-1;
    }

    // 把每一个img和title都向右移动imgWidth距离
    for (var i=0; i<imgs.length; i++)
    {
      moveElement("img-"+i,  getLeft(imgs[i])+imgWidth,0,5);
      moveElement("title-"+i,getLeft(titles[i])+imgWidth,titleTopDist,5);
    } 
    // 更新导航点的颜色
    setDotActice(imgs.currIndex);
  }

  // 显示下一张图片
  var slideToNext = function()
  {
    imgs.currIndex ++;

    // 边界情况
    if (getLeft(imgs[imgs.length-1])<=0)
    {
        for (var i=0; i<imgs.length; i++)
        {
          setLeft(imgs[i],  (i+1)*imgWidth);
          setLeft(titles[i],(i+1)*imgWidth+titleLeftDist);
        }
        imgs.currIndex = 0;
    }

    // 把每一个img和title都向右移动imgWidth距离
    for (var i=0; i<imgs.length; i++)
    {
      moveElement("img-"+i,  getLeft(imgs[i])-imgWidth,0,5);
      moveElement("title-"+i,getLeft(titles[i])-imgWidth,titleTopDist,5);
    } 
    // 更新导航点的颜色
    setDotActice(imgs.currIndex);
  }

  // 上一张、下一张按钮的onclick
  next.onclick = slideToNext;
  pre.onclick  = slideToPre;

  // 自动轮播下一张。
  var timer = setInterval(slideToNext,autoSlideIntervaval);

  // 鼠标移到组件上，暂停轮播，显示上一张/下一张
  slider.onmouseover = function()
  {
    clearInterval(timer);
    pre.style.left = "40px";
    next.style.right = "40px"
  }
  // 鼠标离开组件， 恢复轮播，隐藏上一张/下一张
  slider.onmouseout = function()
  {
    timer = setInterval(slideToNext,autoSlideIntervaval);
    pre.style.left = "-40px";
    next.style.right = "-40px";
  }

  // 每个导航点的onclick
  for (var i=0; i<dots.length; i++)
  {
    dots[i].onclick = function()
    {
      var currIndex = imgs.currIndex;
      var targIndex = this.getAttribute("id").split("-")[1];
      for (var j=0; j<imgs.length; j++)
      {
        moveElement("img-"+j,  getLeft(imgs[j])+(currIndex-targIndex)*imgWidth,0,5);
        moveElement("title-"+j,getLeft(titles[j])+(currIndex-targIndex)*imgWidth,titleTopDist,5);
      }

      // 更新导航点的颜色
      imgs.currIndex = targIndex;
      setDotActice(imgs.currIndex);
    }
  }
}

addLoadEvent(initialSlider);
addLoadEvent(addSliderMovement);