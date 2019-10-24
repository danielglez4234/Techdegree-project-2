/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const list = document.querySelectorAll('.student-item');
const itemsPerPage =  10;

/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.
***/

const showpage = (list, page) => {

const startIndex = (page * itemsPerPage) - itemsPerPage;
const endIndex = page * itemsPerPage - 1;

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      list[i].style.display = '';
    }else {
      list[i].style.display = 'none';
    }
  }
}
showpage(list, 1);

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = () => {
// function that creates, adds properties and attaches elements
function createAndAppend(element, append_to, property, value, second_property, second_value){
  const created_element = document.createElement(element);
  if (property != '' && value != '') {
    created_element[property] = value;
    if (second_property != '' && second_value != '') {
      created_element[second_property] = second_value;
    }
  }
  append_to.appendChild(created_element);
  return created_element;
};
  //----------------------- Pagination elements ----------
  const containerDiv = document.querySelector('.page');

  const paginationDiv = createAndAppend('div', containerDiv, 'className', 'pagination');
  const ul = createAndAppend('ul', paginationDiv);
  const li = createAndAppend('li', ul);
  //----------------------- End Pagination elements ------
  //----------------------- Search elements ----------
  const pageHeaderDiv = document.querySelector('.page-header');

  const searchDiv = createAndAppend('div', pageHeaderDiv, 'className', 'student-search');
  const inputSearch = createAndAppend('input', searchDiv, 'type', 'search', 'placeholder', 'Search for students...');
  const searchButton = createAndAppend('button', searchDiv, 'textContent', 'Search');
  //----------------------- End search elements -------

}
appendPageLinks();

//----------------------- Show and move through pages ----------
/*** TESTING : I separate this section of appendPageLinks() so I can try to calculate
the pages dynamically with the searchForResults() function ***/
const calculatePageTotal = (list) =>{
  const li = document.querySelector('.pagination li');
  const pageTotal = Math.ceil(list.length / itemsPerPage);


  //for every page, add li and a tags with the page number text
  for (let i = 0; i < pageTotal; i++) {
    const num = 1;
    const a = document.createElement('a');
    a.textContent = num + i;
    // it adds an event listener to each a tag. When they are clicked it calls the showPage function to display the appropriate page
    a.addEventListener('click', (event) =>{
      showpage(list, a.textContent);
      const activeA = document.querySelectorAll('li a');
          //Loop over pagination links to remove active class from all links
          for (var i = 0; i < activeA.length; i++) {
            activeA[i].className = '';
          }
      event.target.className = 'active'; // add the active class to the link that was clicked
    });

  li.appendChild(a);
  }
  // This 'const' gets the first 'a' of the 'li' and adds the active class - this is because when we enters the page we will allways be on page 1
  const firstActive = document.querySelector('li a');
  firstActive.className = 'active';
}
//----------------------- End show and move through pages ------
calculatePageTotal(list);


//----------------------------- Search For Results--------------
const searchForResults = (list) => {

const searchInput = document.querySelector('input');
const studentsNames = document.querySelectorAll('.student-details h3'); //store the h3 elements where  the names are found

const matchResultsFound = document.createElement('h2');// here the text "total Results Found For: " will be shown
matchResultsFound.style.margin = '40px 0px 0px 0px';
matchResultsFound.style.display = '';

const pagerDiv = document.querySelector('.page-header'); // here we attach the h2 in the div '.page-header'
pagerDiv.appendChild(matchResultsFound);

const studentLI = document.querySelectorAll('.student-item'); // we get the li elements to use them in the addEventListener


searchInput.addEventListener('keyup', (event) =>{

  const searchContent = searchInput.value.toLowerCase(); // save what is being written
  const resultsFound = [];
  let total = 0;

  for (let i = 0; i < studentsNames.length; i++) {
    const studentsMatch = studentsNames[i].textContent;
    if (studentsMatch.indexOf(searchContent) !== -1) {
      resultsFound.push(studentsMatch[i]);

      studentLI[i].style.display = '';
      total = resultsFound.length;
      matchResultsFound.textContent = total + ' Results Found For: ' + searchContent;

      calculatePageTotal(resultsFound);
         if (searchContent == '') {
          matchResultsFound.textContent ='';
          // calculatePageTotal(list);
          showpage(list, 1);
        }
    }else {
      studentLI[i].style.display = 'none';
    }
  }
});
}
//----------------------------- End Search For Results----------
searchForResults(list);
