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
    addStudent();  //calls addstudent()
    clearAddStudentForm(); //calls clearAddStudentForm()
    updateData(); //calls updateData()
}

/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked(){
    clearAddStudentForm(); //calls clearAddstudentForm()
}

/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(){
    var student= {
        name: $('#studentName').val(),   //creates an object variable with property called name
        course: $('#course').val(),      //property called course
        grade: $('#studentGrade').val()  //and property called grade
    };
    student_array.push(student);         //pushes the student object into the student_array
}

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){
    for(i=0;i<inputIds.length;i++){
        $(inputIds[i]).val("");  //for loop runs through the inputId's array and resets their input values to an empty string
    }
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage(){
    var runningGradeAverage=0; //creates a variable called runningGradeAverage
    var finalAverage=0;        // creates a variable called finalAverage
    if(student_array.length==0){
        return 0;              // if there is nothing in the student array, return 0
    }else {
        for(i=0;i<student_array.length;i++){
            runningGradeAverage+=Number(student_array[i].grade); //if there is something inside the student array, the running grade average gets the value of student[i].grade added to it
        }
        finalAverage=runningGradeAverage/student_array.length; //after the loop the running grade average gets divided by the studentArray.length
    }

    return finalAverage;  //returns the final average for display

}

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    $('.avgGrade').text(calculateAverage()); //updates .avgGrade text by calling the calculateAverage() function
    updateStudentList();  //calls updateStudentList()
}

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    $('.student-list tbody').empty(); //empties tbody so updateStudentList starts with a fresh screen --used to prevent multiple entries when adding students
    if (student_array.length == 0){
        $('.student-list tbody').append('<td colspan="2"><h4>User Info Unavailable</h4></td>'); // if studentArray is empty, display a no students message
    }else{
        for(i=0;i<student_array.length;i++){
            addStudentToDom(student_array[i]); //loops through the student array and calls addStudentToDom for each student
        }
    }
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(studentObj){ //appends student object data to the DOM and adds a delete button
        $('.student-list tbody').append('<tr><td>' + studentObj.name + '</td><td>' + studentObj.course + '</td><td>' + studentObj.grade +'</td><td><button class="btn btn-danger">Delete</button></td></tr>');
}

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    student_array=[]; //resets the student array
    updateData();     //runs update data
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function(){
    reset(); //calls reset onload
});