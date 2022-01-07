function defaultLogs(table1) {
    swal({
        title: "",
        text: "Loading...",
        icon: "https://www.boasnotas.com/img/loading2.gif",
        buttons: false,
        closeOnClickOutside: false,
        timer: 500,
    });
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1/works/Javascript_Realtimedata/server.php",
        data: {},
        dataType: "json", //expect json to be returned 
        success: function(response) {
            ress = JSON.stringify(response);
            res = JSON.parse(ress);
            status = res['status'];
            payload = JSON.parse(res['arrayLogs']);

            switch (status) {

                case '1':
                    // table1.ajax.reload();
                    // table1.clear().draw();
                    payload.forEach(function(details) {
                        var username = details['username'];
                        var reply = details['reply'];;
                        var authdate = details['authdate'];
                        var nasipaddress = details['nasipaddress'];
                        var callingstationid = details['callingstationid'];
                        table1.row.add(
                            [authdate, username, callingstationid, nasipaddress, reply]
                        ).draw();

                    })
                    break;
                case '503':
                    alert('Failed to connect to the external server');
                    console.log(message);
                    break;

                default:
                    alert('An unknown error occured');
                    $(".buttonVerify").html('Try Again?');
                    $(".buttonVerify").removeAttr('disabled');
                    console.log(message);
                    break;
            }



        },
        error: function() {
            alert('Failed to fetch the data');
        }
    });
}

function startLiveUpdate(table1) {

    setInterval(function() {
        swal({
            title: "",
            text: "Loading...",
            icon: "https://www.boasnotas.com/img/loading2.gif",
            buttons: false,
            closeOnClickOutside: false,
            timer: 500,
        });
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1/works/Javascript_Realtimedata/server.php",
            data: {},
            dataType: "json", //expect json to be returned 
            success: function(response) {
                ress = JSON.stringify(response);
                res = JSON.parse(ress);
                status = res['status'];
                payload = JSON.parse(res['arrayLogs']);

                switch (status) {

                    case '1':
                        // table1.ajax.reload();
                        table1.clear().draw();
                        // swal({
                        //     title: "",
                        //     text: "Loading...",
                        //     icon: "https://www.boasnotas.com/img/loading2.gif",
                        //     buttons: false,
                        //     closeOnClickOutside: false,
                        //     timer: 1000,
                        // })
                        payload.forEach(function(details) {
                            var username = details['username'];
                            var reply = details['reply'];;
                            var authdate = details['authdate'];
                            var nasipaddress = details['nasipaddress'];
                            var callingstationid = details['callingstationid'];
                            table1.row.add(
                                [authdate, username, callingstationid, nasipaddress, reply]
                            ).draw();

                        })
                        break;
                    case '503':
                        alert('Failed to connect to the external server');
                        console.log(message);
                        break;

                    default:
                        alert('An unknown error occured');
                        $(".buttonVerify").html('Try Again?');
                        $(".buttonVerify").removeAttr('disabled');
                        console.log(message);
                        break;
                }



            },
            error: function() {
                alert('Failed to fetch the data');
            }
        });
    }, 10000);
}

$(document).ready(function() {


    //Only needed for the filename of export files.
    //Normaly set in the title tag of your page.
    document.title = 'Simple DataTable';
    dataSet = [];
    // DataTable initialisation
    var table1 = $('#realtime').DataTable({
        "dom": '<"dt-buttons"Bf><"clear">lirtp',
        "paging": true,
        "searching": true,
        "autoWidth": true,
        "buttons": [
            'colvis',
            'copyHtml5',
            'csvHtml5',
            'excelHtml5',
            'pdfHtml5',
            'print'
        ],

    });

    // The below funnction is to get the logs on load of the page
    defaultLogs(table1);

    startLiveUpdate(table1);
});