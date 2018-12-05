package driverstorage.server.service;

import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.StructureFolderDto;
import driverstorage.server.dto.ViewDto;
import driverstorage.server.exception.FolderNotFound;
import driverstorage.server.mapper.ViewMapper;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;

@RestController
public class ViewService {
	private FolderRepository folderRepository;
	private FileRepository fileRepository;
	private ViewMapper viewMapper;

	public ViewService(FolderRepository folderRepository, FileRepository fileRepository, ViewMapper viewMapper) {
		this.folderRepository = folderRepository;
		this.fileRepository = fileRepository;
		this.viewMapper = viewMapper;

	}

	public boolean folderExists(Long id) {
		return folderRepository.existsById(id);
	}

	public ViewDto viewFolder(Long id) throws FolderNotFound {
		if (!folderExists(id)) {
			throw new FolderNotFound();
		}
		StructureFolderDto structure = this.viewMapper.entityToDto(this.folderRepository.getFolderById(id));
		ViewDto view = new ViewDto();
		view.setRoot(structure);
		return view;
	}

//	Folder folder = folderRepository.getFolderById(id);
//	if (folder == null) {
//		throw new FolderNotFound();
//	} else {
//		return folder;
//	}
//}

	// this commented out section is used for testing
	/*
	 * Folder rootFolder = folderRepository.getFolderById((long) 1);
	 * 
	 * System.out.println(rootFolder.getFolderName()); for (File i :
	 * rootFolder.getFiles()) { System.out.println(i.getFileName()); }
	 * rootbeerFolder(rootFolder.getFolders());
	 * 
	 * }
	 * 
	 * private void rootbeerFolder(List<Folder> folder) { for (Folder f : folder) {
	 * System.out.println(f.getFolderName()); if (!f.getFolders().isEmpty()) {
	 * rootbeerFolder(f.getFolders()); } for (File i : f.getFiles()) {
	 * System.out.println(i.getFileName()); }
	 * 
	 * }
	 */
}

// need to print out what the root folder has (root folder name and files in the root) 
// the get the sub folders (pass it to the rootbeer function
