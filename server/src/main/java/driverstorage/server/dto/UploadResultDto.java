package driverstorage.server.dto;

public class UploadResultDto {

	private ResultDto result;
	private StructureFolderDto root;
	
	public UploadResultDto(ResultDto result) {
		this.result = result;
	}
	
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
