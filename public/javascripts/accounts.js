$(document).ready(function() {
    $(".btn-userRow").click(function() {
        console.log("In")
        var mail = $(this).attr('data');
        var data = $('.' + mail);
        var data2 = []
        data.each(function () {
            data2.push($(this).text())
        })

        console.log(data2)
    });
});