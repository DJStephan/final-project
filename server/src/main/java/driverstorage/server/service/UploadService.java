package driverstorage.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.dto.UploadDto;
import driverstorage.server.dto.UploadResultDto;
import driverstorage.server.repository.UploadRepository;

@RestController
public class UploadService {
	private UploadRepository uploadRepository;

	@Autowired
	public UploadService(UploadRepository uploadRepository) {
		this.uploadRepository = uploadRepository;
	}
	
	public UploadResultDto upload(UploadDto uploadDTO) {
		UploadResultDto help = new UploadResultDto();
		return help;
	}
}
