$(document).ready(function() {
    var calendar = $('#calendar').fullCalendar({
      // 캘린더 옵션
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: [
        // 일정 데이터
      ],
      select: function(start, end) {
        // 일정 추가 모달창 열기
        var title = prompt('일정 제목:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          calendar.fullCalendar('renderEvent', eventData, true); // 일정 렌더링
        }
        calendar.fullCalendar('unselect');
      },
      editable: true,
      eventDrop: function(event, delta, revertFunc) {
        // 일정 이동시
      },
      eventResize: function(event, delta, revertFunc) {
        // 일정 리사이즈시
      },
      eventClick: function(event, jsEvent, view) {
        // 일정 클릭시
      }
    });
  });
