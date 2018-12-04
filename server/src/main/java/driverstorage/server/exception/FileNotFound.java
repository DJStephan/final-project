package driverstorage.server.exception;

public class FileNotFound extends Exception {
	private static final long serialVersionUID = 1L;

	private String message;

	public FileNotFound() {
		this.message = "File not found";
	}

	@Override
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
