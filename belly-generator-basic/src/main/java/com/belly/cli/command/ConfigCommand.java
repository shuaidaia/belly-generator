package com.belly.cli.command;

import cn.hutool.core.util.ReflectUtil;
import com.belly.model.TemplateConfig;
import picocli.CommandLine.Command;

import java.lang.reflect.Field;

/**
 * @author Belly
 * @version 1.1.0
 */

/**
 * name: 命令名字
 * description: 提示信息
 * mixinStandardHelpOptions: 加入命令help命令手册
 */
@Command(name = "config", description = "查看参数", mixinStandardHelpOptions = true)
public class ConfigCommand implements Runnable{

    @Override
    public void run() {
        System.out.println("查看参数信息");

        Field[] fields = ReflectUtil.getFields(TemplateConfig.class);
        for (Field field : fields) {
            System.out.println("字段名称：" + field.getName());
            System.out.println("字段类型：" + field.getType());
        }
    }
}
