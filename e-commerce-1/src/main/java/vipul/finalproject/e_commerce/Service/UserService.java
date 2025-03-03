package vipul.finalproject.e_commerce.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import vipul.finalproject.e_commerce.model.User;
import vipul.finalproject.e_commerce.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already taken");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        return userRepository.save(user);
    }

    public ResponseEntity<?> loginUser(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            return new ResponseEntity<>("User does not exist. Please sign up.", HttpStatus.NOT_FOUND);
        }

        if (!user.get().getPassword().equals(password)) {
            return new ResponseEntity<>("Invalid credentials. Please try again.", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    public boolean updatePassword(String username, String newPassword) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}