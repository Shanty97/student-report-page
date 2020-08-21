
//Variable Declaration
var removerow = document.querySelector('#removerow');
var subjectMarkRoot = document.querySelector('#dynamicSection');
var addnewrowbutton = document.getElementById('submarksrow');
var txt = document.querySelector('#txt');
var Studentform = document.querySelector('#studentData');

var navBar = document.querySelector('.navBar');

var submitformbutton = document.querySelector('#submitMarks');
var modalButtonClose = document.querySelector('#closeModal');
var modalContainer = document.querySelector('#modal-container');
var rootContainer = document.querySelector('#rootContainer');

var tableRowRoot = document.querySelector('#dynamicTableRow');

var insertGrade = document.querySelector('#insertGrade');
var insertPercent = document.querySelector('#insertPercent');
var insertRollno = document.querySelector('#studentRno');
var insertName = document.querySelector('#studentName');

var liveCount = document.querySelector('#liveCount');
var count = 0;

//Submit Button
submitformbutton.addEventListener('click', getFormData);

function getFormData(e) {
    e.preventDefault();
    //console.log(Studentform)

    let fullname = document.querySelector('#fullname');
    let rollno = document.querySelector('#rollno');
    let subjects = document.querySelectorAll('.subjectData');

    let ofmarks = document.querySelectorAll('.outofMarksData');
    let obtmarks = document.querySelectorAll('.obtainedmarksData')

    //Displaying fetched Data for testing
    //console.log(fullname.value, rollno.value)
    // subjects.forEach(function(s) {
    //     console.log(s.value);
    // })
    // ofmarks.forEach(function(s) {
    //     console.log(s.value);
    // })
    // obtmarks.forEach(function(s) {
    //     console.log(s.value);
    // })

    if (performValidation(fullname, rollno, subjects, ofmarks, obtmarks) == true) {
        rootContainer.classList.add('backgroundBlurOn');
        generateResult(fullname, rollno, subjects, ofmarks, obtmarks);
    }
}

//Validation Check
function performValidation(fullname, rollno, subjects, ofmarks, obtmarks) {

    let one = 0;
    let two = 0;
    let three = 0;
    //Fullname
    var check1 = /^[a-zA-Z]{2,15}(?: [a-zA-Z]+){1,15}$/gm;
    //Rollno
    var check2 = /(COEP)([0-9]{4})$/;
    if (check1.test(fullname.value) === false) {
        alert("Enter only Alphabets as name.")
        fullname.value = '';
        one = 1;
        fullname.focus();
        
    } else if (check2.test(rollno.value) == false) {
        alert("Enter as per Roll no. format")
        rollno.value = '';
        two = 1;
        rollno.focus();
       
    } else {
        //Obtained marks
        obtmarks.forEach(function(obm) {
            //console.log(obm.parentElement.parentElement.previousElementSibling.firstChild.lastChild.value)
            let outofmarks = obm.parentElement.parentElement.previousElementSibling.firstChild.lastChild.value;
            if (obm.value > outofmarks) {
                alert("Obtained marks exceeds the Out Of marks limit")
                obm.value = ''
                three = 1;
                obm.focus();
         
            }
        })
    }

    if (one == 1 || two == 1 || three == 1) {
        return false
    } else {
        return true;
    }


}


