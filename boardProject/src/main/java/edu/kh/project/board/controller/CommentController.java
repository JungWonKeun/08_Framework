package edu.kh.project.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import edu.kh.project.board.dto.Comment;
import edu.kh.project.board.service.CommentService;
import edu.kh.project.member.dto.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController // @Controller + @ResponseBody
								// 비동기 요청 처리 전용 컨트롤러
								// return되는 모든 값을 있는 그대로 호출부로 반환 ( @ResponseBody 없어도 됨!)
@RequiredArgsConstructor
@Slf4j
public class CommentController {

	private final CommentService service;
	
	
	/** 댓글 등록
	 * @param comment :
	 * 				요청 시 body에 JSON 형태로 담겨져 제출된 데이터를
	 * 				HttpMessageConverter가 DTO로 변환한 객체
	 * 			  (boardNo, commentContent, parentCommentNo)
	 * 
	 * @param loginMember : 로그인 한 회원 정보
	 * @return commentNo : 삽입된 댓글 번호
	 */
	@PostMapping("comment") // POST == CREATE/INSERT 의미
	public int commentInsert(
			@RequestBody Comment comment,
			@SessionAttribute("loginMember") Member loginMember) {
		
		// 로그인 된 회원 번호를 comment에 세팅
		comment.setMemberNo(loginMember.getMemberNo());
		
		return service.commentInsert(comment);
	}
	
	@PutMapping("comment") // PUT == UPDATE 의미
	public int commentUpdate() {
		return 0;
	}
	
	@DeleteMapping("comment") // DELETE == DELETE 의미
	public int commentDelete() {
		return 0;
	}
	
	
	
	
}