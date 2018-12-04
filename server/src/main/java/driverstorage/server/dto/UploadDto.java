package driverstorage.server.dto;

public class UploadDto {
	private Number folderId;
	private FolderDto folders;
	private FileDto files;
	
	public Number getFolderId() {
		return folderId;
	}
	public void setFolderId(Number folderId) {
		this.folderId = folderId;
	}
	public FolderDto getFolders() {
		return folders;
	}
	public void setFolders(FolderDto folders) {
		this.folders = folders;
	}
	public FileDto getFiles() {
		return files;
	}
	public void setFiles(FileDto files) {
		this.files = files;
	}
	
	

}
