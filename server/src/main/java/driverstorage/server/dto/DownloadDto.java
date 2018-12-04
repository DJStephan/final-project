package driverstorage.server.dto;

import java.util.List;

public class DownloadDto {
	private List<Long> folderIds;
	private List<Long> fields;
	
	public List<Long> getFolderIds() {
		return folderIds;
	}
	public void setFolderIds(List<Long> folderIds) {
		this.folderIds = folderIds;
	}
	public List<Long> getFields() {
		return fields;
	}
	public void setFields(List<Long> fields) {
		this.fields = fields;
	}
}
