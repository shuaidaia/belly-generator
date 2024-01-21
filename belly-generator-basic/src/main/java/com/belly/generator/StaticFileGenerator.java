package com.belly.generator;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.ArrayUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

/**
 * @author Belly
 * @version 1.1.0
 *
 * 静态文件生成类
 */
public class StaticFileGenerator {

    public static void main(String[] args) {
        //得到项目根路径
        String outputPath = System.getProperty("user.dir");

        File parentFile = new File(outputPath).getParentFile();
        String inputPath = new File(parentFile, "template").getAbsolutePath();

//        System.out.println("outputPath= " + outputPath);
//        System.out.println("inputPath= " + inputPath);
        copyFilesByHutool(inputPath, outputPath);
    }

    /**
     * 使用胡图工具拷贝文件
     * @param inputPath
     * @param outputPath
     */
    public static void copyFilesByHutool(String inputPath, String outputPath){
        FileUtil.copy(inputPath, outputPath, false);
    }

    /**
     * 递归拷贝目录
     * @param inputPath
     * @param outputPath
     */
    public static void copyFilesByRecursive(String inputPath, String outputPath){
        File inputFile = new File(inputPath);
        File outputFile = new File(outputPath);
        try {
            copyFileByRecursive(inputFile, outputFile);
        } catch (Exception e){
            System.out.println("文件拷贝失败");
        }
    }

    /**
     * 先创建目录，然后再遍历目录内文件，依次拷贝
     * @param inputFile
     * @param outputFile
     * @throws IOException
     */
    private static void copyFileByRecursive(File inputFile, File outputFile) throws IOException {
        //判断是文件还是目录
        if (inputFile.isDirectory()){
            System.out.println("输入的文件名：" + inputFile.getName());
            File targetFilePath = new File(outputFile, inputFile.getName());
            if (!targetFilePath.exists()){
                targetFilePath.mkdirs();
            }

            //获取文件下的所有文件和子目录
            File[] listFiles = inputFile.listFiles();
            //无子文件，退出
            if (ArrayUtil.isEmpty(listFiles)){
                return;
            }
            for (File listFile : listFiles) {
                //递归拷贝下一层文件
                copyFileByRecursive(listFile, targetFilePath);
            }
        }else {
            //是文件则直接拷贝
            Path targetPath = outputFile.toPath().resolve(inputFile.getName());
            Files.copy(inputFile.toPath(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        }
    }


}
