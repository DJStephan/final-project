package driverstorage.server.dto;

import java.util.List;

public class FolderDto {
	private String folderName;
	private List<FileDto> files;
	private List<FolderDto> folders;
	
	public String getFolderName() {
		return folderName;
	}
	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}
	public List<FileDto> getFiles() {
		return files;
	}
	public void setFiles(List<FileDto> files) {
		this.files = files;
	}
	public List<FolderDto> getFolders() {
		return folders;
	}
	public void setFolders(List<FolderDto> folders) {
		this.folders = folders;
	}


}
