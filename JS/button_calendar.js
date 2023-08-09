$(document).ready(function() {
    var calendarVisible = false;
  
    $('.btn button').click(function() {
      if (calendarVisible) {
        $('#calendar').hide();
        calendarVisible = false;
      } else {
        $('#calendar').show();
        calendarVisible = true;
  
        // FullCalendar 적용
        $('#calendar').fullCalendar({
          selectable: true,
          header: {
            left: 'prev,next 오늘',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          select: function(start, end) {
            var title = prompt('일정 제목:');
            var eventData;
            if (title) {
              eventData = {
                title: title,
                start: start,
                end: end
              };
              $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            }
            $('#calendar').fullCalendar('unselect');
  
            // 추가된 일정 정보 콘솔에 출력
            console.log("새로운 일정 추가:");
            console.log(eventData);
          }
        });
      }
    });
  });
  
  
  