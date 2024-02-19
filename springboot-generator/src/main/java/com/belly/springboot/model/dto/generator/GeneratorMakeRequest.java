package com.belly.springboot.model.dto.generator;

import com.belly.model.Meta;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

/**
 * 制作代码生成器请求
 *
 * @author belly
 * @version 1.1.0
 */
@Data
public class GeneratorMakeRequest implements Serializable {

    /**
     * 元数据文件
     */
    private Meta meta;

    /**
     * 模板文件压缩包路径
     */
    private String zipFilePath;
    private static final long serialVersionUID = 1L;
}