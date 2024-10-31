package com.user.controller;

import com.user.common.exception.InvalidPasswordException;
import com.user.dto.UserLoginDTO;
import com.user.dto.UserRegistrationDTO;
import com.user.entity.User;
import com.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO) {
        User user = userService.register(userRegistrationDTO);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody UserLoginDTO userLoginDTO) {
        String token = userService.login(userLoginDTO);
        return ResponseEntity.ok(token);
    }
}
