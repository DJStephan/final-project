package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import driverstorage.server.dto.ViewDto;
import driverstorage.server.service.EditService;

@RestController
public class EditController {
	private EditService editService;

	@Autowired
	public EditController(EditService editService) {
		this.editService = editService;
	}
	
	/**
	 * Create a new folder in given location
	 * 
	 * @param folderId, folderName
	 * @return ViewDto
	 */
	@PostMapping("edit/create/{folderName}")
	public ViewDto createFolder(@PathVariable("folderName") String folderName, @RequestParam Long folderId) {
		return editService.createFolder(folderId, folderName);
	}
	/**
	 * delete a file in given location
	 * 
	 * @param fileId
	 * @return ViewDto
	 */
	@DeleteMapping("edit/delete/file/{fileId}")
	public ViewDto deleteFile(@PathVariable("fileId") Long fileId) {
		return editService.deleteFile(fileId);
	}

	/**
	 * delete a folder in given location
	 * 
	 * @param folderId
	 * @return ViewDto
	 */
	@DeleteMapping("edit/delete/folder/{folderId}")
	public ViewDto deleteFolder(@PathVariable("folderId") Long folderId) {
		return editService.deleteFolder(folderId);
	}

	/**
	 * move a file to a given location
	 * 
	 * @param fileId, locationFolderId
	 * @return ViewDto
	 */
	@PatchMapping("edit/move/file")
	public ViewDto moveFile(@RequestParam("fileId") Long fileId, @RequestParam("locationFolderId") Long locationFolderId) {
		return editService.moveFile(fileId, locationFolderId);
	}
	
	/**
	 * move a folder to a given location
	 * 
	 * @param folderId, locationFolderId
	 * @return ViewDto
	 */
	@PatchMapping("edit/move/folder")
	public ViewDto moveFolder(@RequestParam("folderId") Long folderId, @RequestParam("locationFolderId") Long locationFolderId) {
		return editService.moveFolder(folderId, locationFolderId);
	}
	/**
	 * Rename a file
	 * 
	 * @param fileId, newName
	 * @return ViewDto
	 */
	@PatchMapping("edit/rename/file/{newName}")
	public ViewDto renameFile(@RequestParam("fileId") Long fileId, @PathVariable("newName") String newName) {
		return editService.renameFile(fileId, newName);
	}

	/**
	 * Rename a folder
	 * 
	 * @param folderId, newName
	 * @return ViewDto
	 */
	@PatchMapping("edit/rename/folder/{newName}")
	public ViewDto renameFolder(@RequestParam("folderId") Long folderId, @PathVariable("newName") String newName) {
		return editService.renameFolder(folderId, newName);
	}
}
