package com.example.demo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Helloworld {
    @RequestMapping("/lvhanzhi")
    public String HelloWorld(){
        return "lvhanzhi";
    }
}
