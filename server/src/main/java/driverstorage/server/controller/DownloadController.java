package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.DownloadDto;
import driverstorage.server.dto.DownloadResultDto;
import driverstorage.server.service.DownloadService;

@RestController
public class DownloadController {
	private DownloadService downloadService;

	@Autowired
	public DownloadController(DownloadService downloadService) {
		this.downloadService = downloadService;
	}

	@GetMapping("download")
	public DownloadResultDto download(@RequestBody DownloadDto downloadDto) {
		return this.downloadService.download(downloadDto);
	}

}