package edu.kh.project.board.service;

import edu.kh.project.board.dto.Comment;

public interface CommentService {

	/** 댓글 등록
	 * @param comment
	 * @return commentNo
	 */
	int commentInsert(Comment comment);

}
