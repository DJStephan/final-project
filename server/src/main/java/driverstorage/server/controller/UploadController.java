package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import driverstorage.server.dto.ResultDto;
import driverstorage.server.service.UploadService;

@CrossOrigin
@RestController
@RequestMapping("/upload")
public class UploadController {
	private UploadService uploadService;

	@Autowired
	public UploadController(UploadService uploadService) {
		this.uploadService = uploadService;
	}

	/**
	 * Uploads specified files and/or folders in upload request into database in
	 * specified location
	 *
	 * @param upload request
	 * @return upload results
	 * @throws LocationNotFound if location does not exist or is deleted
	 */

	@PostMapping(path = "/files", consumes = "multipart/form-data")
	public ResultDto uploadMult(MultipartHttpServletRequest multRequest, @RequestParam("files") MultipartFile[] files,
			@RequestParam String folderId) {
		return this.uploadService.upload(files, folderId);
	}
}
