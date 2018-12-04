package driverstorage.server.dto;

public class ResultDto {

	private Number statusCode;
	private String message;
	
	public Number getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(Number statusCode) {
		this.statusCode = statusCode;
	}
	public String getMessgae() {
		return message;
	}
	public void setMessgae(String messgae) {
		this.message = messgae;
	}
	
	
}
