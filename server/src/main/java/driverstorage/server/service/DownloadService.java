package driverstorage.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.DownloadFileDto;
import driverstorage.server.dto.DownloadFolderDto;
import driverstorage.server.dto.DownloadResultDto;
import driverstorage.server.dto.FileDto;
import driverstorage.server.dto.FolderDto;
import driverstorage.server.mapper.FileMapper;
import driverstorage.server.mapper.FolderMapper;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;

@RestController
public class DownloadService {
	private FileRepository fileRepository;
	private FolderRepository folderRepository;
	private FileMapper fileMapper;
	private FolderMapper folderMapper;
//	private DownloadFileDto downloadFileDto;
//	private DownloadFolderDto downloadFolderDto;

	@Autowired
	public DownloadService(FileRepository fileRepository, FolderRepository folderRepository, FileMapper fileMapper,
			FolderMapper folderMapper) {
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
		this.fileMapper = fileMapper;
		this.folderMapper = folderMapper;
	}

	public List<FileDto> getFile() {
		return this.fileMapper.entitysToDtos(this.fileRepository.findAll());
	}

	public List<FolderDto> getFolder() {
		return this.folderMapper.entitysToDtos(this.folderRepository.findAll());
	}

	public DownloadResultDto downloadFile(DownloadFileDto downloadFileDto) {
	//	List<Long> folders = (downloadFileDto.getFolderIds());
	//	List<Long> files = (downloadFileDto.getFileIds());

		DownloadResultDto result = new DownloadResultDto();

		return result;
	}

	public DownloadResultDto downloadFolder(DownloadFolderDto downloadFolderDto) {
	//	List<Long> folders = (downloadFolderDto.getFolderIds());
	//	List<Long> files = (downloadFolderDto.getFileIds());

		DownloadResultDto result = new DownloadResultDto();

		return result;

	}
}
