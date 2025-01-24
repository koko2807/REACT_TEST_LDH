package com.aloha.board.service;

import java.util.List;

public interface BaseService<E> {
    public List<E> list() throws Exception;
    public E select(Long no) throws Exception;
    public E selectById(String id) throws Exception;
    public boolean insert(E entity) throws Exception;
    public boolean update(E entity) throws Exception;
    public boolean updateById(E entity) throws Exception;
    public boolean delete(Long no) throws Exception;
    public boolean deleteById(String id) throws Exception;
}
