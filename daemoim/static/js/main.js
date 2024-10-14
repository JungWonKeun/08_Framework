// 팝업창

window.onload = function() {
  document.getElementById('popup').classList.add('active');
  document.getElementById('popupOverlay').classList.add('active');
}

// 팝업 닫기 버튼 클릭 시 팝업 닫기
document.getElementById('closePopup').onclick = function() {
  document.getElementById('popup').classList.remove('active');
  document.getElementById('popupOverlay').classList.remove('active');
}

// -------------------------------------------------------------------------