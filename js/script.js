/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const list = document.querySelectorAll('.student-item');
const itemsPerPage = {
  perPage: 10,
  showPrevNext: false,
  hidePageNumbers: false
}
/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

const showpage = (list, page) => {

const startIndex = (page * itemsPerPage.perPage) - itemsPerPage.perPage;
const endIndex = page * itemsPerPage.perPage - 1;

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


const appendPageLinks = (list) => {

  const containerDiv = document.querySelector('.page');

  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination';
  containerDiv.appendChild(paginationDiv);

  const ul = document.createElement('ul');
  paginationDiv.appendChild(ul);

  const li = document.createElement('li');
  ul.appendChild(li);


    const pageTotal = list.length / itemsPerPage.perPage;

    for (let i = 0; i < pageTotal; i++) {
      const num = 1;
      const a = document.createElement('a');
      a.textContent = num + i;

      a.addEventListener('click', (event) =>{
        showpage(list, a.textContent);
        const activeA = document.querySelectorAll('li a');
            for (var i = 0; i < activeA.length; i++) {
              activeA[i].className = '';
            }
        event.target.className = 'active';
      });

    li.appendChild(a);
    }
    // This 'const' gets the first 'a' of the 'li' and adds the active class - this is because when we enters the page we will allways be on page 1
    const firstActive = document.querySelector('li a');
    firstActive.className = 'active';

}
appendPageLinks(list);
