// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('cs-active');
	CSnavbarMenu.classList.toggle('cs-active');
	CSbody.classList.toggle('cs-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('cs-active');
	};
	item.addEventListener('click', onClick);
}
                                

//
//    The Dark Mode System
//

// helper functions to toggle dark mode
function enableDarkMode() {
	document.body.classList.add('dark-mode');
	localStorage.setItem('theme', 'dark');
}
function disableDarkMode() {
	document.body.classList.remove('dark-mode');
	localStorage.setItem('theme', 'light');
}

// determines a new users dark mode preferences
function detectColorScheme() {
	// default to the light theme
	let theme = 'light';

	// if there is no preference set, the default of light will be used. apply accordingly
	theme === 'dark' ? enableDarkMode() : disableDarkMode();
}

// run on page load
detectColorScheme();

// add event listener to the dark mode button toggle
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
	// on click, check localStorage for the dark mode value, use to apply the opposite of what's saved
	localStorage.getItem('theme') === 'light' ? enableDarkMode() : disableDarkMode();
});
                                

//
//	PERSONAL ADDITION (NOT FROM CODESTICH)
//

/* Carousel for hero-banner */
function Carousel() {
	const track = document.querySelector('.cs-hero-track');
	const slides = document.querySelectorAll('.cs-hero-slide');
	const prevBtn = document.querySelector('.cs-arrow-left');
	const nextBtn = document.querySelector('.cs-arrow-right');
	const heroId = ["hero-image-1", "hero-image-2", "hero-image-3"];
	const heroButtons = ["hero-button-1", "hero-button-2", "hero-button-3"];

	let index = 0;

	function initialize() {
		heroButtons.forEach(id => {
			document.getElementById(id).style.display = "none"
		})
		document.getElementById(heroButtons[index]).style.display = "inline-block"
	}

	function updateSlide() {
		track.style.transform = `translateX(-${index * 100}%)`;

		// we want to first remove active status then add active status on element of current slide
		// NOTE: THIS PART IS NOT NECESSARY FOR CAROUSEL, ONLY FOR CHANGING BACKGROUND IMAGE
		heroId.forEach(id => {
			document.getElementById(id).classList.remove('active')
		})
		document.getElementById(heroId[index]).classList.add('active') // current carousel hero image
		
		heroButtons.forEach(id => {
			document.getElementById(id).style.display = "none"
		})
		document.getElementById(heroButtons[index]).style.display = "inline-block"
	}

	// switch carousel by clicking buttons.
	nextBtn.addEventListener('click', () => {
		index = (index + 1) % slides.length;
		updateSlide();
	});

	prevBtn.addEventListener('click', () => {
		index = (index - 1 + slides.length) % slides.length;
		updateSlide();
	});

	// Automatic carousel switching
	function nextSlide() {
		index = (index + 1) % slides.length
		updateSlide()
	}

	function autoSlide() {
		intervalId = setInterval(nextSlide, 10000)
	}
	initialize()
	autoSlide()
};

/* Carousel for catalogue */

function collectionCarousel() {
	const track = document.querySelector('.cs-track');
	const slides = document.querySelectorAll('.cs-collection-card-group');
	const nextBtn = document.querySelector('.next');
	const prevBtn = document.querySelector('.prev');
	const category = ["collection-slide-1", "collection-slide-2"]

	let index = 0;

	function updateSlide() {
		category.forEach(id => {
			const slide = document.getElementById(id);
			if (id != category[index]) {
				slide.querySelectorAll('a').forEach(link => {
					link.style.display = 'none';
				});
			} else {
				slide.querySelectorAll('a').forEach(link => {
					link.style.display = 'inline-block';
				});
			}
		});
	}
	nextBtn.addEventListener('click', () => {
		index = (index + 1) % slides.length;
		track.style.transform = `translateX(-${index * 100}%)`;
		updateSlide()
	});

	prevBtn.addEventListener('click', () => {
		index = (index - 1 + slides.length) % slides.length;
		track.style.transform = `translateX(-${index * 100}%)`;
		updateSlide()
	});
	updateSlide()
}

Carousel();
collectionCarousel();