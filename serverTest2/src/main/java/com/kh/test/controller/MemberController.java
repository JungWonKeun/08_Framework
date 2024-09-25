package com.kh.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kh.test.dto.Member;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("member")
public class MemberController {

	@PostMapping("select")
	public String selectMember(HttpServletRequest req, @ModelAttribute Member member, Model model) {
		
		model.addAttribute("memberName");
		model.addAttribute("memberAge");
		model.addAttribute("memberAddress");
		
		// Model 아니여도 HttpServletRequest 이용해서 request scope 세팅 가능
		req.setAttribute("memberName", member.getMemberName());
		req.setAttribute("memberAge", member.getMemberAge());
		req.setAttribute("memberAddress", member.getMemberAddress());

	
		
		return "member/select";
	}
	
}