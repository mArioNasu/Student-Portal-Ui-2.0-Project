# Student Portal – IMS566 Individual Project

## 1. Project Title & Description

**Title:** Student Portal – Easy Access Academic Dashboard  

This project is a simple student portal web application developed for the IMS566 Advanced Web Design Development and Content Management individual assignment. The portal allows a student to log in and view a personalised dashboard, enrolled courses, grades, and basic profile information.  

The main focus of this project is to demonstrate:
- the use of modern front-end framework (Bootstrap 5),
- responsive web design,
- basic authentication (simulated),
- data presentation using tables,
- and data visualisation using Chart.js.

---

## 2. Features Included

- **Login Authentication (Simulated)**
  - Hardcoded demo credentials.
  - Error message displayed for invalid username or password.
  - Session-based access: user must log in before accessing internal pages.
  - Logout button to clear session and return to login page.

- **Navigation Menu**
  - Responsive Bootstrap navbar.
  - Links to Dashboard, My Courses, My Grades, and Profile.
  - Active page is highlighted for better user orientation.

- **Dashboard Page**
  - Summary cards for:
    - Total current courses
    - Completed credits
    - Current CGPA (sample value)
  - GPA trend chart using Chart.js (Semester 1–4).

- **Data View Pages**
  - **My Courses Page**
    - Table listing course code, course title, credit hours, and status.
  - **My Grades Page**
    - Table showing semester, course, grade, and grade point.

- **Profile Page**
  - Basic student information (name, student ID, programme, campus, email).
  - Simple avatar style to represent the student.

- **Content Management & Layout**
  - Clear section headings and structure.
  - Consistent footer with project information.
  - Use of cards, tables, and visual components for readability.

---

## 3. Instructions to Test Login

To access the student portal:

1. Open the website link (GitHub Pages URL).
2. You will see the **Login** page.
3. Use the following demo credentials:

   - **Username:** `student`  
   - **Password:** `12345`

4. Click the **Login** button.
5. You will be redirected to the **Dashboard** page if the credentials are correct.
6. Use the **Logout** button in the top-right corner to end the session.

If the username or password is incorrect, an error message will be shown on the login page.

---

## 4. Frameworks & Libraries Used

The project uses the following technologies:

- **HTML5** – Structure of the web pages.
- **CSS3** – Custom styling for layout and UI elements.
- **JavaScript (Vanilla JS)** – Login logic, session handling, and chart initialisation.
- **[Bootstrap 5](https://getbootstrap.com/)** – Front-end framework for responsive layout, navbar, cards, and tables (via CDN).
- **[Chart.js](https://www.chartjs.org/)** – JavaScript library used to display the GPA line chart on the dashboard (via CDN).

---

## 5. How to Run the Project Locally

1. Download or clone the project folder to your computer.
2. Open the main folder in any code editor (e.g. Visual Studio Code).
3. Open the file **`login.html`** in a web browser (Google Chrome is recommended).
4. Log in using the demo credentials:
   - Username: `student`
   - Password: `12345`
5. Navigate through the pages using the top navigation bar.

> Note: No backend or database is used. Authentication is simulated using hardcoded values and `sessionStorage` in the browser.

---

## 6. Project Structure

```text
root folder/
├─ login.html
├─ dashboard.html
├─ courses.html
├─ grades.html
├─ profile.html
├─ README.md
└─ assets/
   ├─ css/
   │  └─ style.css
   └─ js/
      └─ app.js

## 7. Student Information

- **Name:** Mario Nasu Anak Anen  
- **Student ID:** 2025188553  
- **Course:** Bachelor of Information Science (Hons.) Information Systems Management  
- **Subject:** IMS566 – Advanced Web Design Development and Content Management  
- **Institution:** Universiti Teknologi MARA (UiTM) Puncak Perdana
