package driverstorage.server.exception;

public class FolderNotFound extends Exception {
	private static final long serialVersionUID = 1L;

	private String message;

	public FolderNotFound() {
		this.message = "Folder not found";
	}

	@Override
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
