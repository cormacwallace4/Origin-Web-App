package com.cormac.Origin.Springboot;

import jakarta.persistence.*;

@Entity
@Table(name = "questions")  // specify your table name here
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String question;

    public Question() {}

    public Question(Long id, String question) {
        this.id = id;
        this.question = question;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}