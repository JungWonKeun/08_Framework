package edu.kh.project.fileUpload.service;

import org.springframework.stereotype.Service;

import edu.kh.project.fileUpload.mapper.FileUploadMapper;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService{

	private final FileUploadMapper mapper;
}
