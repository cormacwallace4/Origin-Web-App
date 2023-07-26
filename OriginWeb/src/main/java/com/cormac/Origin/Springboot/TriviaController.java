package com.cormac.Origin.Springboot;


import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TriviaController {
    // Inject your repository here
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    public TriviaController(QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    @GetMapping("/randomQuestion")
    public Question getRandomQuestion() {
        List<Question> allQuestions = questionRepository.findAll();
        Random random = new Random();
        return allQuestions.get(random.nextInt(allQuestions.size()));
    }

    @GetMapping("/answers/{questionId}")
    public List<Answer> getAnswersForQuestion(@PathVariable Long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    @PostMapping("/validateAnswer")
    public boolean validateAnswer(@RequestBody Answer answer) {
        return answerRepository.findById(answer.getId()).get().getIsCorrect();
    }
}
