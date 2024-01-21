package com.belly.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Belly
 * @version 1.1.0
 * 动态模板类配置
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemplateConfig {
    /**
     * 是否生成循环
     */
    private boolean loop = true;
    private String author = "belly";
    private String outputText = "sum = ";
}
