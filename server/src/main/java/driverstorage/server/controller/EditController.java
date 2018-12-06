package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import driverstorage.server.dto.ViewDto;
import driverstorage.server.service.EditService;

@CrossOrigin
@RestController
@RequestMapping("/edit")
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
	@PostMapping("/create/{folderName}")
	public ViewDto createFolder(@PathVariable("folderName") String folderName, @RequestParam Long folderId) {
		return editService.createFolder(folderId, folderName);
	}
	/**
	 * delete a file in given location
	 * 
	 * @param fileId
	 * @return ViewDto
	 */
	@DeleteMapping("/delete/file/{fileId}")
	public ViewDto deleteFile(@PathVariable("fileId") Long fileId) {
		return editService.deleteFile(fileId);
	}

	/**
	 * delete a folder in given location
	 * 
	 * @param folderId
	 * @return ViewDto
	 */
	@DeleteMapping("/delete/folder/{folderId}")
	public ViewDto deleteFolder(@PathVariable("folderId") Long folderId) {
		return editService.deleteFolder(folderId);
	}

	/**
	 * move a file to a given location
	 * 
	 * @param fileId, locationFolderId
	 * @return ViewDto
	 */
	@PatchMapping("/move/file/{fileId}/{locationFolderId}")
	public ViewDto moveFile(@PathVariable("fileId") Long fileId, @PathVariable("locationFolderId") Long locationFolderId) {
		return editService.moveFile(fileId, locationFolderId);
	}
	
	/**
	 * move a folder to a given location
	 * 
	 * @param folderId, locationFolderId
	 * @return ViewDto
	 */
	@PatchMapping("/move/folder/{folderId}/{locationFolderId}")
	public ViewDto moveFolder(@PathVariable("folderId") Long folderId, @PathVariable("locationFolderId") Long locationFolderId) {
		return editService.moveFolder(folderId, locationFolderId);
	}
	/**
	 * Rename a file
	 * 
	 * @param fileId, newName
	 * @return ViewDto
	 */
	@PatchMapping("/rename/file/{fileId}/{newName}")
	public ViewDto renameFile(@PathVariable("fileId") Long fileId, @PathVariable("newName") String newName) {
		return editService.renameFile(fileId, newName);
	}

	/**
	 * Rename a folder
	 * 
	 * @param folderId, newName
	 * @return ViewDto
	 */
	@PatchMapping("/rename/folder/{folderId}/{newName}")
	public ViewDto renameFolder(@PathVariable("folderId") Long folderId, @PathVariable("newName") String newName) {
		return editService.renameFolder(folderId, newName);
	}
}
