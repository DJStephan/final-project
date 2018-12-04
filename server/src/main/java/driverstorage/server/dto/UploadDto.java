package driverstorage.server.dto;

import java.util.List;

public class UploadDto {
	private Long folderId;
	private List<FolderDto> folders;
	private List<FileDto> files;
	
	public Long getFolderId() {
		return folderId;
	}
	public void setFolderId(Long folderId) {
		this.folderId = folderId;
	}
	public List<FolderDto> getFolders() {
		return folders;
	}
	public void setFolders(List<FolderDto> folders) {
		this.folders = folders;
	}
	public List<FileDto> getFiles() {
		return files;
	}
	public void setFiles(List<FileDto> files) {
		this.files = files;
	}

}
