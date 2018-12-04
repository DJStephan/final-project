package driverstorage.server.dto;

public class FileStructureDto {
	private ResultDto result;
	private StructureFolderDto root;
	
	public ResultDto getResult() {
		return result;
	}
	public void setResult(ResultDto result) {
		this.result = result;
	}
	public StructureFolderDto getRoot() {
		return root;
	}
	public void setRoot(StructureFolderDto root) {
		this.root = root;
	}
	
	

}
