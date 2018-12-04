package driverstorage.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.DownloadDto;
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

	public DownloadResultDto download(DownloadDto downloadDto) {
		List<Long> folders = (downloadDto.getFolderIds());
		List<Long> files = (downloadDto.getFileIds());

		DownloadResultDto result = new DownloadResultDto();

		return result;
	}
}
