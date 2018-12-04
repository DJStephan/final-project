package driverstorage.server.dto;

public class StructureFolderDto {

	private Long id;
	private String folderName;
	private StructureFileDto files;
	private StructureFolderDto folders;
	
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
	public StructureFileDto getFiles() {
		return files;
	}
	public void setFiles(StructureFileDto files) {
		this.files = files;
	}
	public StructureFolderDto getFolders() {
		return folders;
	}
	public void setFolders(StructureFolderDto folders) {
		this.folders = folders;
	}
	
	
}
