package driverstorage.server.service;

import java.util.ArrayList;

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
	private FileRepository fileRepository;
	private FolderRepository folderRepository;

	@Autowired
	public EditService(FileRepository fileRepository, FolderRepository folderRepository) {
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
		Folder parentFolder;
		if(folderId == null) {
			parentFolder = this.folderRepository.getFolderById((long) 1);
		} else {
			parentFolder = this.folderRepository.getFolderById(folderId);
		}
		
		if(parentFolder.getFolders().isEmpty()) {
			parentFolder.setFolders(new ArrayList<Folder>());
		}
		
		newFolder.setParentFolder(parentFolder);

		parentFolder.getFolders().add(this.folderRepository.save(newFolder));
		this.folderRepository.save(parentFolder);
		
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
		File file = this.fileRepository.getFileById(fileId);
		//IF it is in trash bin
		if(trashbin.getFiles().contains(file)) {
			this.fileRepository.delete(file);
		} else {
			//move to trashbin
			moveFile(fileId, (long) 2);
		}
		
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
		Folder trashbin = this.folderRepository.getFolderById((long) 2);
		Folder folder = this.folderRepository.getFolderById(folderId);
		//IF it is in trash bin
		if(trashbin.getFolders().contains(folder)) {
			this.folderRepository.delete(folder);
		} else {
			//move to trashbin
			moveFolder(folderId, (long) 2);
		}
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
		File file = this.fileRepository.getFileById(fileId);
		file.setParent(this.folderRepository.getFolderById(locationFolderId));
		this.fileRepository.save(file);
		
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
		Folder folder = this.folderRepository.getFolderById(folderId);
		folder.setParentFolder(this.folderRepository.getFolderById(locationFolderId));
		this.folderRepository.save(folder);

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
		File file = this.fileRepository.getFileById(fileId);
		file.setFileName(newName);
		this.fileRepository.save(file);
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
		Folder folder = this.folderRepository.getFolderById(folderId);
		folder.setFolderName(newName);
		this.folderRepository.save(folder);
		ViewDto root = new ViewDto();
		return root;
	}
}
