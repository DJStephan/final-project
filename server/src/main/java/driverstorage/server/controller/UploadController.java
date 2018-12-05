package driverstorage.server.controller;

import java.util.Iterator;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import driverstorage.server.service.UploadService;
import driverstorage.server.dto.UploadDto;
import driverstorage.server.dto.UploadResultDto;

@RestController
public class UploadController {
	private UploadService uploadService;

	@Autowired
	public UploadController(UploadService uploadService) {
		this.uploadService = uploadService;
	}
	
	/**
	 * Uploads specified files and/or folders in upload request
	 * into database in specified location
	 * 
	 * @param upload request
	 * @return upload results
	 * @throws LocationNotFound if location does not exist or is deleted
	 */
	@PostMapping("upload")
	public UploadResultDto upload(@RequestBody UploadDto uploadDto) {
		return this.uploadService.upload(uploadDto);
	}
	
	@PostMapping(path = "upload/files", consumes = "multipart/form-data")
	public UploadResultDto uploadMult(MultipartHttpServletRequest multRequest, @RequestParam("files") MultipartFile[] files) {
		System.out.println(files.length);
		for (Map.Entry<String, MultipartFile> entry : multRequest.getFileMap().entrySet()) {
		    System.out.println(entry.getKey());
		    System.out.println(entry.getValue());
		}
		return this.uploadService.upload(files);
	}
	
	@PostMapping(path = "upload/file", consumes = "multipart/form-data")
	public UploadResultDto uploadMultM(@RequestParam("file") MultipartFile file) {
		MultipartFile[] files = new MultipartFile[1];
		files[0] = file;
		return this.uploadService.upload(files);
	}
}
