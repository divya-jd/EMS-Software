package com.jd.service;

import com.jd.dto.LoginDto;
import com.jd.dto.JwtAuthResponse;

public interface AuthService {
    JwtAuthResponse login(LoginDto loginDto);
}
