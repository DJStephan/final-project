package driverstorage.server.dto;

import java.util.List;

public class StructureFolderDto {

	private Long id;
	private String folderName;
	private List<StructureFileDto> files;
	private List<StructureFolderDto> folders;
	
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
	public List<StructureFileDto> getFiles() {
		return files;
	}
	public void setFiles(List<StructureFileDto> files) {
		this.files = files;
	}
	public List<StructureFolderDto> getFolders() {
		return folders;
	}
	public void setFolders(List<StructureFolderDto> folders) {
		this.folders = folders;
	}
}
