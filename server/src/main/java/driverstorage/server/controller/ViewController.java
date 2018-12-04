package driverstorage.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import driverstorage.server.service.ViewService;

@RestController
public class ViewController {
	private ViewService viewService;

	@Autowired
	public ViewController(ViewService viewService) {
		this.viewService = viewService;
	}

	@GetMapping("view")
	public void viewFile() {
		viewService.viewFile();
	}

}
