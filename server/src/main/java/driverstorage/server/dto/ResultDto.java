package driverstorage.server.dto;

public class ResultDto {

	private Long statusCode;
	private String message;

	public ResultDto () {}
	public ResultDto(Long statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}

	public Long getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(Long statusCode) {
		this.statusCode = statusCode;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String messgae) {
		this.message = messgae;
	}


}
