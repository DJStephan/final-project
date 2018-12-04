package driverstorage.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import driverstorage.server.mapper.FileMapper;
import driverstorage.server.mapper.FolderMapper;

@Service
public class DownloadService {
	private FileRepository fileRepository;
	private FolderRepository folderRepository;
	private FileMapper fileMapper;
	private FolderMapper folderMapper;
	
	@Autowired
	public DownloadService(FileRepository fileRepository, FolderRepository folderRepository, FileMapper fileMapper,
			FolderMapper folderMapper) {
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
		this.fileMapper = fileMapper;
		this.folderMapper = folderMapper;
	}
public Boolean fileExists(String fileName) {
	return placeholder.fileExists(fileName, this.fileRepository);
}
public Boolean folderExists(String foldername) {
	return placeholder.folderExists(folderName, this.folderRepository);
}
public List<FileDto> getFile() {
	return this.fileMapper.entitysToDtos(this.fileRepository.findAll());
}
public List<FolderDto> getFolder() {
	return this.folderMapper.entitysToDtos(this.folderRepoitory.findAll());
}
}
