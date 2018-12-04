package driverstorage.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import driverstorage.server.entity.Folder;

public interface FolderRepository extends JpaRepository<Folder, Long> {

	List<Folder> findAll();

	Folder getFolderById(Long id);

	Folder deleteFolderById(Long id);
}
