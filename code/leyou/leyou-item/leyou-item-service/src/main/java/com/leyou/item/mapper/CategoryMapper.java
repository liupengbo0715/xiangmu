package com.leyou.item.mapper;

import com.leyou.item.pojo.Category;
import org.springframework.boot.SpringApplication;
import tk.mybatis.mapper.additional.idlist.SelectByIdListMapper;
import tk.mybatis.mapper.common.Mapper;

public interface CategoryMapper extends Mapper<Category> , SelectByIdListMapper<Category,Long> {
}
