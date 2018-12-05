package driverstorage.server.dto;

import java.util.List;

public class DownloadFolderDto {

	private ResultDto result;
	private List<FolderDto> folders;
	private List<FileDto> files;

	public ResultDto getResult() {
		return result;
	}

	public void setResult(ResultDto result) {
		this.result = result;
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
