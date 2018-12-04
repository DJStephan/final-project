package driverstorage.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import driverstorage.server.entity.File;
import driverstorage.server.entity.Folder;

public interface FolderRepository extends JpaRepository<Folder, Long> {

	List<Folder> findAll();

	File getFolderById(Long id);

	File DeleteFolderById(Long id);
}
