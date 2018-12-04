package driverstorage.server.dto;

import java.util.List;

public class FolderDto {
private Long id; 
private String folderName;
private List<FileDto> files;
private List<FolderDto> folders;

public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
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
