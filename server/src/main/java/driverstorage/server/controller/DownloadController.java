package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import driverstorage.server.dto.DownloadFileDto;
import driverstorage.server.dto.DownloadFolderDto;
import driverstorage.server.dto.DownloadResultDto;
import driverstorage.server.service.DownloadService;

@CrossOrigin
@RestController
@RequestMapping("/download")
public class DownloadController {
	private DownloadService downloadService;

	@Autowired
	public DownloadController(DownloadService downloadService) {
		this.downloadService = downloadService;
	}

	@GetMapping("/files")
	public DownloadResultDto downloadFile(@RequestBody DownloadFileDto downloadFileDto) {
		return this.downloadService.downloadFile(downloadFileDto);
	}

	@GetMapping("/folders")
	public DownloadResultDto downloadFolder(@RequestBody DownloadFolderDto downloadFolderDto) {
		return this.downloadService.downloadFolder(downloadFolderDto);
	}
}