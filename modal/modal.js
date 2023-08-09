// 모달 열기 버튼 클릭 이벤트 처리
const modalBtn = document.getElementById("modal-btn");
modalBtn.addEventListener("click", () => {
  document.getElementById("modal").style.display = "block";
});

// 모달 닫기 버튼 클릭 이벤트 처리
const closeBtn = document.getElementsByClassName("close")[0];
closeBtn.addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// 모달 외부 클릭 시 모달 닫기
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
