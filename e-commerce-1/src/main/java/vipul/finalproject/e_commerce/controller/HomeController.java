package vipul.finalproject.e_commerce.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping
    public String homePage() {
        return "Welcome to the E-Commerce Store! Please Sign Up or Login to continue.";
    }
}
