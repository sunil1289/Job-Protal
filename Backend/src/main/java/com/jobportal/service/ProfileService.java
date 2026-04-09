package com.jobportal.service;

import java.util.List;

import com.jobportal.dto.ProfileDto;
import com.jobportal.exceptions.JobPortalException;

public interface ProfileService {
    public Long createProfile(String email, String name) throws JobPortalException;
    public ProfileDto getProfile(Long id) throws JobPortalException;
    public ProfileDto updateProfile(ProfileDto profileDto) throws JobPortalException;

    public List<ProfileDto> getAllProfile();
}
