package driverstorage.server.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import driverstorage.server.entity.File;

@Entity
public class Folder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String folderName;
	
	@ManyToOne
	private Folder parentFolder;
	
	@OneToMany
	private List<File> files;
	
	@OneToMany(
	        cascade = CascadeType.ALL,
	        orphanRemoval = false
	    )
	private List<Folder> folders;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public Folder getParentFolder() {
		return parentFolder;
	}

	public void setParentFolder(Folder parentFolder) {
		this.parentFolder = parentFolder;
	}

	public List<File> getFiles() {
		return files;
	}

	public void setFiles(List<File> files) {
		this.files = files;
	}

	public List<Folder> getFolders() {
		return folders;
	}

	public void setFolders(List<Folder> folders) {
		this.folders = folders;
	}
}
