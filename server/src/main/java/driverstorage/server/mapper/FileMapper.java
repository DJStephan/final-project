package driverstorage.server.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import driverstorage.server.entity.File;
import driverstorage.server.entity.FileDTO;

@Mapper(componentModel = "spring")
public interface FileMapper {
	@Mappings({ @Mapping(target = "id", source = "entity.id"),
			@Mapping(target = "fileName", source = "entity.fileName"),
			@Mapping(target = "data", source = "entity.data") })
	FileDTO entityToDto(File entity);

	List<FileDTO> entitysToDtos(List<File> entity);
}
