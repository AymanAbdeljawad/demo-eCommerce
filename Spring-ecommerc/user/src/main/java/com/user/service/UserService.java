package com.user.service;

import com.user.common.exception.InvalidPasswordException;
import com.user.security.JwtUtil;
import com.user.dto.UserLoginDTO;
import com.user.dto.UserRegistrationDTO;
import com.user.entity.Role;
import com.user.entity.User;
import com.user.repository.RoleRepository;
import com.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(UserRegistrationDTO dto) {
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setEmail(dto.getEmail());

        Set<Role> roles = new HashSet<>();
        for (String roleName : dto.getRoles()) {
            Role role = roleRepository.findByName(roleName);
            if (role == null) {
                role = new Role();
                role.setName(roleName);
                roleRepository.save(role);
            }
            roles.add(role);
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public String login(UserLoginDTO loginDto) {
        Optional<User> optionalUser = userRepository.findByUsername(loginDto.getUsername());

        return optionalUser.map(user -> {
            if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                throw new InvalidPasswordException("Invalid password");
            }
            return jwtUtil.generateToken(user.getUsername());
        }).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
