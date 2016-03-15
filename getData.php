<!DOCTYPE html>
<html>
<head>
    <title>Get Data From Student Grade Table</title>
    <meta charset="utf-8">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

    <script>
        var test;
        function getData(){
            $.ajax({
                url: "index.php",
                method: "POST",
                dataType:'json',
                data:{
                    api_key:'tc6UZ5oMSi',
                    operation:"get"
                },
                success: function (response) {
                    console.log(response);
                    test = response;
                }
            });
        }

        $(document).ready(function(){
            $("button").click(function(){
                getData();
            });
        });

    </script>
</head>
<body>
<button type="button">Get Data</button>
</body>
</html>