package driverstorage.server.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import driverstorage.server.entity.Folder;
import driverstorage.server.dto.FolderDto;

@Mapper(componentModel = "spring")
public interface FolderMapper {
	@Mappings({ @Mapping(target = "folderName", source = "entity.folderName"),
			@Mapping(target = "files", source = "entity.files"),
			@Mapping(target = "folders", source = "entity.folders") })
	FolderDto entityToDto(Folder entity);

	List<FolderDto> entitysToDtos(List<Folder> entity);

	@Mappings({ @Mapping(target = "folderName", source = "dto.folderName"),
			@Mapping(target = "files", source = "dto.files"),
			@Mapping(target = "folders", source = "dto.folders") })
	Folder dtoToEntity(FolderDto dto);
	
	List<Folder> dtosToEntitys(List<FolderDto> dto);
}
