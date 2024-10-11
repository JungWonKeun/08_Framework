
// 댓글 목록이 출력되는 영역(ul을 감싸는 div)
const commentListArea = document.querySelector(".comment-list-area");

/** 댓글 목록 조회 함수(ajax)
 */
const selectCommentList = () => {

  // boardNo : 게시글 번호(boardDetail.js 전역 변수)
  fetch("/board/commentList?boardNo=" + boardNo)
  .then(response => {
    // response.ok : HTTP 응답 상태 코드가 200번대(성공)이면 true
    if(response.ok) return response.text();
    throw new Error("댓글 목록 조회 실패")
  })
  .then(html => {
    // 매개 변수 html : 타임리프가 해석되어 완성된 html 코드
    // console.log(html); 

    // 타임리프가 해석된 html 코드를
    // .comment-list-area의 내용으로 대입 후 HTML 코드 해석
    commentListArea.innerHTML = html;

    /* [주의 사항] */
    // innerHTML로 새로 만들어진 요소에는
    // 이벤트 리스너가 추가되어 있지 않기 때문에
    // 답글, 수정, 삭제 등이 동작하지 않는다!!!

    addEventChildComment(); // 답글 버튼에 클릭 이벤트 추가

  })
  .catch(err => console.error(err));
};

// ---------------------------------------------------------

// 댓글 내용 요소
const commentContent = document.querySelector("#commentContent");

/** 댓글 등록 함수(AJAX)
 *  @param parentCommentNo : 부모 댓글 번호(없음 undefined)
 */
const insertComment = (parentCommentNo) => {

  // 서버에 제출할 값을 저장할 객체
  const data = {};
  data.boardNo = boardNo; // 댓글이 작성된 게시글 번호
  data.commentContent = commentContent.value; // 작성된 댓글 내용

  // 매개변수로 전달 받은 부모 댓글 번호가 있다면
  // == 답글
  if(parentCommentNo !== undefined){
    data.parentCommentNo = parentCommentNo;

    // 답글에 작성된 내용 얻어오기
    data.commentContent = 
      document.querySelector(".child-comment-content").value;
  }

  // Ajax
  fetch("/comment", {
    method : "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(data) // JS 객체 -> JSON (문자열)
  })
  .then(response => {
    if(response.ok) return response.text();
    throw new Error("댓글 등록 실패");
  })
  .then(commentNo => {

    if(commentNo == 0){ // 등록 실패
      alert("댓글 등록 실패");
      return;
    }

    alert("댓글이 등록 되었습니다.");
    commentContent.value = ""; // textarea에 작성한 댓글 내용 삭제
    selectCommentList(); // 댓글 목록 비동기 조회 후 출력

  })
  .catch(err => console.error(err));
}

/** 답글 버튼 클릭 시
    해당 댓글에 답글 작성 영역을 추가하는 함수
    @param btn : 클릭된 답글 버튼
*/
const showChildComment = (btn) => {

  // ** 답글 작성 textarea가 한 개만 열릴 수 있도록 만들기 **
  const temp = document.getElementsByClassName("child-comment-content");

  if (temp.length > 0) { // 답글 작성 textara가 이미 화면에 존재하는 경우

    if (confirm("다른 답글을 작성 중입니다. 현재 댓글에 답글을 작성 하시겠습니까?")) {
      temp[0].nextElementSibling.remove(); // 버튼 영역부터 삭제
      temp[0].remove(); // textara 삭제 (기준점은 마지막에 삭제해야 된다!)

    } else {
      return; // 함수를 종료시켜 답글이 생성되지 않게함.
    }
  }

  // 클릭된 답글 버튼이 속해있는 댓글(li) 요소 찾기
  // closest("태그") : 부모 중 가장 가까운 태그 찾기
  const li = btn.closest("li");

  // 답글이 작성되는 댓글(부모 댓글) 번호 얻어오기
  const parentCommentNo = li.dataset.commentNo;
  
  // 답글을 작성할 textarea 요소 생성
  const textarea = document.createElement("textarea");
  textarea.classList.add("child-comment-content");

  li.append(textarea);

  // 답글 버튼 영역 + 등록/취소 버튼 생성 및 추가
  const commentBtnArea = document.createElement("div");
  commentBtnArea.classList.add("comment-btn-area");

  const insertBtn = document.createElement("button");
  insertBtn.innerText = "등록";

  /* 등록 버튼 클릭 시 댓글 등록 함수 호출(부모 댓글 번호 전달)  */
  insertBtn.addEventListener("click", () => insertComment(parentCommentNo));

  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "취소";
  // cancelBtn.setAttribute("onclick", "insertCancel(this)");

  /* 취소 버튼 클릭 시 답글 작성 화면 삭제 */
  cancelBtn.addEventListener("click", () => {

    // console.log(li.lastElementChild);
    li.lastElementChild.remove();
    li.lastElementChild.remove();
  });

  // 답글 버튼 영역의 자식으로 등록/취소 버튼 추가
  commentBtnArea.append(insertBtn, cancelBtn);

  // 답글 버튼 영역을 화면에 추가된 textarea 뒤쪽에 추가
  textarea.after(commentBtnArea);




}







// -----------------------------------------------------------
// -----------------------------------------------------------
// -----------------------------------------------------------
/* 이벤트 추가 구문을 모아두는 영역 */



/* 댓글 등록 버튼 클릭 동작 추가 */
const addComment = document.querySelector("#addComment");
addComment.addEventListener("click", () => {

  // 1) 로그인 여부 검사(boardDetail.html의 loginCheck 전역변수)
  if(loginCheck === false){
    alert("로그인 후 이용해 주세요");
    return;
  }

  // 2) 댓글 작성 여부 검사
  if(commentContent.value.trim().length === 0){
    alert("내용 작성 후 등록 버튼을 클릭해 주세요");
    return;
  }

  // 3) 1,2 통과 시 댓글 등록 함수 호출
  insertComment();
})


/* 화면에 존재하는 답글 버튼을 모두 찾아 이벤트 리스너 추가 */
const addEventChildComment = () => {

  const btns = document.querySelectorAll(".child-comment-btn");

  btns.forEach( btn => {
    btn.addEventListener("click", () => {
      showChildComment(btn); // 답글 작성 화면 출력 함수 호출
    });
  })
}

/* 화면 코드 해석 완료 후 */
document.addEventListener("DOMContentLoaded", () => {
  addEventChildComment(); // 답글 버튼에 이벤트 추가
});






// ---------------------------------------

/* REST(REpresentational State Transfer)  API

- 자원(데이터,파일)을 이름(주소)으로 
  구분(representational) 하여
  자원의 상태(State)를 주고 받는 것(Transfer)

 -> 자원의 이름(주소)를 명시하고
   HTTP Method(GET,POST,PUT,DELETE) 를 이용해
   지정된 자원에 대한 CRUD 진행

  자원의 이름(주소)는 하나만 지정 (ex. /comment)
   
  삽입 == POST    (Create)
  조회 == GET     (Read)
  수정 == PUT     (Update)
  삭제 == DELETE  (Delete)
*/