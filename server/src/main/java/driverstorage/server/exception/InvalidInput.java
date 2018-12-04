package driverstorage.server.exception;

public class InvalidInput extends Exception {
	private static final long serialVersionUID = 1L;

	private String message;

	public InvalidInput() {
		this.message = "Invalid input";
	}

	@Override
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}