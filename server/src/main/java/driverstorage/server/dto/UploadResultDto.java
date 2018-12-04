package driverstorage.server.dto;

public class UploadResultDto {

	private ResultDto result;
	private FileStructureDto files;
	
	public ResultDto getResult() {
		return result;
	}
	public void setResult(ResultDto result) {
		this.result = result;
	}
	public FileStructureDto getFiles() {
		return files;
	}
	public void setFiles(FileStructureDto files) {
		this.files = files;
	}
	
	
	
}
