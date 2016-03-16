/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array=[];
var courseList = {}; //This object is created to store the course names from the student objects
var courseInput = null;
var apiKey = 'tc6UZ5oMSi'; //trisha's api_key
var koreyApi = "6SjVcFig5k";

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds = ['#studentName','#course','#studentGrade'];
//var studentNameInput = $('#studentName');


/**
 * addClicked - Event Handler when user clicks the add button
 */



function addClicked(){
    addStudent();  //calls addstudent()
    clearAddStudentForm(); //calls clearAddStudentForm()
    updateData(); //calls updateData()
    highlightGrade(student_array);
    $('.empty').remove();
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
function addStudent() {
    //var arrayIndex = student_array.length;
    var student = {
        name: $('#studentName').val(),   //creates an object variable with property called name
        course: $('#course').val(),      //property called course
        grade: $('#studentGrade').val(),  //and property called grade
        //arrayIndex: arrayIndex,
        element: null,
        delete_self: function () { //comment out this if we  go with scotts stuff
            this.element.remove();
            student_array.splice(this.arrayIndex, 1);
            changeIndex(this.arrayIndex);
            $('.avgGrade').text(calculateAverage());

        }
    };
    student_array.push(student); //comment this out if using scotts way
    addCourseName(student.course); //comment this out if using scotts way
    //checkHighestGrade(student.grade);
    sendDataToServer(apiKey,student.name,student.course,student.grade);
}

function highlightGrade(array) {
    var highestGrade = Number(array[0].grade);
    var lowestGrade = Number(array[0].grade);
    if (student_array.length >= 2) {
        for (var i = 0; i < student_array.length; i++) {
            if (Number(student_array[i].grade) === highestGrade) {
                student_array[i].element.addClass('bg-success');
            }
            if (Number(student_array[i].grade) > highestGrade) {
                highestGrade = Number(student_array[i].grade);
                $('.bg-success').removeClass('bg-success');
                student_array[i].element.addClass('bg-success');
            }
            if (Number(student_array[i].grade) === lowestGrade) {
                student_array[i].element.addClass('bg-danger');
            }
            if (Number(student_array[i].grade) < lowestGrade) {
                lowestGrade = Number(student_array[i].grade);
                $('.bg-danger').removeClass('bg-danger');
                student_array[i].element.addClass('bg-danger');
            }
        }
    }
}


// This function adds the course name to the courseList obj
    function addCourseName(course) {
        courseList[course] = 1;
    }

//var timer = null;
//$("#search").keyup(function(){
//    if(timer != null){
//        clearTimeout(timer);
//    }
//    timer = setTimeout(function(){
//        console.log("it works");
//    },500);
//}


    /*
     ** changeIndex = changes the arrayIndex key value in all objects when a object gets deleted
     */
    function changeIndex(objIndex) {
        for (objIndex; objIndex < student_array.length; objIndex++) {
            student_array[objIndex].arrayIndex -= 1;
        }
    }

    /**
     * clearAddStudentForm - clears out the form values based on inputIds variable
     */
    function clearAddStudentForm() {
        for (i = 0; i < inputIds.length; i++) {
            $(inputIds[i]).val("");  //for loop runs through the inputId's array and resets their input values to an empty string
        }
    }

    /**
     * calculateAverage - loop through the global student array and calculate average grade and return that value
     * @returns {number}
     */
    function calculateAverage() {
        var runningGradeAverage = 0; //creates a variable called runningGradeAverage
        var finalAverage = 0;        // creates a variable called finalAverage
        if (student_array.length == 0) {
            return 0;              // if there is nothing in the student array, return 0
        } else {
            for (i = 0; i < student_array.length; i++) {
                runningGradeAverage += Number(student_array[i].grade); //if there is something inside the student array, the running grade average gets the value of student[i].grade added to it
            }
            finalAverage = parseInt(runningGradeAverage / student_array.length); //after the loop the running grade average gets divided by the studentArray.length
        }

        return finalAverage;  //returns the final average for display

    }

    /**
     * updateData - centralized function to update the average and call student list update
     */
    function updateData() {
        $('.avgGrade').text(calculateAverage()); //updates .avgGrade text by calling the calculateAverage() function
        addStudentToDom(student_array[student_array.length - 1]);  //calls updateStudentList() //comment out if using scotts code
    }

    /**
     * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
     */
    function updateStudentList() {
        $('.student-list tbody').empty(); //empties tbody so updateStudentList starts with a fresh screen --used to prevent multiple entries when adding students
        var empty_student_display = $('<td>', {
            class: "empty",
            colspan: 2
        });
        var empty_display = $('<h4>', {
            text: 'User Info Unavailable',
        });
        if (student_array.length == 0) {
            $('.student-list tbody').append(empty_student_display);// if studentArray is empty, display a no students message
            empty_student_display.append(empty_display);
        } else {
            for (i = 0; i < student_array.length; i++) {
                addStudentToDom(student_array[i]); //loops through the student array and calls addStudentToDom for each student
            }
        }
        $('.avgGrade').text(calculateAverage());
    }

    /**
     * addStudentToDom - take in a student object, create html elements from the values and then append the elements
     * into the .student_list tbody
     * @param studentObj
     */
    function addStudentToDom(studentObj) { //appends student object data to the DOM and adds a delete button
        if (studentObj === undefined) {
            return;
        }
        var studentRow = $('<tr>', {
            'data-container': 'body',
            'data-toggle': 'popover',
            'data-placement': 'top',
            'data-trigger': 'focus'
            //'data-content': 'Error: you can not delete this student.'
        });
        var studentName = $('<td>', {
            text: studentObj.name
        });
        var studentCourse = $('<td>', {
            text: studentObj.course
        });
        var studentGrade = $('<td>', {
            text: studentObj.grade
        });
        var deleteButton = $('<button>', {
            class: "btn btn-danger",
            text: "Delete"
        });
        deleteButton.on('click', function () {
            //studentObj.element.remove(); //comment out if using scotts way
            //console.log('trying to get the id of specific student: ', student_array[20]);
            deleteStudentRequest(studentObj); //this needs the id of the student that is getting deleted
            //console.log("id",studentObj.id);
            //studentObj.delete_self();
            highlightGrade(student_array);
            console.log('my element is ', studentObj);
        });
        $('tbody').append(studentRow);
        studentRow.append(studentName, studentCourse, studentGrade, deleteButton);
        studentObj.element = studentRow;

    }

    /**
     * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
     */
    function reset() {
        student_array = []; //resets the student array
        updateStudentList();//runs update data
        updateData();
    }

    /**
     * Listen for the document to load and reset the data to the initial state
     */
    var timer = null; // this if for the timer functionality

    function checkObjList() { // This is the function thats going to be used to compare the input course and whats in your courseList Obj
        var userInput = $('#studentName').val();

    }

    function keyPressRelease() {
        console.log('key is pressed up!');
        courseInput = $('#course').val().toLowerCase();
        console.log('courseInput ', courseInput);
        $('#courseDropDown').empty();
        autoComplete();
        //if the courseInput length is 0 (if the user types something and erases all input)
        if (courseInput.length == 0) {
            eraseAutoComplete();
        }
    }

    function autoComplete() {
        console.log('autocomplete function invoked');
        var courseListArray = Object.keys(courseList);
        console.log('course list arrays: ', courseListArray);
        var list = null;
        for (var i in courseListArray) {
            console.log('');

            //if the length of the userInput matches the substring of course
            if (courseInput == courseListArray[i].substring(0, courseInput.length).toLowerCase()) {
                list = $('<li>', {
                    class: "dropDownShow",
                    text: courseListArray[i]
                });
                //append to dropDownShow
                $('#courseDropDown').append(list).css({
                    'display': 'block',
                    'padding-left': '15px'
                });
            }
        }
        console.log('list: ', list);
        $('.dropDownShow').on('click', function () {
            var listText = $(this).text();
            $('#course').val(listText);
            eraseAutoComplete();
        });
    }

    function eraseAutoComplete() {
        $('#courseDropDown').empty();
        $('#courseDropDown').hide();
    }

    $(document).ready(function () {
        reset();//calls reset onload
        $("#studentName").keyup(function () { // calls keyup method
            console.log("here");
            if (timer != null) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                checkObjList();
            }, 500);
        });
        getDataFromServer()
    });


