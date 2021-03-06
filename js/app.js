/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
// unordered list inside the navbar
const navUL = document.querySelector('#navbar__list')
// all sections in the HTML document
const sections = document.querySelectorAll('section')
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/* a helper function to check if the section is at suitable
 position in the view port to make it active */
const checkBoundings = (element) => {
  return element.getBoundingClientRect().top <= window.innerHeight / 2
    && element.getBoundingClientRect().bottom >= window.innerHeight / 2 ?
    true : false
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
// a function that creates all navigation links and add it to the UL in tha navbar
const createListItems = () => {
  const fragment = document.createDocumentFragment()

  sections.forEach(section => {
    const listItem = document.createElement('li')
    const anchor = document.createElement('a')

    anchor.setAttribute('href', `#${section.id}`)
    anchor.setAttribute('id',`${section.id}_nav_link`)
    anchor.classList.add('menu__link')
    anchor.innerText = section.getAttribute('data-nav')

    listItem.appendChild(anchor)
    fragment.appendChild(listItem)
  })

  navUL.appendChild(fragment)
}

// Add class 'active' to section when near top of viewport
const addActiveState = () => {
  sections.forEach(section => {
    const navLink = document.querySelector(`#${section.id}_nav_link`)
    if (checkBoundings(section)) {
      section.classList.add('active-section')
      navLink.classList.add('active')
    }
    else {
      section.classList.remove('active-section')
      navLink.classList.remove('active')
    }
  })
}


// Scroll to anchor ID using scrollTO event
const scrollToSection = (e) => {
  if (e.target.nodeName === 'A') {
    e.preventDefault()
    const sectionId = e.target.getAttribute('href')
    const targetSection = document.querySelector(sectionId)
    targetSection.scrollIntoView({ behavior: 'smooth' })
  }
}



/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
createListItems()

// Scroll to section on link click
navUL.addEventListener('click', scrollToSection)

// Set sections as active
document.addEventListener('scroll', addActiveState)

