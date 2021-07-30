$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td class="vchno"><input type="text" class="form-control" name="vehicleNumber" id="name"></td>' +
            '<td><input type="text" class="form-control" name="vehicleModel" id="department"></td>' +
            '<td><select class="form-control id="vehicleType" name="vehicleType"><option value="Two Wheeler">Two Wheeler</option><option value="Four Wheeler">Four Wheeler</option></select></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
            '<td class="tdClass"><div class="md-form md-outline"><input type="time" id="default-picker " class="checkIn form-control" name="checkIn" placeholder="Select time"></div></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add").toggle();
			$(".add-new").removeAttr("disabled");
		}		
    });
	
	// Delete row on checkOut button click
	$(document).on("click", ".checkOut", function(){
		
		
		checkInTime = $(this).parent().parent().siblings(".tdClass").find(".checkIn").val();
		vchNum = $(this).parent().parent().siblings(".vchno").text();
		 rowIndex = ($(this).parent().parent().parent().index())+1;
		
        
    });
	$(document).on("click", "#btnEstimate", function(){
        var checkOutTime = $(".checkOutTime").val();
		console.log(diff(checkInTime,checkOutTime));
		
		$(".estimate").text(timeStringToFloat(diff(checkInTime,checkOutTime))*5);
		$("table tr:eq("+rowIndex+")").remove();
		
    });
	
	function diff(start, end) {
		start = start.split(":");
		end = end.split(":");
		var startDate = new Date(0, 0, 0, start[0], start[1], 0);
		var endDate = new Date(0, 0, 0, end[0], end[1], 0);
		var diff = endDate.getTime() - startDate.getTime();
		var hours = Math.floor(diff / 1000 / 60 / 60);
		diff -= hours * 1000 * 60 * 60;
		var minutes = Math.floor(diff / 1000 / 60);
	
		
		if (hours < 0)
		   hours = hours + 24;
	
		return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
	}
	function timeStringToFloat(time) {
		var hoursMinutes = time.split(/[.:]/);
		var hours = parseInt(hoursMinutes[0], 10);
		var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
		return hours + minutes / 60;
	  }
});