package driverstorage.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.UploadDto;
import driverstorage.server.dto.UploadResultDto;
import driverstorage.server.entity.File;
import driverstorage.server.entity.Folder;
import driverstorage.server.mapper.FileMapper;
import driverstorage.server.mapper.FolderMapper;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;
import driverstorage.server.repository.UploadRepository;

@RestController
public class UploadService {
	private FileMapper fileMapper;
	private FolderMapper folderMapper;
	private FileRepository fileRepository;
	private FolderRepository folderRepository;

	@Autowired
	public UploadService(FileMapper fileMapper, FolderMapper folderMapper, FileRepository fileRepository, FolderRepository folderRepository) {
		this.fileMapper = fileMapper;
		this.folderMapper = folderMapper;
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
	}
	
	public UploadResultDto upload(UploadDto uploadDto) {
		Long locationId = uploadDto.getFolderId();
		List<Folder> folders = folderMapper.dtosToEntitys(uploadDto.getFolders());
		List<File> files = fileMapper.dtosToEntitys(uploadDto.getFiles());
		
		System.out.println(uploadDto);
		System.out.println(folders);
		System.out.println(files);
		
		Folder saveLocation = folderRepository.getFolderById(locationId);
		saveLocation.getFolders().addAll(folders);
		saveLocation.getFiles().addAll(files);
		this.folderRepository.save(saveLocation);
		this.folderRepository.saveAll(folders);
		this.fileRepository.saveAll(files);
		
		UploadResultDto result = new UploadResultDto();
		//ResultDto resultdt = new ResultDto();
		//resultdt.setStatusCode((long) 500);
		//result.setResult(resultdt);
		
		return result;
	}
}
