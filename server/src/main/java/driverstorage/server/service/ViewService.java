package driverstorage.server.service;

import driverstorage.server.dto.ResultDto;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.StructureFolderDto;
import driverstorage.server.dto.ViewDto;
import driverstorage.server.exception.FolderNotFound;
import driverstorage.server.mapper.ViewMapper;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;

@Service
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
		System.out.println(String.format("Folder id: %d.  exists: %b", id, folderExists(id)));
		if (!folderExists(id)) {
			throw new FolderNotFound();
		}
		StructureFolderDto structure = this.viewMapper.entityToDto(this.folderRepository.getFolderById(id));
		if (structure == null) {
			return new ViewDto(
					new ResultDto((long) 404, String.format("No folder with id %d found.", id)), null);
		}
		return new ViewDto(
				new ResultDto((long) 200, String.format("View for folder %d.", id)), structure);
	}
}
