package com.aloha.todo.service;

import com.aloha.todo.domain.Todos;
import com.github.pagehelper.PageInfo;

public interface TodoService extends BaseService<Todos> {
  
  public PageInfo<Todos> list(int page, int size);
  public boolean completeAll() throws Exception;
  public boolean deleteAll() throws Exception;
}
