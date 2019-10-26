/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const students = document.querySelectorAll('.student-item');
const itemsPerPage =  10;


const showpage = (list, page) => { // show the corresponding students to each page

const startIndex = (page * itemsPerPage) - itemsPerPage;
const endIndex = page * itemsPerPage - 1;

  for (let i = 0; i < list.length; i++) { // loop over the list elements that have been sent
    if (i >= startIndex && i <= endIndex) {
      list[i].style.display = '';
    }else {
      list[i].style.display = 'none';
    }
  }
}
showpage(students, 1);


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
  const inputSearch = createAndAppend('input', searchDiv, 'type', 'text', 'placeholder', 'Search for students...');
  const buttonSearch = createAndAppend('button', searchDiv, 'textContent', 'Search');
  //----------------------- End search elements -------
}
appendPageLinks();


//---------****--------- Show and move through pages ------****--------
/***
I separated this section from 'appendPageLinks();' and turned it into a function to make it clearer for me
***/
const calculatePageTotal = (list) =>{
  const li = document.querySelector('.pagination li');
  const pageTotal = Math.ceil(list.length / itemsPerPage);

// This section is to avoid duplication when paging the search, it delete all <a> if they exist and below are replaced
  const searchForA = document.querySelectorAll('.pagination li a');
  if (searchForA !== 'undefined') { // this prevents it from running the first time when there is no <a> to delete
    for (let i = 0; i < searchForA.length; i++) {
      li.removeChild(searchForA[i]);
    }
  }
  //for every page, add <a> tags with the page number text
  for (let i = 0; i < pageTotal; i++) {
    const num = 1;
    const a = document.createElement('a');
    a.textContent = num + i;
    // it adds an event listener to each <a> tag. When they are clicked it calls the showPage function to display the appropriate page
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
  /* This 'const' gets the first 'a' of the 'li' and adds the active class
  this is because when we enters the page we will allways be on page 1 */
  const firstActive = document.querySelector('li a');
  if (firstActive !== null) { // This prevents an error from jumping when there is no <a> to change the class
    firstActive.className = 'active';
  }
}

calculatePageTotal(students);



//-------------****---------------- Search For Results-----------****---
const searchForResults = (list) => {

const searchInput = document.querySelector('input');
const studentsNames = document.querySelectorAll('.student-details h3'); //store the h3 elements where  the names are found

const alertOfResultsFound = document.createElement('h2');// here the text "total Results Found For: " will be shown
alertOfResultsFound.style.margin = '50px -120px 15px';

const pagerDiv = document.querySelector('.page-header'); // here we attach the h2 in the div '.page-header'
pagerDiv.appendChild(alertOfResultsFound);

const studentLI = document.querySelectorAll('.student-item'); // we get the li elements to use them in the addEventListener


searchInput.addEventListener('keyup', (event) =>{

  const searchContent = searchInput.value.toLowerCase(); // save what is being written
  const resultsFound = [];
  let total = 0;

  for (let i = 0; i < studentsNames.length; i++) { // loop over the students names
    const studentsMatch = studentsNames[i].textContent;
    if (studentsMatch.indexOf(searchContent) !== -1) { // when one result matches is shown and the others hide
      resultsFound.push(studentLI[i]);
      studentLI[i].style.display = '';
      total = resultsFound.length;

      alertOfResultsFound.textContent = total + ' Results Found For: ' + searchContent;
    }else {
      studentLI[i].style.display = 'none';
    }
  }

 if (resultsFound.indexOf(searchContent) === -1 && total < 1) { // when none of the results match
   alertOfResultsFound.textContent = 'NO Results Found For: ' + searchContent;
   calculatePageTotal(0);
 }else if (searchContent == '') { // return the page to its normal form when there is nothing written
   alertOfResultsFound.textContent ='';
   calculatePageTotal(list);
   showpage(list, 1);
 }

calculatePageTotal(resultsFound);
showpage(resultsFound, 1);

});
}
//----------------------------- End Search For Results----------
searchForResults(students);
