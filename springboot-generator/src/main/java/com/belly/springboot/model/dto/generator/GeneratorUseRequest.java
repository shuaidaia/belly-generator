package com.belly.springboot.model.dto.generator;

import com.belly.springboot.meta.Meta;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 代码生成器请求
 *
 * @author belly
 * @version 1.1.0
 */
@Data
public class GeneratorUseRequest implements Serializable {

    /**
     * 生成器id
     */
    private Long id;

    /**
     * 数据模型
     */
    private Map<String, Object> dataModel;
    private static final long serialVersionUID = 1L;
}