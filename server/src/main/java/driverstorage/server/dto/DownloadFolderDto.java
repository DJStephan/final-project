package driverstorage.server.dto;

import java.util.List;

public class DownloadFolderDto {

	private ResultDto result;
	private FolderDto folder;

	public DownloadFolderDto() {}
	public DownloadFolderDto(ResultDto result, FolderDto folder) {
		this.result = result;
		this.folder = folder;
	}

	public ResultDto getResult() {
		return result;
	}

	public void setResult(ResultDto result) {
		this.result = result;
	}

	public FolderDto getFolder() {
		return folder;
	}

	public void setFolder(FolderDto folder) {
		this.folder = folder;
	}
}
