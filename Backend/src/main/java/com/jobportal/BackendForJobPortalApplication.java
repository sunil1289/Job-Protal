package com.jobportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BackendForJobPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendForJobPortalApplication.class, args);
	}

}
