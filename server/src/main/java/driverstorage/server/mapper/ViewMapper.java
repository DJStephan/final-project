package driverstorage.server.mapper;

import java.util.List;

import javax.swing.text.View;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import driverstorage.server.dto.FolderDto;
import driverstorage.server.dto.StructureFolderDto;
import driverstorage.server.entity.Folder;

@Mapper(componentModel = "spring")
public interface ViewMapper {
	@Mappings({ @Mapping(target = "folderName", source = "entitiy.folderName"),
			@Mapping(target = "files", source = "entity.files"),
			@Mapping(target = "folders", source = "entity.folders") })

	StructureFolderDto entityToDto(Folder entity);

	List<StructureFolderDto> entitysToDtos(List<Folder> entity);

	@Mappings({ @Mapping(target = "view", source = "dto.view"),
		@Mapping(target = "files", source = "dto.files"),
		@Mapping(target = "folders", source = "dto.folders") })

	View dtoToEntity(StructureFolderDto dto);

	List<View> dtosToEntitys(List<StructureFolderDto> dto);

}
