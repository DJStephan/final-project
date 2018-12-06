package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import driverstorage.server.dto.ViewDto;
import driverstorage.server.exception.FolderNotFound;
import driverstorage.server.service.ViewService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@RestController
@RequestMapping("/view")
public class ViewController {
	private ViewService viewService;

	@Autowired
	public ViewController(ViewService viewService) {
		this.viewService = viewService;
	}

	@GetMapping("/exists/{id}")
	public boolean folderExists(@PathVariable("id") Long id) {
		return this.viewService.folderExists(id);
	}

	@GetMapping("/{id}")
	public ViewDto viewFolder(@PathVariable("id") Long id) throws FolderNotFound {
		return this.viewService.viewFolder(id);
	}

}
