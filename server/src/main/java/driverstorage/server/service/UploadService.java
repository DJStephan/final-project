package driverstorage.server.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import driverstorage.server.dto.ResultDto;
import driverstorage.server.dto.UploadDto;
import driverstorage.server.dto.UploadResultDto;
import driverstorage.server.entity.File;
import driverstorage.server.entity.Folder;
import driverstorage.server.mapper.FileMapper;
import driverstorage.server.mapper.FolderMapper;
import driverstorage.server.repository.FileRepository;
import driverstorage.server.repository.FolderRepository;

@RestController
public class UploadService {
	private FileMapper fileMapper;
	private FolderMapper folderMapper;
	private FileRepository fileRepository;
	private FolderRepository folderRepository;

	@Autowired
	public UploadService(FileMapper fileMapper, FolderMapper folderMapper, FileRepository fileRepository, FolderRepository folderRepository) {
		this.fileMapper = fileMapper;
		this.folderMapper = folderMapper;
		this.fileRepository = fileRepository;
		this.folderRepository = folderRepository;
	}
	public UploadResultDto upload(MultipartFile[] files) {
		System.out.println("Uploading");
		for(MultipartFile f: files) {
			System.out.println(f.getOriginalFilename());
			try {
				if(!f.isEmpty()) {
					File newFile = new File();
					newFile.setData(f.getBytes());
					newFile.setFileName(f.getOriginalFilename());
					
					Folder parentFolder = this.folderRepository.getFolderById((long) 1);
					newFile.setParent(parentFolder);
					/*
					if(parentFolder.getFiles().isEmpty()) {
						parentFolder.setFiles(new ArrayList<File>());
					}*/
					parentFolder.getFiles().add(this.fileRepository.save(newFile));
					this.folderRepository.save(parentFolder);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				System.out.println("ERROR");
				e.printStackTrace();
			}
		}
		return new UploadResultDto();
	}
	
	public UploadResultDto upload(UploadDto uploadDto) {
		Long locationId = uploadDto.getFolderId();
		List<Folder> folders = folderMapper.dtosToEntitys(uploadDto.getFolders());
		List<File> files = fileMapper.dtosToEntitys(uploadDto.getFiles());
		
		Folder saveLocation = folderRepository.getFolderById(locationId);
		
		System.out.println("Uploading");
		System.out.println(locationId);
		System.out.println(folders.get(0).getFolderName());
		
		if(folders != null) {
			saveLocation.getFolders().addAll(saveFolders(folders));
		}
		if(files != null) {
			saveLocation.getFiles().addAll(this.fileRepository.saveAll(files));
		}
		this.folderRepository.save(saveLocation);
		
		UploadResultDto result = new UploadResultDto();
		ResultDto resultdt = new ResultDto();
		resultdt.setStatusCode((long) 500);
		result.setResult(resultdt);
		
		return result;
	}
	
	private List<Folder> saveFolders(List<Folder> folders) {
		List<Folder> saves = new ArrayList<Folder>();
		for(Folder f : folders) {
			Folder save = new Folder();
			save.setFolders(new ArrayList<Folder>());
			save.setFiles(new ArrayList<File>());
			save.setFolderName(f.getFolderName());
			if(!f.getFolders().isEmpty()) {
				save.getFolders().addAll(saveFolders(f.getFolders()));
			}
			if(!f.getFiles().isEmpty()) {
				this.fileRepository.saveAll(f.getFiles());
				save.getFiles().addAll(f.getFiles());
			}
			saves.add(this.folderRepository.save(save));
		}
		return saves;
	}
}



