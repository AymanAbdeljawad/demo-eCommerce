package com.user.common.mapper;


import com.user.dto.UserLoginDTO;
import com.user.dto.UserRegistrationDTO;
import com.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserRegistrationDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());
        return user;
    }

    public UserLoginDTO toLoginDto(User user) {
        UserLoginDTO dto = new UserLoginDTO();
        dto.setUsername(user.getUsername());
        return dto;
    }
}
