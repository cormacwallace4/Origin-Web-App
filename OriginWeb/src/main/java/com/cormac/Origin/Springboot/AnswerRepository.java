package com.cormac.Origin.Springboot;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findByQuestionId(Long questionId);
}
