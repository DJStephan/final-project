package driverstorage.server.dto;

public class FolderDto {
private Long id; 
private String folderName;
private FileDto files;
private FolderDto folders;

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
public FileDto getFiles() {
	return files;
}
public void setFiles(FileDto files) {
	this.files = files;
}
public FolderDto getFolders() {
	return folders;
}
public void setFolders(FolderDto folders) {
	this.folders = folders;
}




}
