package com.belly.cli;

import com.belly.cli.command.ConfigCommand;
import com.belly.cli.command.GenerateCommand;
import com.belly.cli.command.ListCommand;
import picocli.CommandLine;
import picocli.CommandLine.Command;

/**
 * @author Belly
 * @version 1.1.0
 */

/**
 * 命令执行器
 */
@Command(name = "belly", mixinStandardHelpOptions = true)
public class CommandExecutor implements Runnable{

    private final CommandLine commandLine;

    {
        commandLine = new CommandLine(this)
                .addSubcommand(new ConfigCommand())
                .addSubcommand(new GenerateCommand())
                .addSubcommand(new ListCommand());
    }

    @Override
    public void run() {
        //当用户不输入时提示信息
        System.out.println("请输入具体命令，或者输入 --help 查看命令提示");
    }

    public Integer doExecute(String[] args){
        return commandLine.execute(args);
    }
}
