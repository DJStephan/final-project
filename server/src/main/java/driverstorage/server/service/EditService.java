package driverstorage.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.ViewDto;
import driverstorage.server.entity.File;
import driverstorage.server.entity.Folder;
import driverstorage.server.mapper.FileMapper;
import driverstorage.server.mapper.FolderMapper;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;

@RestController
public class EditService {
	private FileMapper fileMapper;
	private FolderMapper folderMapper;
	private FileRepository fileRepository;
	private FolderRepository folderRepository;

	@Autowired
	public EditService(FileMapper fileMapper, FolderMapper folderMapper, FileRepository fileRepository, FolderRepository folderRepository) {
		this.fileMapper = fileMapper;
		this.folderMapper = folderMapper;
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
	}
	
	
	/**
	 * Create a new folder in given location
	 * 
	 * @param folderId, folderName
	 * @return ViewDto
	 */
	public ViewDto createFolder(Long folderId, String folderName) {
		Folder newFolder = new Folder();
		newFolder.setFolderName(folderName);
		
		Folder parentFolder = this.folderRepository.getFolderById(folderId);
		
		parentFolder.getFolders().add(this.folderRepository.save(newFolder));
		
		ViewDto root = new ViewDto();
		return root;
	}
	/**
	 * delete a file in given location
	 * 
	 * @param fileId
	 * @return ViewDto
	 */
	public ViewDto deleteFile(Long fileId) {
		Folder trashbin = this.folderRepository.getFolderById((long) 2);
		
		
		ViewDto root = new ViewDto();
		return root;
	}
	/**
	 * delete a folder in given location
	 * 
	 * @param folderId
	 * @return ViewDto
	 */
	public ViewDto deleteFolder(Long folderId) {
		
		ViewDto root = new ViewDto();
		return root;
	}
	/**
	 * move a file to a given location
	 * 
	 * @param fileId, locationFolderId
	 * @return ViewDto
	 */
	public ViewDto moveFile(Long fileId, Long locationFolderId) {
		Folder newLocation = this.folderRepository.getFolderById(locationFolderId);
		File file = this.fileRepository.getFileById(fileId);
		Folder fileParent = file.getParent();
		
		newLocation.getFiles().add(file);
		this.folderRepository.save(newLocation);
		fileParent.getFiles().remove(file);
		this.folderRepository.save(fileParent);
		
		ViewDto root = new ViewDto();
		return root;
	}
	/**
	 * move a folder to a given location
	 * 
	 * @param folderId, locationFolderId
	 * @return ViewDto
	 */
	public ViewDto moveFolder(Long folderId, Long locationFolderId) {
		
		ViewDto root = new ViewDto();
		return root;
		
	}
	/**
	 * Rename a file
	 * 
	 * @param fileId, newName
	 * @return ViewDto
	 */
	public ViewDto renameFile(Long fileId, String newName) {

		
		ViewDto root = new ViewDto();
		return root;
	}
	/**
	 * Rename a folder
	 * 
	 * @param folderId, newName
	 * @return ViewDto
	 */
	public ViewDto renameFolder(Long folderId, String newName) {

		
		ViewDto root = new ViewDto();
		return root;
	}
}
