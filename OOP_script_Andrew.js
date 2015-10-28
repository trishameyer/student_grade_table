$(document).ready(function(){
   //var school1 = new School();
    console.log('loaded');
});

var School = function(){
    this.student_body = [];
    this.get_student_info = function(){
        var Name = $('#studentName').val();
        var Course = $('#course').val();
        var Grade = $('#studentGrade').val();
        var student = new Student();
        student.init_self(Name,Course,Grade);
        this.student_body.push(student);
        console.log(this.student_body);
        this.add_student_to_table(student);
        this.clear_student_form();
        this.calculate_avg();

    };
    this.clear_student_form = function(){
        var inputIds=['#studentName','#course','#studentGrade'];
        for(i=0;i<inputIds.length;i++){
            $(inputIds[i]).val('');
        }
        $('#alert_msg').remove();
    };
    this.calculate_avg = function(){
        var sum=0;
        for(i=0;i<this.student_body.length;i++){
            sum+=Number(this.student_body[i]['Grade']);
        }
        var average=sum/this.student_body.length;
        var average_rounded = Math.round(average);
        if(this.student_body.length === 0){
            average_rounded = 0;
        }
        $('.avgGrade').text(average_rounded);
    };
    this.reset_student_body = function(){
        this.student_body = [];
        $('tbody').empty();
        this.calculate_avg();
        //$('#alert_msg').remove();
    };
    this.add_student_to_table = function(student) {
        var table_row = $('<tr>');
        var td_name = $('<td>').text(student.Name);
        var td_course = $('<td>').text(student.Course);
        var td_grade = $('<td>').text(student.Grade);
        var td_operations = $('<td>');
        var operations_button = $('<button>Delete</button>').addClass('btn btn-danger').attr("id","delete_tr");
        $(table_row).on('click','#delete_tr',function(){
            student.delete_self();
            console.log(school1.student_body);
            $(student.Element).remove();
            school1.calculate_avg();


        });
        $(td_operations).append(operations_button);
        $(table_row).append(td_name, td_course, td_grade, td_operations);

        student.Element = table_row;
        $('tbody').append(table_row);
    };
    //this.remove_student_from_table = function(){//do we need this?
    //    $(Student.Element).remove();
    //};
    this.remove_student_from_array = function(Student){
        for(var i=0; i<this.student_body.length; i++){//loops through array to set index
            if(Student == this.student_body[i]){
                this.student_body.splice(i,1);
            }
        }
    };
};

var Student = function(){
    this.Element = undefined;//default for all students
    this.Name;
    this.Course;
    this.Grade;
    this.init_self = function(Name, Course, Grade){
        this.Name = Name;
        this.Course = Course;
        this.Grade = Grade;
    };
    this.change_name = function(new_name){
        this.Name = new_name;
    };
    this.delete_self = function(){
        $(this.element).remove();
        school1.remove_student_from_array(this);
    }

};

var school1 = new School();

