package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.DownloadFileDto;
import driverstorage.server.dto.DownloadFolderDto;
import driverstorage.server.dto.DownloadResultDto;
import driverstorage.server.service.DownloadService;

@RestController
public class DownloadController {
	private DownloadService downloadService;

	@Autowired
	public DownloadController(DownloadService downloadService) {
		this.downloadService = downloadService;
	}

	@GetMapping("download/files")
	public DownloadResultDto downloadFile(@RequestBody DownloadFileDto downloadFileDto) {
		return this.downloadService.downloadFile(downloadFileDto);
	}

	@GetMapping("download/folders")
	public DownloadResultDto downloadFolder(@RequestBody DownloadFolderDto downloadFolderDto) {
		return this.downloadService.downloadFolder(downloadFolderDto);
	}
}