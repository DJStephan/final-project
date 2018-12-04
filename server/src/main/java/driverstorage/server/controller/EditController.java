package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.service.EditService;

@RestController
public class EditController {
	private EditService editService;

	@Autowired
	public EditController(EditService editService) {
		this.editService = editService;
	}
	
	/**
	 * Create a new file in given location
	 * 
	 * @param folderId, folderName
	 * @return FileStructureDto
	 */
	@PostMapping("edit/create/{folderId}/{folderName}")
	public void createFolder(@PathVariable("folderIdd") Long folderId, @PathVariable("folderName") String folderName) {
		editService.createFolder(folderId);
	}
	/**
	 * delete a file in given location
	 * 
	 * @param fileId
	 * @return FileStructureDto
	 */
	@DeleteMapping("edit/delete/file/{fileId}")
	public void deleteFile(@PathVariable("fileId") Long fileId) {
		editService.deleteFile(fileId);
	}

	/**
	 * delete a folder in given location
	 * 
	 * @param folderId
	 * @return FileStructureDto
	 */
	@DeleteMapping("edit/delete/folder/{folderId}")
	public void deleteFolder(@PathVariable("folderId") Long folderId) {
		editService.deleteFolder(folderId);
	}

	/**
	 * move a file to a given location
	 * 
	 * @param fileId, locationFolderId
	 * @return FileStructureDto
	 */
	@PatchMapping("edit/move/file/{fileId}/{locationFolderId}")
	public void moveFile(@PathVariable("fileId") Long fileId, @PathVariable("locationFolderId") Long locationFolderId) {
		editService.moveFile(fileId, locationFolderId);
	}
	
	/**
	 * move a folder to a given location
	 * 
	 * @param folderId, locationFolderId
	 * @return FileStructureDto
	 */
	@PatchMapping("edit/move/folder/{folderId}/{locationFolderId}")
	public void moveFolder(@PathVariable("folderId") Long folderId, @PathVariable("locationFolderId") Long locationFolderId) {
		editService.moveFolder(folderId, locationFolderId);
	}
	/**
	 * Rename a file
	 * 
	 * @param fileId, newName
	 * @return FileStructureDto
	 */
	@PatchMapping("edit/rename/file/{fileId}/{newName}")
	public void renameFile(@PathVariable("fileId") Long fileId, @PathVariable("newName") String newName) {
		editService.renameFile(fileId, newName);
	}

	/**
	 * Rename a folder
	 * 
	 * @param folderId, newName
	 * @return FileStructureDto
	 */
	@PatchMapping("edit/rename/folder/{folderId}/{newName}")
	public void renameFolder(@PathVariable("folderId") Long folderId, @PathVariable("newName") String newName) {
		editService.renameFolder(folderId, newName);
	}
}