//Generate Result
function generateResult(fullname, rollno, subjects, ofmarks, obtmarks) {

    var totalOutOf = 0;
    var totalObtMarks = 0;
    var totalPercent = 0;
    var finalGrade = '';

    modalContainer.classList.add('show');

    if (tableRowRoot.childElementCount > 0) {
        while (tableRowRoot.childElementCount > 1) {
            //console.log(99)
            tableRowRoot.firstChild.remove();
        }
    }

    let countOfRows = subjects.length;
    for (let i = 0; i < countOfRows; i++) {
        let trow = document.createElement('tr');


        let tdata = document.createElement('td');
        tdata.textContent = subjects[i].value;
        tdata.classList.add('white');

        let tdata2 = document.createElement('td');
        tdata2.textContent = obtmarks[i].value;
        tdata2.classList.add('white');

        totalObtMarks = parseInt(totalObtMarks) + parseInt(tdata2.textContent);

        let tdata1 = document.createElement('td');
        tdata1.textContent = ofmarks[i].value;
        tdata1.classList.add('white');

        totalOutOf = parseInt(totalOutOf) + parseInt(tdata1.textContent);

        let tdata3 = document.createElement('td');
        tdata3.textContent = (parseInt(tdata2.textContent) / parseInt(tdata1.textContent)) * 100;


        let tdata4 = document.createElement('td');
        if (tdata3.textContent < 35) {
            trow.style.background = 'red'
            trow.style.color = '#fff'
            tdata2.textContent = obtmarks[i].value + ' (F)';
        }

        tableRowRoot.appendChild(trow);

        trow.appendChild(tdata);
        trow.appendChild(tdata2);
        trow.appendChild(tdata1);

    }

    //Grade Check
    totalPercent = parseInt((totalObtMarks / totalOutOf) * 100);
    if (totalPercent < 35) {
        finalGrade = 'Fail'

    } else if (totalPercent > 35 && totalPercent < 60) {
        finalGrade = 'Pass'
    } else if (totalPercent > 60 && totalPercent < 75) {
        finalGrade = 'Pass (1st Class)'
    } else if (totalPercent > 75) {
        finalGrade = 'Pass (Distinction)'

    }


    //Percentage and final grade calculation
    let calculateRow = document.createElement('tr')
    let blankSubject = document.createElement('td')
    blankSubject.textContent = 'Total'
    blankSubject.style.fontWeight = 'bold'
    blankSubject.style.fontSize = '20px'

    let calculateObtMarks = document.createElement('td')
    calculateObtMarks.textContent = totalObtMarks
    calculateObtMarks.style.fontWeight = 'bold'
    calculateObtMarks.style.fontSize = '20px'

    let calculateOutOf = document.createElement('td')
    calculateOutOf.textContent = totalOutOf
    calculateOutOf.style.fontWeight = 'bold'
    calculateOutOf.style.fontSize = '20px'

    let calculatePercent = document.createElement('td')
    calculatePercent.textContent = parseInt(totalPercent)

    //Attach Percentage and final grade calculation
    tableRowRoot.appendChild(calculateRow)
    calculateRow.appendChild(blankSubject)
    calculateRow.appendChild(calculateObtMarks)
    calculateRow.appendChild(calculateOutOf)
    insertRollno.textContent = rollno.value
    insertName.textContent = fullname.value
    insertPercent.textContent = totalPercent + '%'
    insertGrade.textContent = finalGrade




}


//Modal Close
modalButtonClose.addEventListener('click', function() {
    modalContainer.classList.remove('show');
    rootContainer.classList.remove('backgroundBlurOn');

    location.reload();
})

//Adding new row way-1
addnewrowbutton.addEventListener('click', addnewrow);
function addnewrow(e) {
    e.preventDefault();
    //console.log(111)
    count = createSubjectMarkRow(count);
    liveCount.textContent = count;
    liveCount.classList.add('liveShow');
    txt.textContent = 'Add New Subject'

}



