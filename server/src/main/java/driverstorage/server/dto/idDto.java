package driverstorage.server.dto;

public class idDto {

    private ResultDto result;
    private Long id;

    public idDto() {}

    public idDto(ResultDto result, Long id) {
        this.result = result;
        this.id = id;
    }

    public ResultDto getResult() {
        return result;
    }

    public void setResult(ResultDto result) {
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
