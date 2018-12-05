package driverstorage.server.dto;

import java.util.List;

public class DownloadFileDto {

	private ResultDto result;
	private List<FileDto> files;
	private List<FolderDto> folders;

	public ResultDto getResult() {
		return result;
	}

	public void setResult(ResultDto result) {
		this.result = result;
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
