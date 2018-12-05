package driverstorage.server.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import driverstorage.server.entity.File;
import driverstorage.server.dto.FileDto;

@Mapper(componentModel = "spring")
public interface FileMapper {
	@Mappings({ @Mapping(target = "fileName", source = "entity.fileName"),
			@Mapping(target = "data", source = "entity.data") })
	FileDto entityToDto(File entity);

	List<FileDto> entitysToDtos(List<File> entity);
	
	@Mappings({ @Mapping(target = "fileName", source = "dto.fileName"),
		@Mapping(target = "data", source = "dto.data") })
	File dtoToEntity(FileDto dto);
	
	List<File> dtosToEntitys(List<FileDto> dto);
}
