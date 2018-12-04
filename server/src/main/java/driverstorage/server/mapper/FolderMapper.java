package driverstorage.server.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import driverstorage.server.entity.Folder;
import driverstorage.server.dto.FolderDTO;

@Mapper(componentModel = "spring")
public interface FolderMapper {
	@Mappings({ @Mapping(target = "id", source = "entity.id"),
			@Mapping(target = "folderName", source = "entity.folderName"),
			@Mapping(target = "files", source = "entity.files"),
			@Mapping(target = "folders", source = "entity.folders") })
	FolderDTO entityToDto(Folder entity);

	List<FolderDTO> entitysToDtos(List<Folder> entity);
}
