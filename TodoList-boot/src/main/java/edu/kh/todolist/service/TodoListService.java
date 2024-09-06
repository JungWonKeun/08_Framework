package edu.kh.todolist.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface TodoListService {

	/** 할 일 목록 조회 + 완료된 할 일 개수
	 * @return
	 */
	Map<String, Object> selectTodoList();

}
