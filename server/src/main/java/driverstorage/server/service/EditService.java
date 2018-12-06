package driverstorage.server.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.ResultDto;
import driverstorage.server.dto.idDto;
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
	private final static Long TRASH_FOLDER_ID = (long) 2;
	@Autowired
	public EditService(FileRepository fileRepository, FolderRepository folderRepository) {
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
	}
	
	
	/**
	 * Create a new folder in given location
	 * 
	 * @param parentFolderId, folderName
	 * @return ResultDto
	 */
	public idDto createFolder(Long parentFolderId, String folderName) {

		Folder newFolder = new Folder();
		newFolder.setFolderName(folderName);
		Folder parentFolder;
		if(parentFolderId == null) {
			parentFolder = this.folderRepository.getFolderById((long) 1);
		} else {
			parentFolder = this.folderRepository.getFolderById(parentFolderId);
		}
		
		if(parentFolder.getFolders().isEmpty()) {
			parentFolder.setFolders(new ArrayList<Folder>());
		}
		
		newFolder.setParentFolder(parentFolder);

		parentFolder.getFolders().add(this.folderRepository.save(newFolder));
		this.folderRepository.save(parentFolder);
		ResultDto result = new ResultDto((long) 200, String.format("Folder %s created successfully", folderName));

		return new idDto(result, newFolder.getId());
	}

	/**
	 * delete a file in given location
	 *
	 * @param fileId
	 * @return ResultDto
	 */
	public ResultDto trashFile(Long fileId) {
		return moveFile(fileId, TRASH_FOLDER_ID);
	}

	private void removeFileFromParent (File file, Folder oldParent, boolean save) {
		if (file == null || oldParent == null) {
			return;
		}
		List<File> files = oldParent.getFiles();
		files.remove(file);
		oldParent.setFiles(files);
		if (save) {
			this.folderRepository.save(oldParent);
		}
	}

	private void removeFolderFromParent (Folder folder, Folder oldParent, boolean save) {
		if (folder == null || oldParent == null) {
			return;
		}
		List<Folder> folders = oldParent.getFolders();
		folders.remove(folder);
		oldParent.setFolders(folders);
		if (save) {
			this.folderRepository.save(oldParent);
		}

	}

	private void deleteFileFromDatabase (File file) {
		Folder oldParent = file.getParent();
		removeFileFromParent(file, oldParent, true);
		this.fileRepository.delete(file);
	}

	/**
	 * delete a file in given location
	 * 
	 * @param fileId
	 * @return ResultDto
	 */

	public ResultDto deleteFile(Long fileId) {
		Folder trashBin = this.folderRepository.getFolderById((long) 2);
		File file = this.fileRepository.getFileById(fileId);
		if (file == null) {
			return new ResultDto((long) 404, String.format("No file with file id %d found.", fileId));
		}
		//IF it is in trash bin
		if(trashBin.getFiles().contains(file)) {
			deleteFileFromDatabase(file);
		} else {
			return new ResultDto((long) 404,
					String.format("No file with file id %d found in trash.", fileId));
		}

		;
		return new ResultDto((long) 200, String.format("File %d deleted permanently", fileId));
	}

	/**
	 * move a folder to the trash
	 *
	 * @param folderId
	 * @return ResultDto
	 */
	public ResultDto trashFolder(Long folderId) {
		return moveFolder(folderId, TRASH_FOLDER_ID);
	}

	/**
	 * delete a folder in given location
	 * 
	 * @param folderId
	 * @return ResultDto
	 */
	public ResultDto deleteFolder(Long folderId) {
		Folder trashBin = this.folderRepository.getFolderById((long) 2);
		Folder folder = this.folderRepository.getFolderById(folderId);
		if (folder == null) {
			return new ResultDto((long) 404, String.format("No folder with id %d found.", folderId));
		}
		if (folderId < 3) {
			return new ResultDto((long) 400,
					String.format("The %s folder cannot be deleted", folder.getFolderName()));
		}
		if(!trashBin.getFolders().contains(folder)) {
			return new ResultDto((long) 404,
					String.format("No folder with id %d found in trash.", folderId));
		}
		Folder parentFolder = folder.getParentFolder();
		removeFolderFromParent(folder, parentFolder, true);

		deleteRecursively(folder);
		return new ResultDto((long) 200, String.format("Folder %d and all contents deleted permanently", folderId));
	}

	private void deleteRecursively(Folder folder) {
		for (File file: folder.getFiles()) {
			deleteFileFromDatabase(file);
		}
		for (Folder innerFolder : folder.getFolders()) {
			removeFolderFromParent(innerFolder, folder, false);
			deleteRecursively(innerFolder);
		}

		this.folderRepository.delete(folder);
	}

	/**
	 * move a file to a given location
	 * 
	 * @param fileId, locationFolderId
	 * @return ResultDto
	 */
	public ResultDto moveFile(Long fileId, Long locationFolderId) {
		File file = this.fileRepository.getFileById(fileId);
		if (file == null) {
			return new ResultDto((long) 404, String.format("No file with file id %d found.", fileId));
		}
		Folder oldParent = file.getParent();
		Folder newParent = (this.folderRepository.getFolderById(locationFolderId));
		if (newParent == null) {
			return new ResultDto((long) 404, String.format("No folder with id %d found.", locationFolderId));
		}
		removeFileFromParent(file, oldParent, true);
		List<File> files = newParent.getFiles();
		files.add(file);
		newParent.setFiles(files);
		this.folderRepository.save(newParent);

		file.setParent(newParent);
		this.fileRepository.save(file);

		return new ResultDto((long) 200, String.format(
				"File %d moved to %s folder successfully", fileId, newParent.getFolderName()));

	}
	/**
	 * move a folder to a given location
	 * 
	 * @param folderId, locationFolderId
	 * @return ResultDto
	 */
	public ResultDto moveFolder(Long folderId, Long locationFolderId) {
		if (folderId < 3 || folderId == locationFolderId) {
			return new ResultDto((long) 404, "Could not move folder");
		}

		Folder folder = this.folderRepository.getFolderById(folderId);
		if (folder == null) {
			return new ResultDto((long) 404, String.format("No folder with id %d found.", folderId));
		}

		Folder newParent = this.folderRepository.getFolderById(locationFolderId);
		if (newParent == null) {
			return new ResultDto((long) 404, String.format("No parent folder with id %d found.", locationFolderId));
		}

		Folder oldParent = folder.getParentFolder();
		removeFolderFromParent(folder, oldParent, true);

		List<Folder> folders = newParent.getFolders();
		folders.add(folder);
		newParent.setFolders(folders);
		this.folderRepository.save(newParent);

		folder.setParentFolder(this.folderRepository.getFolderById(locationFolderId));
		this.folderRepository.save(folder);

		return new ResultDto((long) 200, String.format(
				"Folder %d moved to %s folder successfully", folderId, newParent.getFolderName()));
	}
	/**
	 * Rename a file
	 * 
	 * @param fileId, newName
	 * @return ResultDto
	 */
	public ResultDto renameFile(Long fileId, String newName) {
		File file = this.fileRepository.getFileById(fileId);
		if (file == null) {
			return new ResultDto((long) 404, String.format("No file with file id %d found.", fileId));
		}
		file.setFileName(newName);
		this.fileRepository.save(file);
		return new ResultDto((long) 200, String.format("File %d renamed to %s", fileId, newName));
	}
	/**
	 * Rename a folder
	 * 
	 * @param folderId, newName
	 * @return ResultDto
	 */
	public ResultDto renameFolder(Long folderId, String newName) {
		if (folderId < 3) {
			return new ResultDto((long) 404, "Could not rename core folder");
		}
		Folder folder = this.folderRepository.getFolderById(folderId);
		if (folder == null) {
			return new ResultDto((long) 404, String.format("No folder with id %d found.", folderId));
		}

		folder.setFolderName(newName);
		this.folderRepository.save(folder);
		ResultDto root = new ResultDto();
		return new ResultDto((long) 200, String.format(
				"Folder %d renamed to %s", folderId, newName));
	}
}
