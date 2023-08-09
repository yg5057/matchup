$(document).ready(function () {
  var calendar = $('#calendar').fullCalendar({
    // 캘린더 옵션
    selectable: true,
    selectHelper: true,
    editable: true,
    eventLimit: true,
    events: function (start, end, timezone, callback) {
      // DB에서 일정 데이터를 가져오는 AJAX 요청
      $.ajax({
        url: '/events',
        dataType: 'json',
        data: {
          // 요청 파라미터
          start: start.unix(),
          end: end.unix()
        },
        success: function (response) {
          // 일정 데이터를 캘린더에 렌더링
          var events = [];
          $.each(response, function (i, event) {
            events.push({
              id: event.id,
              title: event.title,
              start: moment.unix(event.start),
              end: moment.unix(event.end),
              color: event.color
            });
          });
          callback(events);
        }
      });
    },
    select: function (start, end) {
      // 일정 추가 모달창 열기
      var title = prompt('일정 제목:');
      var eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        // DB에 일정 추가하는 AJAX 요청
        $.ajax({
          url: '/events',
          type: 'POST',
          dataType: 'json',
          data: {
            // 요청 바디
            title: title,
            start: start.unix(),
            end: end.unix()
          },
          success: function (response) {
            // DB에서 생성된 일정 데이터의 ID를 캘린더 이벤트 객체에 추가
            eventData.id = response.id;
            calendar.fullCalendar('renderEvent', eventData, true); // 일정 렌더링
          }
        });
      }
      calendar.fullCalendar('unselect');
    },
    editable: true,
    eventDrop: function (event, delta, revertFunc) {
      // 일정 이동시
      // DB에서 일정 수정하는 AJAX 요청
      $.ajax({
        url: '/events/' + event.id,
        type: 'PUT',
        dataType: 'json',
        data: {
          // 요청 바디
          start: event.start.unix(),
          end: event.end.unix()
        },
        success: function (response) {
          // 일정 수정 성공 처리
          if (response.status == "success") {
            alert("일정이 수정되었습니다.");
          } else {
            alert("일정 수정에 실패했습니다.");
            revertFunc();
          }
        }
      });
    },
    eventClick: function (event, jsEvent, view) {
      // 일정 클릭시
      // DB에서 일정 삭제하는 AJAX 요청
      $.ajax({
        url: '/events/' + event.id,
        type: 'DELETE',
        dataType: 'json',
        success: function (response) {
          // 일정 삭제 성공 처리
          if (response.status == "success") {
            alert("일정이 삭제되었습니다.");
            calendar.fullCalendar('removeEvents', event.id); // 일정 제거
          } else {
            alert("일정 삭제에 실패했습니다.");
          }
        }
      });
    }
