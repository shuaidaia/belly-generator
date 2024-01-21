package com.belly.cli.command;

import cn.hutool.core.bean.BeanUtil;
import com.belly.model.TemplateConfig;
import lombok.Data;
import picocli.CommandLine.*;

import java.util.concurrent.Callable;

/**
 * @author Belly
 * @version 1.1.0
 */

/**
 * name: 命令名字
 * description: 提示信息
 * mixinStandardHelpOptions: 加入命令help命令手册
 */
@Data
@Command(name = "generate", description = "生成模板", mixinStandardHelpOptions = true)
public class GenerateCommand implements Callable<Integer> {
    /**
     * arity: 该属性来指定每个选项可接受的参数个数
     * interactive: 该属性支持可交互输入
     * echo: 该属性来显示用户输入
     */
    @Option(names = {"-l", "--loop"}, description = "是否循环输入", arity = "0..1", interactive = true, echo = true)
    private boolean loop;

    @Option(names = {"-a", "--author"}, description = "作者", arity = "0..1", interactive = true, echo = true)
    private String author = "belly";

    @Option(names = {"-o", "--outputText"}, description = "输出文本信息", arity = "0..1", interactive = true, echo = true)
    private String outputText = "sum = ";

    @Override
    public Integer call() throws Exception {

        TemplateConfig templateConfig = new TemplateConfig();
        BeanUtil.copyProperties(this, templateConfig);
        System.out.println("配置信息：" + templateConfig);

        return null;
    }
}
