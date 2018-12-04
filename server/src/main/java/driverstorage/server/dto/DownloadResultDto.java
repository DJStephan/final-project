package driverstorage.server.dto;


public class DownloadResultDto {
	
	private ResultDto result;
	private FolderDto folders;
	private FileDto files;
	
	public ResultDto getResult() {
		return result;
	}
	public void setResult(ResultDto result) {
		this.result = result;
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
