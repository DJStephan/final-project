package driverstorage.server.exception;

public class InvalidInput {
	private static final long serialVersionUID = 1L;

	private String message;

	public InvalidInput() {
		this.message = "Invalid input";
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}