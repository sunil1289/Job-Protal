package com.jobportal.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.ProfileDto;
import com.jobportal.entity.Profile;
import com.jobportal.exceptions.JobPortalException;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.utility.Utilities;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Long createProfile(String email, String name) throws JobPortalException {
        Profile profile = new Profile();
        profile.setId(Utilities.getNextSequence("profiles"));
        profile.setEmail(email);
        profile.setSkills(new ArrayList<>());
        profile.setExperiences(new ArrayList<>());
        profile.setCertifications(new ArrayList<>());
        profile.setSavedJobs(new ArrayList<>());
//        profile.setPicture(new Byte());
        profile.setName(name);
        profileRepository.save(profile);
        return profile.getId();
    }

    @Override
    public ProfileDto getProfile(Long id) throws JobPortalException {
        profileRepository.findById(id).ifPresent(profile -> {
            profile.getExperiences().stream().filter(experience -> experience.getWorking()==true).filter(experience -> !experience.getEndDate().toLocalDate().isEqual(LocalDateTime.now().toLocalDate())).forEach(experience -> {
                experience.setEndDate(LocalDateTime.now());
                profile.setTotalExp(calculateTotalExp(profile.toDto()));
                profileRepository.save(profile);
            });
        });
        return profileRepository.findById(id).orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND")).toDto();

    }

    @Override
    public ProfileDto updateProfile(ProfileDto profileDto) throws JobPortalException {
        profileRepository.findById(profileDto.getId()).orElseThrow(() -> new JobPortalException("PROFILE_NOT_FOUND"));
        getWorkingIsTrueSetEndDate(profileDto.getId(),profileDto);
        profileDto.setTotalExp(calculateTotalExp(profileDto));
        profileRepository.save(profileDto.toEntity());
        return profileDto;
    }

    @Override
    public List<ProfileDto> getAllProfile() {
        return profileRepository.findAll().stream().map((x)-> x.toDto()).toList();
    }
    
public void getWorkingIsTrueSetEndDate(Long id, ProfileDto profileDto) {

    profileDto.getExperiences().forEach(exp -> {

        if(Boolean.TRUE.equals(exp.getWorking())){
            exp.setEndDate(LocalDateTime.now());
        }

    });
}
    public Long calculateTotalExp(ProfileDto profileDto){
//        profileDto.getExperiences().stream().forEach(System.out::println);
        List<Long> months = profileDto.getExperiences().stream().map(experience -> ChronoUnit.MONTHS.between(experience.getStartDate(), experience.getEndDate())).collect(Collectors.toList());
        Long sum = months.stream().mapToLong(Long::longValue).sum();
        double expYear = Math.round(sum/12);
        return (long) expYear;
    }

}
