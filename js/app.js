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
const navUL = document.querySelector('#navbar__list')
const sections = document.querySelectorAll('section')
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

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

const createListItems = () => {
  const fragment = document.createDocumentFragment()

  sections.forEach(section => {
    const listItem = document.createElement('li')
    const anchor = document.createElement('a')
    anchor.setAttribute('href', `#${section.id}`)
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
    checkBoundings(section) ?
      section.classList.add('active-section')
      :
      section.classList.remove('active-section')
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

