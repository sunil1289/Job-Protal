package com.jobportal.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.NotificationDto;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.OTP;
import com.jobportal.entity.User;
import com.jobportal.exceptions.JobPortalException;
import com.jobportal.repository.OTPRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.utility.Data;
import com.jobportal.utility.Utilities;

import jakarta.mail.internet.MimeMessage;

@Service(value="userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  PasswordEncoder passwordEncoder;


    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;

       @Autowired
    private ProfileService profileService;


    @Autowired
    private NotificationService notificationService;



    @Override
    public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
        Optional<User> optional = userRepository.findByEmail(userDTO.getEmail());
        if(optional.isPresent()) throw new JobPortalException("USER_FOUND");
        userDTO.setProfileId(profileService.createProfile(userDTO.getEmail(), userDTO.getName()));
        userDTO.setId(Utilities.getNextSequence("users"));

        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));            
        User user = userDTO.toEntity();
        userRepository.save(user);
        return user.toDTO();
    }


    @Override
    public UserDTO loginuser(LoginDTO loginDTO) throws JobPortalException {
        User user = userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));
        if(!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) throw new JobPortalException("INVALID_CREDENTIALS");
     return user.toDTO();
}

  
@Override
public Boolean sendOtp(String email) throws Exception {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
    
    try {
        String genOtp = Utilities.generateOTP();
        OTP otp = new OTP(email, genOtp, LocalDateTime.now());
        otpRepository.save(otp);

        MimeMessage mm = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mm, true);
        message.setTo(email);
        message.setSubject("Your OTP for Password Reset");
        message.setText(Data.getMessageBody(genOtp, user.getName()), true);
        mailSender.send(mm);
        return true;
    } catch (Exception e) {

        otpRepository.deleteById(email);
        throw e; 
    }
}

@Override
public Boolean verifyOTP(String email, String otp) throws JobPortalException {
    OTP otpEntity = otpRepository.findById(email)
        .orElseThrow(() -> new JobPortalException("OTP_NOT_FOUND"));

    // NEW: Check if OTP has expired (5 minute window)
    if (otpEntity.getCreationTime().isBefore(LocalDateTime.now().minusMinutes(5))) {
        otpRepository.deleteById(email); // clean up expired OTP
        throw new JobPortalException("OTP_NOT_FOUND"); // reuses "OTP expired" message
    }

    if (!otpEntity.getOtpCode().equals(otp))
        throw new JobPortalException("INCORRECT_OTP");

    //  Clean up used OTP immediately after verification
    otpRepository.deleteById(email);
    return true;
}
   
    @Override
    public ResponseDTO changePassword(LoginDTO loginDTO) throws JobPortalException {
        User user= userRepository.findByEmail(loginDTO.getEmail()).orElseThrow(()-> new JobPortalException("USER_NOT_FOUND"));
        user.setPassword(passwordEncoder.encode(loginDTO.getPassword()));
        userRepository.save(user);
        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setUserId(user.getId());
        notificationDto.setMessage("Password Reset Successful");
        notificationDto.setAction("Password Reset");
        notificationService.sendNotification(notificationDto);
        return new ResponseDTO("Password changed successfully");
    }

    @Scheduled(fixedRate = 60000) // to execute every 1 minute
    public void removeExpiredOTPs(){

        LocalDateTime expiry = LocalDateTime.now().minusMinutes(5);
        List<OTP> expiredOTPs = otpRepository.findByCreationTimeBefore(expiry);
        if(!expiredOTPs.isEmpty()){
            otpRepository.deleteAll(expiredOTPs);
            System.out.println("removed: "+expiredOTPs.size()+" expired OTPs");
        }


    }

    @Override
    public UserDTO getUserByEmail(String email) throws JobPortalException {
      return userRepository.findByEmail(email)
            .orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"))
            .toDTO();
}
    }
