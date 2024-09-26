package edu.kh.project.fileUpload.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.project.fileUpload.service.FileUploadService;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("fileUpload")
@RequiredArgsConstructor
public class FileUploadController {
	
	private final FileUploadService service;
	
	/** 파일 업로드 연습 메인 페이지 전환
	 * @return
	 */
	@GetMapping("main")
	public String fileUploadMain() {
		return "fileUpload/main";
	}
	
	
	/** 단일 파일 업로드
	 * @return
	 */
	@PostMapping("test1")
	public String test1() { 
		
		return "redirect:main";
	}
}
