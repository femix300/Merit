"""Defines a class University"""
from sqlalchemy.orm import sessionmaker
from models import Universities, About, Session, session
import sys
import pyinputplus as pyip
from collections import defaultdict

from models import (
    Universities,
    About,
    UiCourses,
    UnilagCourses,
    UnnCourses,
    OauCourses,
    AbuCourses,
    UnilorinCourses,
    FutaCourses,
    UnizikCourses,
    UnibenCourses,
    FuoyeCourses
)


# Mapping of university IDs to course classes
university_courses_map = {
    1: UiCourses,
    2: UnilagCourses,
    3: UnnCourses,
    4: OauCourses,
    5: AbuCourses,
    6: UnilorinCourses,
    7: FutaCourses,
    8: UnizikCourses,
    9: UnibenCourses,
    10: FuoyeCourses
}

uni_classes = {
    "University of Ibadan": UiCourses,
    "University of Lagos": UnilagCourses,
    "University of Nigeria": UnnCourses,
    "Obafemi Awolowo University": OauCourses,
    "Federal University of Technology Akure": FutaCourses,
    "Nnamdi Azikiwe University": UnizikCourses,
    "University of Benin": UnibenCourses,
}


class University:
    universities = session.query(Universities).all()
    """Initializes a university with an id."""

    def __init__(self, id):
        self.id = id

    def get_uni(self):
        """Gets a university and related info"""
        uni_id = self.get_uni_index()
        uni = session.query(Universities).filter_by(id=uni_id).first()
        return uni

    def display_universities(self):
        """Displays all universities."""
        for uni in self.universities:
            print("{}. {}".format(uni.id, uni.name))

    def get_uni_index(self):
        """Get's the index of a particular
        university in the universities list."""
        for uni in self.universities:
            if uni.id == self.id:
                uni_index = uni.id
                self.uni_index = uni_index
                return uni_index

    def get_courses(self):
        """Fetches all the courses for the selected university from the database."""
        uni_id = self.get_uni_index()
        course_class = university_courses_map.get(uni_id)
        courses = session.query(course_class).filter_by(
            university_id=uni_id).all()
        if courses:
            return courses
        return None

    def get_faculty(self, course):
        """Returns the faculty of a given course"""
        courses = self.get_courses()
        for _course in courses:
            if course == _course.name:
                return _course.faculty
        return None

    def get_course_aggregate(self, _course):
        """Get the aggregate score of a selected course using MySQL."""
        courses = self.get_courses()

        if not courses:
            return None

        for course in courses:
            if course.name == _course:
                return course.aggregate

        return None

    def list_courses(self):
        """Lists out all the courses offered in a selected university."""
        uni = self.get_uni()
        print("List of Courses offered in {}".format(uni.name))
        phrase_len = len(uni.name) + len("List of Courses offered in ")
        print("=" * phrase_len)
        courses = self.get_courses()
        for course in courses:
            print("{}. {}".format(course.id, course.name))

    def get_faculties_and_courses(self):
        """Fetches all the faculties and courses under
        them for the selected university."""
        courses = self.get_courses()

        if courses:
            faculty_courses = defaultdict(list)
            for course in courses:
                faculty_courses[course.faculty].append(course.name)
            return dict(faculty_courses)
        else:
            return None

    def display_name(self):
        """Prints out the name of a selected university."""
        uni = self.get_uni()
        if uni:
            uni_name = uni.name
            print("{}".format(uni_name))

    def about_uni(self):
        """Returns information about a selected university."""
        uni = self.get_uni()
        about = session.query(About).join(Universities).filter(
            Universities.name == uni.name).first()
        if about:
            return about
        return None

    def disclaimer_info(self):
        """Prints disclaimer info."""
        uni = self.get_uni()
        print(
            "\nPlease note that this was determined by the departmental "
            "cut off mark set by {} in the year {} and may not accurately "
            "reflect recent developments.\n".format(
                uni.name,
                uni.year,
            )
        )

    def exit(self):
        """Exits the program"""
        sys.exit("Thanks for using Merit")


session.close()