function getDataFromServer(){
    $.ajax({
        dataType:'json',
        data:{
            api_key: apiKey, //use our own api_key?
            operation:'get'
        },
        method:'POST',
        url:'index.php',
        success: function(response){
            var responseData = response.data;
            console.log(responseData);
            for(var i = 0;i < responseData.length;i++){
                var arrayIndex = student_array.length;
                responseData[i].element = null;
                responseData[i].arrayIndex = arrayIndex;
                console.log(responseData[i].arrayIndex);
                responseData[i].delete_self =function () {
                    this.element.remove();
                    student_array.splice(this.arrayIndex, 1);
                    changeIndex(this.arrayIndex);
                    $('.avgGrade').text(calculateAverage());
                };
                student_array.push(responseData[i]);
                var lowerCaseCourse = responseData[i].course.toLowerCase();
                addCourseName(responseData[i].course);
            }
            updateStudentList();
            highlightGrade(student_array);
        }
    })
}



/**
 * deleteStudentRequest function
 * @params: api_key, student_id
 * Request deletion of student on the database
 */
function deleteStudentRequest(studentObj){
    console.log('student id: ',studentObj.id); //this is undefined until you refresh the page and get data from server again
    $.ajax({
       dataType: 'json',
       data: {
           api_key: apiKey,
           student_id: studentObj.id,
           //'force-failure': 'server' //forces an artificial 500 Internal Server Error
           //'force-failure': 'timeout(10000)'
       },
       method: 'POST',
       url: 'http://s-apis.learningfuze.com/sgt/delete',
       success: function(response){
           if (response.success === true){
               studentObj.delete_self();
           } else {
               studentObj.element.attr('data-content', response.errors[0]).popover('show');
               //alert(response.errors[0]);
           }
           console.log('accessed ajax call for student id and response: ', studentObj.id, response);
       }
    });
}


/**
 * sendDataToServer function
 * @params: api_key, studentName, studentCourse, studentGrade
 * Send created student data to the server
 */


function sendDataToServer(api_key,studentName,studentCourse,studentGrade){
    $.ajax({
        data:{
            api_key:api_key,
            name:studentName,
            course:studentCourse,
            grade:studentGrade,
            operation:'create'
        },
        method:'POST',
        url:'index.php',
        success: function(response){
            console.log(response);
            //getDataFromServer();
            //var getId ='';
            //for(var i = 25; i <= response.length - 2; i++){
            //    getId += response[i];
            //}
            //student_array[student_array.length-1].id = getId;
            //console.log("success",response);
        },
        error: function(response){
            console.log("error", response);
        }
    })
}


