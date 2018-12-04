package driverstorage.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.DownloadDto;

@RestController
public class DownloadController {
	private DownloadService downloadService;

	public DownloadController(DownloadService downloadService) {
		this.downloadService = downloadService;
	}

	@GetMapping("fileName")
	public DownloadDto getDownload(@PathVariable("fileName") String fileName) throws FileNotFound {
		return this.downloadService.getDownload(fileName);
	}
//@DeleteMapping("/edit/delete") 
//public downloadDto deleteFile(@PathVariable("delete") placeholder) {
//return this.downloadService.deleteFile(placeholder);
//}
}