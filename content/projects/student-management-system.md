# Student Management System

A modern web application for managing student information, attendance, grades, and institutional operations in educational organizations. Built as a university group project using Java EE technologies.

## Overview

The Student Management System is a comprehensive platform designed to streamline administrative tasks in educational institutions. It provides a centralized solution for managing student records, tracking attendance, recording grades, and handling day-to-day institutional operations.

## Tech Stack

- **Backend:** Java, Jakarta EE (Servlets & JSP)
- **Database:** MySQL
- **Frontend:** JSP, JavaScript, Tailwind CSS
- **Server:** Apache Tomcat

## Key Features

- 👤 **Student Registration & Profiles** — Add, edit, and manage complete student records including personal information and enrollment details
- 📋 **Attendance Tracking** — Mark and monitor daily attendance for each student with historical reports
- 📊 **Grade Management** — Record and calculate grades across multiple subjects and semesters
- 🏫 **Course & Subject Management** — Manage courses, subjects, and assign students accordingly
- 👨‍🏫 **Teacher Dashboard** — Dedicated interface for teachers to manage their classes and students
- 🔐 **Role-Based Access Control** — Separate access levels for admins, teachers, and staff
- 📈 **Reports & Analytics** — Generate attendance and performance reports for individual students or entire classes

## Architecture

The application follows the **MVC (Model-View-Controller)** pattern using Jakarta EE:

- **Model** — Java classes representing entities (Student, Course, Grade, Attendance)
- **View** — JSP pages styled with Tailwind CSS for a modern UI
- **Controller** — Java Servlets handling HTTP requests and business logic
- **Database** — MySQL with JDBC for data persistence

## University Group Project

This was developed as a group project at university, where the team collaborated on planning, designing, and implementing the full system from scratch. The project focused on applying enterprise Java development concepts in a real-world academic management scenario.
