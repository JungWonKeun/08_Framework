package edu.kh.project.board.mapper;

import org.apache.ibatis.annotations.Mapper;

import edu.kh.project.board.dto.Comment;

@Mapper
public interface CommentMapper {

	/** 댓글 등록
	 * @param comment
	 * @return result
	 */
	int commentInsert(Comment comment);

}
