package driverstorage.server.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
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
//		System.out.println("Uploading");
//		System.out.println(files.length);
		Folder parentFolder = this.folderRepository.getFolderById(Long.parseLong(folderId));
		;
		for (MultipartFile f : files) {

			try {
				if (!f.isEmpty()) {
					File newFile = new File();
					newFile.setData(f.getBytes());
					newFile.setFileName(f.getOriginalFilename());
					newFile.setParent(parentFolder);
					parentFolder.getFiles().add(this.fileRepository.save(newFile));
					this.folderRepository.save(parentFolder);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println("ERROR");
				e.printStackTrace();
				Long status = (long) 500;
				return new ResultDto(status, "Problem with file upload");
			}
		}
		Long status = (long) 200;
		return new ResultDto(status, "Files uploaded successfully");
	}

}
