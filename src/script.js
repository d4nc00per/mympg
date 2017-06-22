function updateInputs(e) {
    var calcMethod = $('input[name=calcMethod]:checked').val();

    if (calcMethod == 0) {
        $('#litCostRow').slideDown();
        $('#totCostRow').slideDown();
        $('#fuelAmountRow').slideUp();
        $('#fuelAmountRow').val("");
    } else {
        $('#litCostRow').slideUp();
        $('#totCostRow').slideUp();
        $('#fuelAmountRow').slideDown();
        $('#litCostRow').val("");
        $('#totCostRow').val("");
    }
}

$(document).ready(function() {
    $('#calculate').click(function() {
        var c = new Mpg();
        c.litreCost = $('#litreCost').val();
        c.totalCost = $('#totCost').val();
        c.fuelAmount = $('#fuelAmount').val();
        c.mileage = $('#mileage').val();

        var result = c.Calculate($('input[name=calcMethod]:checked').val());

        $('#result').text(result + "mpg");
    });

    $('input[name=calcMethod]').change(updateInputs);

    $('html').keypress(function(e) {
        if (e.keyCode == 13)
            $('#calculate').click();
    });
});