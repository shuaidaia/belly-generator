package com.belly.springboot.common;

import lombok.Data;

import java.io.Serializable;

/**
 * 删除请求
 *
 * @author belly
 * @version 1.1.0
 */
@Data
public class DeleteRequest implements Serializable {

    /**
     * id
     */
    private Long id;

    private static final long serialVersionUID = 1L;
}