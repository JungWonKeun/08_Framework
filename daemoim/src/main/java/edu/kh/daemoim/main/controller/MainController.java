package edu.kh.daemoim.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import edu.kh.project.main.service.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@SessionAttributes({"loginMember"})
@Controller // 요청/응답 제어하는 Controller 역할 명시 + Bean 등록
@RequiredArgsConstructor
public class MainController {
	
	
	@RequestMapping("/") 
	public String mainPage() {
		return "common/main";
	}

	
}
