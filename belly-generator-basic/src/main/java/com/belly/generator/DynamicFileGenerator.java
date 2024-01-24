package com.belly.generator;

import cn.hutool.core.io.FileUtil;
import com.belly.model.TemplateConfig;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * @author Belly
 * @version 1.1.0
 *
 * 动态文件生成类
 */
public class DynamicFileGenerator {


    public static void executor(String inputPath, String outputPath, Object model) throws IOException, TemplateException {
        // new出Configuration对象，参数为FreeMarker版本号
        Configuration configuration = new Configuration(Configuration.VERSION_2_3_32);

        //指定模板文件所在路径
        File templatePath = new File(inputPath).getParentFile();
        configuration.setDirectoryForTemplateLoading(templatePath);

        //设置模板文件的字符集
        configuration.setDefaultEncoding("utf-8");

        //创建模板对象，加载指定模板
        String templateName = new File(inputPath).getName();
        Template template = configuration.getTemplate(templateName);

//        //创建数据模型
//        TemplateConfig templateConfig = new TemplateConfig();
//        templateConfig.setAuthor("belly");
//        templateConfig.setLoop(false);
//        templateConfig.setOutputText("求和结果：");

        //判断文件是否存在
        if (!FileUtil.exist(outputPath)){
            FileUtil.touch(outputPath);
        }

        //生成模板
        FileWriter writer = new FileWriter(outputPath);
        template.process(model, writer);

        //关闭资源
        writer.close();
    }
}
