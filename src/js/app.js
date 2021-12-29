document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // HEIGHT HEADER
    let header = document.querySelector('.header__wrapper'); // header
    let headerh = header ? header.getBoundingClientRect().height : 0; // height header
    document.documentElement.style.setProperty('--headerh', `${headerh}px`);

    // RESIZE
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        let headerh = header ? header.getBoundingClientRect().height : 0; // height header
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--headerh', `${headerh}px`);
    });

    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // ALL LINKS SMOOTH SCROLL
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                setTimeout(() => {
                    if (item.getAttribute('href').length > 1) {
                        smoothScroll(item.getAttribute('href').slice(1))
                    }
                }, 500);
            })
        })
    }

    // ADD CLASS
    const addClassBtn = document.querySelectorAll('.add-class__btn')

    if (addClassBtn) {
        addClassBtn.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
    
                item.parentNode.parentNode.classList.add('add-class--active')
            })
        })
    }
    
    // TABS
    const mainTabsItems = document.querySelectorAll('.main-tabs__tab')
    const tabsItems = document.querySelectorAll('.tabs__tab')

    if (mainTabsItems) {
        mainTabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.main-tabs__item').forEach((child) => child.classList.remove('main-tabs__item--active'))
                document.querySelectorAll('.main-tabs__content').forEach((child) => child.classList.remove('main-tabs__content--active'))
    
                item.parentNode.classList.add('main-tabs__item--active')
                document.querySelectorAll('.main-tabs__content')[i].classList.add('main-tabs__content--active')
            })
        })
    }

    if (tabsItems) {
        tabsItems.forEach((item, i) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.tabs__item').forEach((child) => child.classList.remove('tabs__item--active'))
                document.querySelectorAll('.tabs__content').forEach((child) => child.classList.remove('tabs__content--active'))
    
                item.parentNode.classList.add('tabs__item--active')
                document.querySelectorAll('.tabs__content')[i].classList.add('tabs__content--active')
            })
        })
    }
    
    // MODAL
    const modalBtn = document.querySelectorAll('.modal-btn')
    const modal = document.querySelectorAll('.modal')
    const modalClose = document.querySelectorAll('.modal__close')
    const modalOverlay = document.querySelector('.modal-overlay')
    
    if (modalBtn) {
        modalBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                if (!modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.add('modal-overlay--active')
                }
                document.body.classList.add('scroll-disabled')

                const modalID = item.dataset.id
                document.getElementById(modalID).classList.add('modal--active')
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (modal && modalOverlay.classList.contains('modal-overlay--active')) {
            if (key == 27) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            };
        }
    }, false);


    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            if (modal && modalOverlay.classList.contains('modal-overlay--active')) {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            }
        });
    }

    if (modalClose) {
        modalClose.forEach((item) => {
            item.addEventListener('click', () => {
                document.body.classList.remove('scroll-disabled')
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
            });
        });
    }
});