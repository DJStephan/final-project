package driverstorage.server.dto;

public class DownloadFileDto {

	private ResultDto result;
	private FileDto file;

	public DownloadFileDto () {}

	public DownloadFileDto(ResultDto result, FileDto file) {
		this.result = result;
		this.file = file;
	}

	public ResultDto getResult() {
		return result;
	}

	public void setResult(ResultDto result) {
		this.result = result;
	}

	public FileDto getFile() {
		return file;
	}

	public void setFile(FileDto file) {
		this.file = file;
	}
}
