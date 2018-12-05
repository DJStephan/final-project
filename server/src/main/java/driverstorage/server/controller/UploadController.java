package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

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
	
	@PostMapping("upload/files")
	public UploadResultDto uploadMult(@RequestParam("file") MultipartFile[] file) {
		return this.uploadService.upload(file[0]);
	}
}
