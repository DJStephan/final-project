package driverstorage.server.dto;

public class FileDto {
	private String fileName;
	private byte[] data;
	private String type;

	public FileDto () {}

	public FileDto(String fileName, byte[] data, String type) {
		this.fileName = fileName;
		this.data = data;
		this.type = type;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
