const grids = document.querySelectorAll('.slider .grid');

const nextSliderButton = document.querySelector('.slider .slider-next');
const prevSliderButton = document.querySelector('.slider .slider-prev');

let activeGridIndex = 0;

function getNewIndex(direction) {
    let increment = direction === 'next' ? 1 : -1;
    return ((activeGridIndex + increment + grids.length) % grids.length);
}

function getGridItemsFromIndex(index) {
    let itemCount = grids[index].querySelectorAll('.image-item').length;
    return Array.from({ length: itemCount }, (_, i) => 
        grids[index].querySelector(`.grid-item-0${i + 1} .image-item`)
    );
}

const animationProps = {
    'out': {
        from: { width: '100%' },
        to: { width: '0%' },
        delay:  (index) => index === 0 ? '=0' : '='
    },
    'in': {
        from: { width: '0%' },
        to: { width: '100%' },
        delay:  (index) => index === 0 ? '+=0' : '-=0.5'
    }
}

function animateItems(items, direction, timeline) {
    const props = animationProps[direction];

    items.forEach((item, index) => {
        timeline.fromTo(item, props.from, props.to, props.delay(index));
    })
}

function updateActiveClass() {
    grids.forEach(grid => grid.classList.remove('active'));
    grids[activeGridIndex].classList.add('active');
}

function slide(direction) {
    const newIndex = getNewIndex(direction);

    const currentGridItems = getGridItemsFromIndex(activeGridIndex);
    const nextOrPrevGridItems = getGridItemsFromIndex(newIndex);

    const tl = gsap.timeline();

    animateItems(currentGridItems, 'out', tl);
    tl.call(updateActiveClass, null, null, '+=0.2');
    animateItems(nextOrPrevGridItems, 'in', tl);


    activeGridIndex = newIndex;
}

nextSliderButton.addEventListener('click', () => slide('next'));
prevSliderButton.addEventListener('click', () => slide('prev'));
