/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array=[];

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds = ['#studentName','#course','#studentGrade'];

/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked(){
    addStudent();
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
    clearAddStudentForm();
}

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(){
    var student= {
        name: $('#studentName').val(),
        course: $('#course').val(),
        grade: $('#studentGrade').val()
    }
    student_array.push(student);
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    for(i=0;i<inputIds.length;i++){
        $(i).val("");
    }
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
    var runningGradeAverage=0;
    var finalAverage=0;
    for(i=0;i<student_array.length;i++){
        runningGradeAverage+=student_array[i].grade;
    }
    finalAverage=runningGradeAverage/student_array.length-1;
    return finalAverage;

}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){

}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){

}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(){

}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){

}

/**
 * Listen for the document to load and reset the data to the initial state
 */
