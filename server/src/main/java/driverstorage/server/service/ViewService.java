package driverstorage.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.entity.File;
import driverstorage.server.entity.Folder;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;

@RestController
public class ViewService {
	private FolderRepository folderRepository;
	private FileRepository fileRepository;

	@Autowired
	public ViewService(FolderRepository folderRepository, FileRepository fileRepository) {
		this.folderRepository = folderRepository;
		this.fileRepository = fileRepository;
	}

	public viewFile() {
		
		
		//this commented out section is used for testing
/*
		Folder rootFolder = folderRepository.getFolderById((long) 1);

		System.out.println(rootFolder.getFolderName());
		for (File i : rootFolder.getFiles()) {
			System.out.println(i.getFileName());
		}
		rootbeerFolder(rootFolder.getFolders());

	}

	private void rootbeerFolder(List<Folder> folder) {
		for (Folder f : folder) {
			System.out.println(f.getFolderName());
			if (!f.getFolders().isEmpty()) {
				rootbeerFolder(f.getFolders());
			}
			for (File i : f.getFiles()) {
				System.out.println(i.getFileName());
			}

		}
*/
	}

}
// need to print out what the root folder has (root folder name and files in the root) 
// the get the sub folders (pass it to the rootbeer function
