package edu.kh.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import edu.kh.test.dto.Student;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Controller
public class StudentController {

	@GetMapping("student/select")
	public String selectStudent(@ModelAttribute Student student, HttpServletRequest req) {

	
	String stdName = req.getParameter("stdName");
	String stdAge = req.getParameter("stdAge");
	String stdAddress = req.getParameter("stdAddress");
	
	System.out.println(stdName);
	System.out.println(stdAge);	
	System.out.println(stdAddress);
	
	return "/student/select";
	}

}