function createSubjectMarkRow(count) {
    let row = document.createElement('div')
    row.classList.add('row');

    //Subject Name
    let first = document.createElement('div')
    first.classList.add('rowitem');

    let second = document.createElement('div')
    second.classList.add('top-marginized')

    let label = document.createElement('label')
    label.for = 'Subject'
    label.textContent = 'Subject'

    let subjectname = document.createElement('input')
    subjectname.type = 'text'
    subjectname.name = 'subject'
    subjectname.classList.add('formItem', 'subject', 'subjectData', 'borderIt')
    subjectname.placeholder = 'Enter Subject Name'


    //Attach Subject
    subjectMarkRoot.appendChild(row)
    row.appendChild(first)
    first.appendChild(second)
    second.appendChild(label)
    second.appendChild(subjectname)
    subjectname.focus();


    //Out of marks
    let first1 = document.createElement('div')
    first1.classList.add('rowitem');

    let second1 = document.createElement('div')
    second1.classList.add('top-marginized')

    let label1 = document.createElement('label')
    label1.for = 'outOf'
    label1.textContent = 'Out Of'

    let list = document.createElement('select')
    list.classList.add('formItem', 'selectItem', 'outofMarksData', 'borderIt')

    let option1 = document.createElement('option')
    option1.value = '0'
    option1.selected = 'selected'
    option1.textContent = 'Choose out of marks'

    let option2 = document.createElement('option')
    option2.value = '50'
    option2.textContent = '50'

    let option3 = document.createElement('option')
    option3.value = '100'
    option3.textContent = '100'

    //Attach Out of marks
    row.appendChild(first1)
    first1.appendChild(second1)
    second1.appendChild(label1)
    second1.appendChild(list)
    list.appendChild(option1)
    list.appendChild(option2)
    list.appendChild(option3)

    //Obtained Marks
    let first2 = document.createElement('div')
    first2.classList.add('rowitem');

    let second2 = document.createElement('div')
    second2.classList.add('top-marginized')

    let label2 = document.createElement('label')
    label2.for = 'obtainedmarks'
    label2.textContent = 'Obtained Marks'

    let obtainedMarks = document.createElement('input')
    obtainedMarks.type = 'number'
    obtainedMarks.name = 'obtainedmarks'
    obtainedMarks.min = '0'
    obtainedMarks.max = list.selectedIndex
    obtainedMarks.classList.add('formItem', 'subject', 'obtainedmarksData', 'borderIt')
    obtainedMarks.placeholder = 'Enter Obtained Marks'

    //Attach obtained marks
    row.appendChild(first2)
    first2.appendChild(second2)
    second2.appendChild(label2)
    second2.appendChild(obtainedMarks)

    //remove button
    let first3 = document.createElement('div')
    first3.classList.add('rowitem');

    let second3 = document.createElement('div')
    second3.classList.add('top-marginized')

    //------------------------------------------------------------
    let button1 = document.createElement('button')
    button1.classList.add('button', 'red')
    button1.id = 'removerow'

    let buttonSpan = document.createElement('span')
    buttonSpan.textContent = 'Remove'
    buttonSpan.classList.add('pushup')

    let buttonLogo = document.createElement('img')
    buttonLogo.src = 'images/trash.png'
    buttonLogo.classList.add('logoimg');
    //------------------------------------------------------------

    let button2 = document.createElement('button')
    button2.classList.add('button')
    button2.id = 'addnewrow1'

    let buttonSpan2 = document.createElement('span')
    buttonSpan2.textContent = 'Add New Subject'
    buttonSpan2.classList.add('pushup')

    let buttonLogo2 = document.createElement('img')
    buttonLogo2.src = 'images/add.png'
    buttonLogo2.classList.add('logoimg');
    //------------------------------------------------------------

    //Attach Remove button and add new button
    row.appendChild(first3)
    first3.appendChild(second3)

    second3.appendChild(button1)
    button1.appendChild(buttonLogo)
    button1.appendChild(buttonSpan)

    second3.appendChild(button2)
    button2.appendChild(buttonLogo2)
    button2.appendChild(buttonSpan2)

    //Adding new row way-2
    button2.addEventListener('click', addnewrow);

    //Removing the Subject & Mark row
    button1.addEventListener('click', removeThisRow);

    count++;
    return count;
}

function removeThisRow(e) {
    e.preventDefault();

    getRootElement = e.target.parentNode.parentNode.parentNode.parentNode;
    if (getRootElement.classList.contains('row')) {
        //console.log(1, getRootElement)
        getRootElement.remove();
    } else {
        getRootElement = e.target.parentNode.parentNode.parentNode;
        //console.log(2, getRootElement)
        getRootElement.remove();
    }

    if (count == 1) {
        liveCount.textContent = ''
        txt.textContent = 'Add Subject & Marks'
        count = 0;
        liveCount.classList.remove('liveShow');
    } else {
        count--;
        liveCount.textContent = count;
    }

}