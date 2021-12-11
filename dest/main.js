// bật tất nav
let nav = document.querySelector('.nav');
let btnmenu = document.querySelector('.btnmenu');

btnmenu.onclick = function () {
    nav.classList.toggle('active');
    this.classList.toggle('active');
}
// thay đổi ngôn ngữ
let lang = document.querySelector('.lang');
let langCurrent = document.querySelector('.lang .lang__current span');
let langOpt = document.querySelector('.lang .lang__option');
let langItems = document.querySelectorAll('.lang .lang__option a')
lang.addEventListener('click' , function(e) {
    e.stopPropagation();
    langOpt.classList.toggle('active')
})
langItems.forEach(function(item) {
    item.addEventListener('click' ,function() {
        let langText = this.textContent;
        let langCurrentSpan = langCurrent.textContent;
        langCurrent.innerHTML = langText;
        this.innerHTML = langCurrentSpan;
    })
})  
document.addEventListener('click' , function() {
    langOpt.classList.remove('active')
})

// xử lý tạo background cho header khi scroll
let header = document.querySelector('header');
let slider = document.querySelector('.slider');
let heightSlider = slider.clientHeight;
let heightHeader = header.clientHeight;

document.addEventListener('scroll' , function() {
    let scrollY = window.pageYOffset;
    if(scrollY > (heightSlider - heightHeader)) {
        header.classList.add('active')
    } else {
        header.classList.remove('active')
    }
})

// xử lý nút back to top

let backtotop = document.querySelector('.totop');
let getHeightWindow = window.innerHeight;
document.addEventListener('scroll', function() {
    let scrollY = window.pageYOffset;
    if(scrollY > getHeightWindow) {
        backtotop.classList.add('active')
    } else {
        backtotop.classList.remove('active')
    }
})
backtotop.addEventListener('click' , function() {
    window.scrollTo({
        top: 0 
    })
})

// xử lý pupop video 

let btnVideos = document.querySelectorAll('.play_button');
let popVideo = document.querySelector('.popup__video');
let btnClose = document.querySelector('.popup__video  .close');
let iframe = document.querySelector('.popup__video iframe')
btnVideos.forEach(function(btnVideo) {
    btnVideo.addEventListener('click' , function() {
        let videoSrc = btnVideo.getAttribute('data-video-src');
        iframe.setAttribute('src' ,'https://www.youtube.com/embed/' + videoSrc)
        popVideo.classList.add('active')
    })
})

btnClose.addEventListener('click', function(e) {
    iframe.setAttribute('src' , '')
    popVideo.classList.remove('active')
    e.stopPropagation()
})
popVideo.addEventListener('click' , function() {
    iframe.setAttribute('src' , '')
    popVideo.classList.remove('active')
})

// xử lý menu khi scroll và kích
let menus = document.querySelectorAll('header .menu a');
let sections = [];
function removeActiveMenu() {
    menus.forEach(function(element) {
        element.classList.remove('active')
    })
}

menus.forEach(function(menu) {
    let className = menu.getAttribute('href').replace('#' , '');
    let section = document.querySelector('.' + className);
    sections.push(section);
    menu.addEventListener('click' , function(e) {
        e.preventDefault();
        window.scrollTo({
            top : section.offsetTop - heightHeader + 1
        }) 
        removeActiveMenu()
        menu.classList.add('active')
    })
})
window.addEventListener('scroll' , function() {
    let positionScroll = window.pageYOffset;
    sections.forEach(function(section ,index) {
        if(positionScroll > section.offsetTop - heightHeader && positionScroll < section.offsetTop + section.offsetHeight) {
            removeActiveMenu();
            menus[index].classList.add('active')
        } else {
            menus[index].classList.remove('active')
        }
    })
})  

// xử lý các nút control 

// let listItemSlider = document.querySelectorAll('.slider__item');
// let number = document.querySelector('.slider__bottom-paging .number');
// let dot = document.querySelectorAll('.slider__bottom-paging .dotted li')
// let currentSlider = 0;
// listItemSlider.forEach(function(item , index ) {
//     if( item.classList.contains('.active')) {
//         currentSlider = index;
//     }
// })
// function showNumber(index) {
//     number.innerHTML = (index).toString().padStart('2', '0')
// }
// /// đây là default
// showNumber(currentSlider + 1)
// console.log(currentSlider)
// dot[currentSlider].classList.add('active');

// function goTo(index) {
//     listItemSlider[currentSlider].classList.remove('active');
//     listItemSlider[index].classList.add('active')
//     dot[currentSlider].classList.remove('active');
//     dot[index].classList.add('active');
//     currentSlider = index;
//     showNumber(currentSlider + 1)
// }

// dot.forEach(function(li , index) {
//     li.addEventListener('click' ,function() {
//         goTo(index)
//     })
// })
// document.querySelector('.btnctr.next').addEventListener('click' ,function() {
//     if(currentSlider < listItemSlider.length -1 ) {
//         goTo(currentSlider + 1)
//     } else {
//         goTo(0)
//     }
// })
// document.querySelector('.btnctr.prev').addEventListener('click' ,function() {
//     if(currentSlider > 0) {
//         goTo(currentSlider - 1)
//     } else {
//         goTo(listItemSlider.length -1)
//     }
// })

//thử viện flickity



let $carousel = $('.slider__item-wrap');
$carousel.flickity({
    //options
    cellAlign:'left',
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    on : {
        ready: function () {
            let dotted = $('.flickity-page-dots')
            paging = $('.slider__bottom-paging .dotted')
            dotted.appendTo(paging)
        },
        change: function (index) {
            let number = $('.slider__bottom-paging .number');
            let indexPage = index + 1 ;
            number.text(indexPage.toString().padStart(2,0))
        }
    }
    
})
$('.slider__bottom-control .prev').on('click' , function() {
    $carousel.flickity('previous');
    
})
$('.slider__bottom-control .next').on('click' , function() {
    $carousel.flickity('next')
})

let $carousel1 = $('.photos');
$carousel1.flickity({
    //options
    cellAlign:'left',   
    contain: true,
    wrapAround: true,
    prevNextButtons: true,
    freeScroll: true,
})


// thư viện photoswipe
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

$( window ).on("load", function() {
    // Handler for .load() called.
    initPhotoSwipeFromDOM('.carousel-img');
});

