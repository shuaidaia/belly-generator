package com.belly.cli.command;

import cn.hutool.core.io.FileUtil;
import picocli.CommandLine.Command;

import java.io.File;
import java.util.List;

/**
 * @author Belly
 * @version 1.1.0
 */

/**
 * name: 命令名字
 * description: 提示信息
 * mixinStandardHelpOptions: 加入命令help命令手册
 */
@Command(name = "list", description = "查看文件列表", mixinStandardHelpOptions = true)
public class ListCommand implements Runnable{

    @Override
    public void run() {
        //获取该项目所在的目录
        String propertyPath = System.getProperty("user.dir");

        //整个项目的根路径
        File parentFile = new File(propertyPath).getParentFile();

        File inputPath = new File(parentFile, "template").getAbsoluteFile();
        List<File> files = FileUtil.loopFiles(inputPath);
        for (File file : files) {
            System.out.println("文件列表：" + file);
        }
    }
}
