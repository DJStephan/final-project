package driverstorage.server.controller;

import driverstorage.server.dto.ResultDto;
import driverstorage.server.dto.idDto;
import driverstorage.server.service.EditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
     * @param parentFolderId, folderName
     * @return ViewDto
     */
    @PostMapping("/create/{folderName}")
    public idDto createFolder(@PathVariable("folderName") String folderName, @RequestParam Long parentFolderId) {
        return editService.createFolder(parentFolderId, folderName);
    }

    /**
     * Moves a file to the trash
     *
     * @param fileId
     * @return ViewDto
     */
    @PatchMapping("/trash/file/{fileId}")
    public ResultDto trashFile(@PathVariable("fileId") Long fileId) {
        return editService.trashFile(fileId);
    }


    /**
     * delete a file in given location
     *
     * @param fileId
     * @return ViewDto
     */
    @DeleteMapping("/delete/file/{fileId}")
    public ResultDto deleteFile(@PathVariable("fileId") Long fileId) {
        return editService.deleteFile(fileId);
    }

    /**
     * Moves a folder to the trash
     *
     * @param folderId
     * @return ViewDto
     */
    @PatchMapping("/trash/folder/{folderId}")
    public ResultDto trashFolder(@PathVariable("folderId") Long folderId) {
        return editService.trashFolder(folderId);
    }


    /**
     * delete a folder in given location
     *
     * @param folderId
     * @return ViewDto
     */
    @DeleteMapping("/delete/folder/{folderId}")
    public ResultDto deleteFolder(@PathVariable("folderId") Long folderId) {
        return editService.deleteFolder(folderId);
    }

    /**
     * move a file to a given location
     *
     * @param fileId, locationFolderId
     * @return ViewDto
     */
    @PatchMapping("/move/file/{fileId}/{locationFolderId}")
    public ResultDto moveFile(@PathVariable("fileId") Long fileId, @PathVariable("locationFolderId") Long locationFolderId) {
        return editService.moveFile(fileId, locationFolderId);
    }

    /**
     * move a folder to a given location
     *
     * @param folderId, locationFolderId
     * @return ViewDto
     */
    @PatchMapping("/move/folder/{folderId}/{locationFolderId}")
    public ResultDto moveFolder(@PathVariable("folderId") Long folderId, @PathVariable("locationFolderId") Long locationFolderId) {
        return editService.moveFolder(folderId, locationFolderId);
    }

    /**
     * Rename a file
     *
     * @param fileId, newName
     * @return ViewDto
     */
    @PatchMapping("/rename/file/{fileId}/{newName}")
    public ResultDto renameFile(@PathVariable("fileId") Long fileId, @PathVariable("newName") String newName) {
        return editService.renameFile(fileId, newName);
    }

    /**
     * Rename a folder
     *
     * @param folderId, newName
     * @return ViewDto
     */
    @PatchMapping("/rename/folder/{folderId}/{newName}")
    public ResultDto renameFolder(@PathVariable("folderId") Long folderId, @PathVariable("newName") String newName) {
        return editService.renameFolder(folderId, newName);
    }
}
