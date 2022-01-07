$('#ButtonPostJson').on('click', function() {

    $("tbody").empty();
    var forsearch = $("#searchItem").val();

    $.ajax({
        processing: true,
        serverSide: true,
        type: 'post',
        url: 'searchData.json',
        dataType: "json",
        data: mysearch,
        /* bRetrieve : true,*/

        success: function(data) {
            $.each(data, function(i, data) {
                var body = "<tr>";
                body += "<td>" + data.name + "</td>";
                ..........................
                ..........................
                body += "</tr>";
                $('.datatable-ajax-source table').append(body);

            });
            /*DataTables instantiation.*/
            $('.datatable-ajax-source table').dataTable();
        },

        error: function() {
            alert('Processus Echoué!');
        },
        afterSend: function() {
            $('.datatable-ajax-source table').dataTable().reload();
            /* $('.datatable-ajax-source table').dataTable({bRetrieve : true}).fnDestroy();    
            $(this).parents().remove(); 
            $('.datatable-ajax-source table').dataTable().clear();*/
        }
    });
});