package com.jobportal.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserDetailsService userDetailsService;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
//             FilterChain filterChain) throws ServletException, IOException {

//         if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
//             filterChain.doFilter(request, response);
//             return;
//         }

//         String requestHeader = request.getHeader("Authorization");
//         String username = null;
//         String token = null;

//         if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
//             token = requestHeader.substring(7);

//             try {
//                 username = this.jwtHelper.getUsernameFromToken(token);
//             } catch (IllegalArgumentException e) {
//                 logger.error("Illegal argument while fetching username from token");
//             } catch (ExpiredJwtException e) {
//                 logger.error("JWT token has expired");
//             } catch (MalformedJwtException e) {
//                 logger.error("JWT token is malformed");
//             } catch (Exception e) {
//                 logger.error("Error processing JWT token");
//             }

       
//             if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//                 UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

//                 if (this.jwtHelper.validateToken(token, userDetails.getUsername())) {
//                     UsernamePasswordAuthenticationToken authentication =
//                             new UsernamePasswordAuthenticationToken(
//                                     userDetails, null, userDetails.getAuthorities());

//                     authentication.setDetails(
//                             new WebAuthenticationDetailsSource().buildDetails(request));

//                     SecurityContextHolder.getContext().setAuthentication(authentication);
//                 }
//             }
//         }


//         filterChain.doFilter(request, response);
//     }
// }


@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

    if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
        filterChain.doFilter(request, response);
        return;
    }

    String requestHeader = request.getHeader("Authorization");
    String username = null;
    String token = null;

    // ✅ STEP 1: Check header exists
    if (requestHeader != null && requestHeader.startsWith("Bearer ")) {

        token = requestHeader.substring(7);

        // ✅ STEP 2: Check token is not empty
        if (token == null || token.trim().isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // ✅ STEP 3: Extract username safely
            username = this.jwtHelper.getUsernameFromToken(token);

        } catch (IllegalArgumentException e) {
            logger.error("Unable to get JWT Token");
        } catch (ExpiredJwtException e) {
            logger.error("JWT token has expired");
        } catch (MalformedJwtException e) {
            logger.error("JWT token is malformed");
        } catch (Exception e) {
            logger.error("Invalid JWT token");
        }

        // ✅ STEP 4: Authenticate only if valid
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (this.jwtHelper.validateToken(token, userDetails.getUsername())) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
    }

    // ✅ ALWAYS continue filter chain
    filterChain.doFilter(request, response);
}
}