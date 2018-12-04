package driverstorage.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import driverstorage.server.entity.Folder;

@Repository
public interface UploadRepository extends JpaRepository<Folder, Long>  {
	
	List<Folder> findAll();
	
	Folder getFolderById(Long id);

	Folder deleteFolderById(Long id);
}
