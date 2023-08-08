package com.cormac.Origin.Springboot;

import jakarta.persistence.*;

@Entity
@Table(name = "answers")  // specify your table name here
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String answer;
    private Boolean isCorrect;
    private Long questionId;

    public Answer() {}

    public Answer(Long id, String answer, Boolean isCorrect, Long questionId) {
        this.id = id;
        this.answer = answer;
        this.isCorrect = isCorrect;
        this.questionId = questionId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }
}