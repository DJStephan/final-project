package driverstorage.server.controller;

import driverstorage.server.dto.DownloadFileDto;
import driverstorage.server.dto.DownloadFolderDto;
import driverstorage.server.dto.DownloadResultDto;
import driverstorage.server.service.DownloadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/download")
public class DownloadController {
    private DownloadService downloadService;

    @Autowired
    public DownloadController(DownloadService downloadService) {
        this.downloadService = downloadService;
    }

    @GetMapping("/files/{fileId}")
    public DownloadFileDto downloadFile(@PathVariable("fileId") Long fileId) {
        return this.downloadService.downloadFile(fileId);
    }

    @GetMapping("/folders/{folderId}")
    public DownloadFolderDto downloadFolder(@PathVariable("folderId") Long folderId) {
        return this.downloadService.downloadFolder(folderId);
    }
}