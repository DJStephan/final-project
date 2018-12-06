package driverstorage.server.service;

import driverstorage.server.dto.DownloadFileDto;
import driverstorage.server.dto.DownloadFolderDto;
import driverstorage.server.dto.FileDto;
import driverstorage.server.dto.ResultDto;
import driverstorage.server.dto.FolderDto;
import driverstorage.server.entity.File;
import driverstorage.server.entity.Folder;
import driverstorage.server.mapper.FileMapper;
import driverstorage.server.mapper.FolderMapper;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.ArrayList;

@RestController
public class DownloadService {
    private FileRepository fileRepository;
    private FolderRepository folderRepository;
    private FileMapper fileMapper;
    private FolderMapper folderMapper;
//	private DownloadFileDto downloadFileDto;
//	private DownloadFolderDto downloadFolderDto;

    @Autowired
    public DownloadService(FileRepository fileRepository, FolderRepository folderRepository, FileMapper fileMapper,
                           FolderMapper folderMapper) {
        this.fileRepository = fileRepository;
        this.folderRepository = folderRepository;
        this.fileMapper = fileMapper;
        this.folderMapper = folderMapper;
    }

    public List<FileDto> getFile() {
        return this.fileMapper.entitysToDtos(this.fileRepository.findAll());
    }

    public List<FolderDto> getFolder() {
        return this.folderMapper.entitysToDtos(this.folderRepository.findAll());
    }

    public DownloadFileDto downloadFile(Long fileId) {
        File file = fileRepository.getFileById(fileId);
        if (file == null) {
            ResultDto result = new ResultDto((long) 404, String.format("No file with file id %d found.", fileId));
            return new DownloadFileDto(result, null);
        } else {
            ResultDto result = new ResultDto((long) 200, "Success");
            FileDto fileDto = new FileDto(file.getFileName(), file.getData());
            return new DownloadFileDto(result, fileDto);
        }
    }


    private void populateFolderDto (FolderDto folderDto, Folder folder) {
        List<FileDto> fileDtos = new ArrayList<>();
        for (File file: folder.getFiles()) {
            fileDtos.add(new FileDto(file.getFileName(), file.getData()));
        }
        folderDto.setFolderName(folder.getFolderName());
        folderDto.setFiles(fileDtos);
        List<FolderDto> folderDtos = new ArrayList<>();
        for (Folder innerFolder: folder.getFolders()) {
            FolderDto innerFolderDto = new FolderDto();
            populateFolderDto(innerFolderDto, innerFolder);
            folderDtos.add(innerFolderDto);
        }
        folderDto.setFolders(folderDtos);
    }
    public DownloadFolderDto downloadFolder(Long folderId) {
        Folder folder = folderRepository.getFolderById(folderId);
        if (folder == null) {
            ResultDto result = new ResultDto((long) 404, String.format("No folder with id %d found.", folderId));
            return new DownloadFolderDto(result, null);
        }
        FolderDto folderDto = new FolderDto();
        populateFolderDto(folderDto, folder);
        ResultDto result = new ResultDto((long) 200, "Success");
        return new DownloadFolderDto(result, folderDto);

    }
}
