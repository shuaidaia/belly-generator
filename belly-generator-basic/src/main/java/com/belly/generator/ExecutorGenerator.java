package com.belly.generator;

import com.belly.model.TemplateConfig;
import freemarker.template.TemplateException;

import java.io.File;
import java.io.IOException;

/**
 * @author Belly
 * @version 1.1.0
 *
 * 生成器主类
 */
public class ExecutorGenerator {
    public static void main(String[] args) throws TemplateException, IOException {
        //创建数据模型
        TemplateConfig templateConfig = new TemplateConfig();
        templateConfig.setAuthor("belly");
        templateConfig.setLoop(true);
        templateConfig.setOutputText("求和等于：");
        generator(templateConfig);
    }

    /**
     * 生成方法
     *
     * @param model 数据模型
     */
    public static void generator(Object model) throws TemplateException, IOException {
        //得到项目根路径
        String outputPath = System.getProperty("user.dir");

        //生成静态文件
        File parentFile = new File(outputPath).getParentFile();
        String inputPath = new File(parentFile, "belly-generator/template").getAbsolutePath();
        StaticFileGenerator.copyFilesByRecursive(inputPath, outputPath);

        //生成动态文件
        String inputDynamicFilePath =
                outputPath + File.separator + "belly-generator-basic/src/main/resources/templates/Main.java.ftl";
        String outputDynamicFilePath =
                outputPath + File.separator + "template/src/com/belly/acm/Main.java";
        DynamicFileGenerator.executor(inputDynamicFilePath, outputDynamicFilePath, model);
    }
}
