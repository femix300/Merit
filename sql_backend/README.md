# Merit API

**Merit API** is the backend system for the **Merit** web application. It is designed to assist students in navigating the university admission process by evaluating scores, determining course eligibility, and providing alternative course recommendations based on their performance.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
  - [Environment Variables](#environment-variables)
  - [Local Deployment (Limitations)](#local-deployment-limitations)
  - [Frontend Integration](#frontend-integration)
- [API Endpoints](#api-endpoints)
- [Frontend Integration](#frontend-integration)
- [Logging & Debugging](#logging--debugging)
- [Future Enhancements](#future-enhancements)
- [Remote MySQL Access](#remote-mysql-access)
- [Contribution Guidelines](#contribution-guidelines)
- [Contact](#contact)

---

## Project Overview

Merit API serves as the backbone for a university admission assistance platform. It provides students with tools to:

- Evaluate their scores for university admissions.
- Verify qualification for chosen courses.
- Receive recommendations for alternative courses within the same faculty, based on performance metrics.
- Interact with an AI-powered chatbot for additional admissions-related queries.

This backend system is built with scalability, maintainability, and production readiness in mind, demonstrating strong backend engineering practices.

---

## Features

- **Score Evaluation:** Calculate and evaluate student scores for admission.
- **Course Eligibility Check:** Determine if a student qualifies for a chosen course.
- **Alternative Recommendations:** Suggest other courses within the same faculty.
- **AI Chatbot Interface:** Utilize Google Generative AI for an interactive chatbot experience.
- **Structured API Design:** Expose well-documented RESTful API endpoints for integrations.

---

## Technologies Used

- **Backend Framework:** Python (Flask)
- **Database:** MySQL, hosted on Railway in production.
- **ORM:** SQLAlchemy for efficient database interactions.
- **API Design:** Flask RESTful APIs
- **Production Server:** Gunicorn
- **CORS:** Flask-Cors for handling Cross-Origin Resource Sharing
- **Frontend Assets:** HTML, CSS, JavaScript
- **AI SDKs:**  
  - `google-generativeai` and `google-ai-generativelanguage` for chatbot functionality.

---

## Project Setup

### Prerequisites

- **Python 3.10+** installed on your system.
- It is recommended to use a virtual environment for dependency management.
- Git for cloning the repository.

### Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/femix300/Merit.git
cd sql_backend
```

#### 2. Create and Activate a Virtual Environment

**Linux/macOS:**
```bash
python -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

The `requirements.txt` file includes dependencies like Flask, SQLAlchemy, PyMySQL, Gunicorn, and the Google AI SDKs.

---

### Environment Variables

To configure your environment, you need to set the following variables. You can add them to your shell configuration file (like `~/.bashrc` or `~/.zshrc`) or use a `.env` file.

```bash
export FLASK_ENV=development
export FLASK_APP=run.py
export SECRET_KEY=your_secret_key
export MYSQLHOST=your_mysql_host
export MYSQLPORT=3306
export MYSQLUSER=your_mysql_user
export MYSQLPASSWORD=your_mysql_password
export MYSQLDATABASE=your_mysql_database
```

Load the variables using:

```bash
source ~/.bashrc  # or source ~/.zshrc
```

---

### Local Deployment (Limitations)

This project can be run locally to explore the backend structure and codebase. However, **full functionality depends on access to the production database**, which is private. As such, certain features may not work locally without valid database credentials.

#### Steps to Set Up Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/femix300/Merit.git
   cd sql_backend
   ```

2. **Set Up a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For Linux/macOS
   venv\Scripts\activate     # For Windows
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables**:
   Create a `.env` file or use your shell to set the following environment variables:
   ```bash
   export FLASK_ENV=development
   export FLASK_APP=run.py
   export SECRET_KEY=your_secret_key
   export MYSQL_HOST=your_mysql_host
   export MYSQL_PORT=3306
   export MYSQL_USER=your_mysql_user
   export MYSQL_PASSWORD=your_mysql_password
   export MYSQL_DATABASE=your_mysql_database
   ```
   **Note**: These values are private, and the backend will not function without valid credentials.

5. **Run the Application**:
   ```bash
   flask run or python3 run.py
   ```

### Production Deployment

For production deployment, the backend is configured to use **Gunicorn** as the WSGI server. Below are the steps to deploy the application:

#### Deployment Steps
1. **Set Up Hosting Environment**:
   - Use a cloud provider like Render, Railway, or Heroku for deployment.
   - Ensure the hosting environment supports Python and has the ability to set environment variables.

2. **Prepare Environment Variables**:
   - Set the same environment variables used for local development in the hosting provider's dashboard.
   - Ensure that the `FLASK_ENV` is set to `production`.

3. **Procfile**:
   - The project includes a `Procfile` for deployment, which specifies the command to run the application:
     ```text
     web: gunicorn wsgi:app
     ```

4. **Install Dependencies**:
   - The hosting service will automatically install the dependencies listed in `requirements.txt`.

5. **Run the Application**:
   - When deployed, the application will run on the hosting provider’s specified domain (e.g., `https://merit-uc58.onrender.com`).

#### Example Deployment Command (Gunicorn)
To simulate the production environment locally, you can use the following command:
```bash
gunicorn wsgi:app
```

This simulates how the application will run in production using Gunicorn as the WSGI server.

---

#### Testing the API
If you do not have access to the database, you can still explore the codebase and learn about the endpoints described below. For full functionality, please reach out to the repository owner.

---

## API Endpoints

### GET /universities/courses

- **Purpose:** Retrieve a list of universities offering a specific course.
- **Query Parameter:**  
  - `course_name` (string, required)
- **Example Response:**
  ```json
  {
      "Universities offering the course": [
          "University of Ibadan (UI)",
          "University of Lagos (UNILAG)",
          "University of Nigeria, Nsukka (UNN)"
      ],
      "course": "LAW"
  }
  ```

### POST, GET /evaluations/recommendations

- **Purpose:** Calculate and evaluate a student's eligibility for a course and provide recommendations for other courses.
- **Query Parameters:**  
  - `university_name` (string, required)
  - `course_name` (string, required)
  - `utme_score` (int, required)
  - `post_utme_score` (int, required if applicable)
  - `grades` (string, required if applicable)
  - `no_of_sitting` (int, required if applicable)
- **Example Response:**
  ```json
  {
      "University's name": "Obafemi Awolowo University (OAU)",
      "course": "ECONOMICS",
      "course aggregate": 70.38,
      "faculty": "SOCIAL SCIENCES",
      "other courses qualified for": {
          "BROADCAST JOURNALISM": 51.45,
          "MASS COMMUNICATION": 71.05
      },
      "student's aggregate": 82.78,
      "university id": 4
  }
  ```

## GET /post-utme/requirements
Determines the required post-UTME score for a specific course at a selected university. Accepts a GET request with query parameters to calculate the required post-UTME score based on the student's UTME score and, if applicable, O-level grades.

**Query Parameters:**
- `university_name` (str, required): The name of the university for which to retrieve the aggregate requirements. This must be passed as a query parameter.
- `course_name` (str, required): The name of the course to evaluate.
- `utme_score` (int, required): The student's UTME score.
- `grades` (str, required if applicable): Comma-separated O-level grades (if required by the university).
- `no_of_sitting` (int, required if applicable): an integer greater than 0

**Response Examples:**
- `200 OK`:
  ```json
  {
      "course": "SOFTWARE ENGINEERING",
      "pass mark": 50.0,
      "post utme mark": 100,
      "required score": 63,
      "univeristy name": "Federal University of Technology, Akure (FUTA)",
      "university id": 7
  }

## GET /aggregates/requirements
Retrieves the required aggregate score for a specific course at a selected university. Accepts a GET request with a query parameter `course_name` to retrieve the required aggregate score for the specified course.

**Query Parameters:**
- `university_name` (str, required): The name of the university for which to retrieve the aggregate requirements. This must be passed as a query parameter.
- `course_name` (str, required): The name of the course to retrieve the aggregate score for.

**Response Examples:**
- `200 OK`:
  ```json
    {
        "course": "MICROBIOLOGY",
        "course aggregate": 66.25,
        "university id": 4,
        "university name": "Obafemi Awolowo University (OAU)"
    }

## GET /universities/description
Retrieves detailed information about a selected university. Accepts a GET request and returns detailed information about the selected university, including its name, ID, location, establishment year, and description.

**Query Parameters:**
- `university_name` (str, required): The name of the university for which to retrieve the aggregate requirements. This must be passed as a query parameter.

**Response Example:**
- `200 OK`:
  ```json
    {
        "Univerity name": "Obafemi Awolowo University (OAU)",
        "established": 1962,
        "location": "Ile-Ife, Nigeria",
        "university description": "Obafemi Awolowo University (OAU) is a comprehensive public institution located in Ile-Ife, Nigeria. Established in 1962, the university is named after Chief Obafemi Awolowo, a prominent Nigerian nationalist, statesman, and the first premier of the Western Region of Nigeria. OAU is renowned for its commitment to academic excellence, research, and community development. The university's sprawling campus is set on a vast expanse of land, providing a conducive environment for learning and research. OAU offers a wide range of undergraduate and postgraduate programs across various disciplines, contributing significantly to the intellectual and socio-economic development of Nigeria and beyond.",
        "university id": 4
    }


## GET /universities/list/courses
Retrieves a list of courses offered by a selected university. Accepts a GET request and returns a list of courses offered by the selected university, along with the university's name and ID.

**Query Parameters:**
- `university_name` (str, required): The name of the university for which to retrieve the aggregate requirements. This must be passed as a query parameter.

**Response Example:**
- `200 OK`:
  ```json
    {
        "List of courses": [
            "CREATIVE ARTS",
            "ENGLISH LANGUAGE",
            "FRENCH",
            "RUSSIAN",
            "HISTORY & STRATEGIC STUDIES",
            "LINGUISTICS /IGBO",
            "LINGUISTICS /YORUBA",
            "CHINESE",
            "LINGUISTICS",
            "PHILOSOPHY",
            "CHRISTIAN RELIGIOUS KNOWLEDGE",
            "ISLAMIC RELIGIOUS KNOWLEDGE",
            "DENTISTRY",
            "MEDICAL LABORATORY SCIENCE",
            "MEDICINE AND SURGERY",
            "NURSING SCIENCE",
            "PHARMACOLOGY",
            "PHYSIOLOGY",
            "PHYSIOTHERAPY",
            "...",
        ],
        "Univerity name": "University of Lagos (UNILAG)",
        "university id": 2
    }

## GET /course/faculty
Retrieves the faculty of a specific course at a selected university. Accepts a GET request with a query parameter `course_name` to retrieve the faculty to which the specified course belongs at the selected university.

**Query Parameters:**
- `university_name` (str, required): The name of the university for which to retrieve the aggregate requirements. This must be passed as a query  parameter.
- `course_name` (str, required): The name of the course to retrieve the faculty for.

**Response Examples:**
- `200 OK`:
  ```json
    {
        "course": "FRENCH",
        "faculty": "ARTS",
        "university id": 4,
        "university name": "Obafemi Awolowo University (OAU)"
    }


## GET /universities/faculties/courses
Retrieves a list of faculties and their respective courses offered by a selected university. Accepts a GET request and returns a list of faculties and the courses offered under each faculty at the selected university, along with the university's name and ID.

**Query Parameters:**
- `university_name` (str, required): The name of the university for which to retrieve the aggregate requirements. This must be passed as a query parameter.

**Response Example:**
- `200 OK`:
    ```json
  {
      "University name": "University of Ibadan (UI)",
      "faculties and their courses": {
          "AGRICULTURE": [
              "AGRICULTURAL ECONOMICS",
              "AGRICULTURAL EXTENSION AND RURAL DEVELOPMENT",
              "AGRONOMY",
              "ANIMAL SCIENCE",
              "AGRICULTURE (CPEB)"
          ],
          "ARTS": [
              "ARABIC LANGUAGE AND LITERATURE",
              "CLASSICAL STUDIES",
              "COMMUNICATION AND LANGUAGE ARTS",
              "ENGLISH LANGUAGE AND LITERATURE",
              "EUROPEAN STUDIES - FRENCH",
              "EUROPEAN STUDIES - GERMAN",
              "EUROPEAN STUDIES - RUSSIAN",
              "HISTORY",
              "IGBO",
              "ISLAMIC STUDIES",
              "LINGUISTICS",
              "MUSIC",
              "PHILOSOPHY",
              "RELIGIOUS STUDIES",
              "THEATRE ARTS",
              "YORUBA"
          ],
          "COLLEGE OF MEDICINE": [
              "BIOCHEMISTRY",
              "DENTISTRY",
              "ENVIRONMENTAL HEALTH SCIENCE",
              "HUMAN NUTRITION AND DIETETICS",
              "MEDICAL LABORATORY SCIENCE",
              "MEDICINE AND SURGERY",
              "NURSING SCIENCE",
              "PHYSIOLOGY",
              "PHYSIOTHERAPY"
          ]
          "...",
      },
      "university id": 1
  }


## GET /universities/list
Retrieves the list of supported universities.

This endpoint returns a list of universities currently supported by the application, filtered to include only those with available courses.

**Response Example:**
- `200 OK`:
    ```json
    {
        "Supported Universities": [
            "University of Ibadan (UI)",
            "University of Lagos (UNILAG)",
            "University of Nigeria, Nsukka (UNN)",
            "Obafemi Awolowo University (OAU)",
            "Federal University of Technology, Akure (FUTA)",
            "Nnamdi Azikiwe University (UNIZIK)",
            "University of Benin (UNIBEN)"
        ]
    }

## GET /universities/aggregate-requirements
Retrieves the aggregate requirements for admission into a specific university.

**Query Parameters:**
- `university_name` (str, required): The name of the university for which to retrieve the aggregate requirements. This must be passed as a query parameter.

**Response Examples:**
- `200 OK`:
  ```json
    {
        "aggregate requirements": {
            "aggr_year": "2022/2023",
            "max_jamb_score": 400,
            "max_post_utme": 40,
            "method": "utme_postutme_olevel",
            "olevel_subjects": 5,
            "postutme_passmark": 25,
            "require_olevel": true,
            "sitting": false,
            "university_id": 4,
            "university_name": "Obafemi Awolowo University (OAU)"
        }
    }

## GET /all/universities/courses
Retrieves all courses offered by all universities, along with the universities that offer each course.

**Response Examples:**
- `200 OK`:
  ```json
    {
        "courses": {
            "ACCOUNTANCY": [
            {
                "university_id": 3,
                "university_name": "University of Nigeria, Nsukka (UNN)"
            },
            {
                "university_id": 9,
                "university_name": "University of Benin (UNIBEN)"
            }
            ],
            "ACCOUNTANCY/ACCOUNTING": [
            {
                "university_id": 8,
                "university_name": "Nnamdi Azikiwe University (UNIZIK)"
            }
            ],

        }
    }


## GET /merit.ai
Renders the AI chatbot interface.

This endpoint serves the HTML page where users can interact with the AI chatbot. It accepts a GET request to load the chatbot UI.
**Response Examples:**
- `200 OK`:

The chatbot interface allowing users to enter queries and receive responses.


## POST /chat
Handles user input and provides AI chatbot responses.

This endpoint accepts user messages through a POST request, interacts with an AI model, and returns the chatbot's response. The conversation history is stored for reference.

## Frontend Integration

The frontend interacts with the API via HTTP requests using JavaScript (e.g., `fetch` or Axios). The production API is hosted at `https://merit-uc58.onrender.com/`.

---

## Logging & Debugging

- **Local Development:** Logs are displayed in the terminal when `FLASK_ENV=development`.
- **Production Logs:** Can be monitored via the hosting provider’s dashboard (e.g., Railway or Heroku).

---

## Future Enhancements

- **Automated Testing:** Add unit and integration tests for all endpoints.
- **Enhanced Chatbot:** Introduce more advanced AI features for user interaction.

---

## Remote MySQL Access

The production MySQL database is hosted on Railway. Ensure secure access by setting environment variables appropriately. Local development uses a separate MySQL instance to avoid conflicts.

---

## Contribution

Contributions are welcome!

---

## Contact

For any queries or further information, please reach out:

**Peter Ajimoti**  
Email: [oluwaseyipeter@gmail.com](mailto:oluwaseyipeter@gmail.com)

---