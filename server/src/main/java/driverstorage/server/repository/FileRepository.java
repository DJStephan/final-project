package driverstorage.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import driverstorage.server.entity.File;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

	List<File> findAll();

	File getFileById(Long id);

	File DeleteFileById(Long id);

}
