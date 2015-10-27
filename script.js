
var debug = false;
/**
 * Define all global variables here
 */var alerted=false;
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds=['#studentName','#course','#studentGrade'];

/**
 * addClicked - Event Handler when user clicks the add button
 *
 */

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 *
 */

function add_student() {
    var student = {
        'Name': $('#studentName').val(),
        'Course': $('#course').val(),
        'Grade': $('#studentGrade').val(),
        'Element': undefined//creates reference to element in DOM, later defined when <tr> is created
    };

    if(debug)console.log('student grade is ' + student.Grade);
    if (!(student.Name === '' || student.Course === '' || student.Grade === '')) {
        student_array.push(student); //adds created to student_array
        addStudentToDom(student); //appends table row to table body on form
        clearAddStudentForm(); //After form input, form re-clears
        calculateAverage(); //calculate a new average after each student is added
        $('#alert_msg').remove();
        alerted=false;//removes alert message and sets it to false

    }
    else if(!alerted) {
        var alert_text = $('<div>').text('Alert: Please enter form data before continuing');
        $(alert_text).css('color', 'red').css('margin-top', '5%').attr('id', 'alert_msg');
        $('.student-add-form').append(alert_text);
        alerted=true;//prevents repeat alert messages
        if (debug)console.log('else initiated');
    }
}


/**
 * clearAddStudentForm - clears out the form values based on inputIds variable


 */


 function clearAddStudentForm(){
    for(i=0;i<inputIds.length;i++){ //loops through the Input_IDs array and clears each form input
        $(inputIds[i]).val('');
    }
    $('#alert_msg').remove();//also clears alert message if still there
    }

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */function calculateAverage(){
    var sum=0;
    for(i=0;i<student_array.length;i++){

        sum+=Number(student_array[i]['Grade']);

    }

    var average=sum/student_array.length;
    var average_rounded = Math.round(average); //average rounded up or down

    if(student_array.length === 0){ //sets average output to 0 if no student objects in student_array
        average_rounded = 0;
    }
    $('.avgGrade').text(average_rounded); //appending text to Grade Average label
    //if(debug) console.log(average);
    return average_rounded;

    }


/**
 * updateData - centralized function to update the average and call student list update
 */
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */function addStudentToDom(studentObj){
    var student_name=studentObj['Name'];
    var student_course=studentObj['Course'];
    var student_grade=studentObj['Grade'];
    var table_row=$('<tr>');
    var td_name=$('<td>').text(student_name);
    var td_course=$('<td>').text(student_course);
    var td_grade=$('<td>').text(student_grade);
    var td_operations=$('<td>');
    var operations_button=$('<button>Delete</button>').addClass('btn btn-danger');


    $(operations_button).click(function() {//when delete button clicked, removed student obj from student_array and remove the whole table row.
        $(studentObj[Element]).remove();//removes student from DOM using reference stored in object
        removeStudentFromArray(studentObj);
    });

    $(td_operations).append(operations_button); //adds delete button into operations table data
    $(table_row).append(td_name,td_course,td_grade,td_operations); //inputs all table column data into table row
    studentObj[Element]=table_row;//sets the objects "Element" property to the table row created
    $('tbody').append(table_row);//append table to table body

    return undefined;

    }


/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    student_array = [];
    $('tbody').empty();
    calculateAverage();
    $('#alert_msg').remove();//clears alert message as well
    return undefined;
}

/**
 * Listen for the document to load and reset the data to the initial state
 */

///**
// *@this {removeStudentFromArray}
// *@param {studentObj} the student in DOM and student_array that we wish to remove

function removeStudentFromArray(studentObj){
    for(var i=0; i<student_array.length; i++){//loops through array to set index
        if(studentObj == student_array[i]){
            student_array.splice(i,1);
        }
    }
    calculateAverage(); //re-calculates average after student removal
    if(debug) console.log(student_array);
    if(debug) console.log(calculateAverage());
}


