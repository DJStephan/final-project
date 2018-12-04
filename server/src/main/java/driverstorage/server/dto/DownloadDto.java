package driverstorage.server.dto;

import java.util.List;

public class DownloadDto {
	private List<Long> folderIds;
	private List<Long> fileIds;

	public List<Long> getFolderIds() {
		return folderIds;
	}

	public void setFolderIds(List<Long> folderIds) {
		this.folderIds = folderIds;
	}

	public List<Long> getFileIds() {
		return fileIds;
	}

	public void setFileIds(List<Long> fileIds) {
		this.fileIds = fileIds;
	}

}
