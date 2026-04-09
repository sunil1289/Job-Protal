package com.jobportal.utility;

public class Data {

    public static String getMessageBody(String otp, String name) {

        String htmlContent =
                "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset='UTF-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
                "<title>JobZel OTP Verification</title>" +
                "</head>" +

                "<body style='margin:0; padding:0; background-color:#f5f7fb; font-family:Arial, Helvetica, sans-serif;'>"

                + "<table width='100%' cellpadding='0' cellspacing='0' style='padding:40px 0;'>"
                + "<tr>"
                + "<td align='center'>"

                + "<table width='600' cellpadding='0' cellspacing='0' style='background:#ffffff; border-radius:10px; padding:40px; box-shadow:0 4px 12px rgba(0,0,0,0.08);'>"

                + "<tr>"
                + "<td style='text-align:center; padding-bottom:20px;'>"
                + "<h2 style='margin:0; color:#111;'>JobZel</h2>"
                + "<p style='margin:5px 0 0; color:#777; font-size:14px;'>Secure Verification</p>"
                + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td>"
                + "<p style='font-size:16px; color:#333;'>Hello <strong>" + name + "</strong>,</p>"
                + "<p style='font-size:15px; color:#555; line-height:1.6;'>"
                + "We received a request to verify your account. "
                + "Please use the One-Time Password (OTP) below to complete the verification process."
                + "</p>"
                + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td align='center' style='padding:30px 0;'>"
                + "<div style='display:inline-block; padding:14px 28px; font-size:28px; letter-spacing:4px; "
                + "font-weight:bold; color:#1a73e8; border:2px dashed #1a73e8; border-radius:8px;'>"
                + otp +
                "</div>"
                + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td>"
                + "<p style='font-size:14px; color:#666; line-height:1.6;'>"
                + "This OTP will expire in <strong>5 minutes</strong>. "
                + "For your security, please do not share this code with anyone."
                + "</p>"
                + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td style='padding-top:20px;'>"
                + "<p style='font-size:15px; color:#333;'>Thanks,<br><strong>The JobZel Team</strong></p>"
                + "</td>"
                + "</tr>"

                + "<tr>"
                + "<td style='border-top:1px solid #eee; padding-top:20px; text-align:center;'>"
                + "<p style='font-size:12px; color:#999;'>"
                + "If you did not request this email, you can safely ignore it."
                + "</p>"
                + "<p style='font-size:12px; color:#bbb;'>© 2026 JobZel. All rights reserved.</p>"
                + "</td>"
                + "</tr>"

                + "</table>"

                + "</td>"
                + "</tr>"
                + "</table>"

                + "</body>"
                + "</html>";

        return htmlContent;
    }
}