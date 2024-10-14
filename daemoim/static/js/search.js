function toggleDropdown() {
  const dropdown = document.getElementById("dropdownMenu");
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}

// 클릭 시 드롭다운 닫기
window.onclick = function(event) {
  if (!event.target.matches('.filter-icon')) {
    const dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
}