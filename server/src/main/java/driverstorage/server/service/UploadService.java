package driverstorage.server.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import driverstorage.server.dto.ResultDto;
import driverstorage.server.entity.File;
import driverstorage.server.entity.Folder;
import driverstorage.server.mapper.FileMapper;
import driverstorage.server.mapper.FolderMapper;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;

@Service
public class UploadService {
	private FileRepository fileRepository;
	private FolderRepository folderRepository;

	@Autowired
	public UploadService(FileMapper fileMapper, FolderMapper folderMapper, FileRepository fileRepository,
			FolderRepository folderRepository) {
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
	}

	public ResultDto upload(MultipartFile[] files, String folderId) {
		if (folderId.equals("2")) {
			Long status = (long) 400;
			return new ResultDto(status, "Cannot upload to trash folder!");
		}
		Folder parentFolder = this.folderRepository.getFolderById(Long.parseLong(folderId));
		if (parentFolder == null) {
			Long status = (long) 400;
			return new ResultDto(status, "No folder with ID#" + folderId + " exists");
		}
		if (files.length == 0) {
			Long status = (long) 400;
			return new ResultDto(status, "No files sent ya dingas!");
		}
		for (MultipartFile f : files) {
			try {
				if (!f.isEmpty()) {
					System.out.println("in the if statement");
					File newFile = new File();
					newFile.setData(f.getBytes());
					newFile.setFileName(f.getOriginalFilename());
					newFile.setParent(parentFolder);
					newFile.setType(f.getContentType());
					parentFolder.getFiles().add(this.fileRepository.saveAndFlush(newFile));
					this.folderRepository.saveAndFlush(parentFolder);
				} else {
					File newFile = new File();
					newFile.setFileName(f.getOriginalFilename());
					newFile.setParent(parentFolder);
					parentFolder.getFiles().add(this.fileRepository.saveAndFlush(newFile));
					this.folderRepository.saveAndFlush(parentFolder);
				}
			} catch (IOException e) {
				e.printStackTrace();
				Long status = (long) 500;
				return new ResultDto(status, "Problem with file upload");
			}
		}
		Long status = (long) 200;
		return new ResultDto(status, "Files uploaded successfully");
	}

}
