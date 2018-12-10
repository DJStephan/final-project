package driverstorage.server.dto;

public class ViewDto {
	private ResultDto result;
	private StructureFolderDto root;

	public ViewDto() {}
	public ViewDto(ResultDto result, StructureFolderDto root) {
		this.result = result;
		this.root = root;
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
