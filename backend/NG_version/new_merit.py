"""Defines a class University"""
from sqlalchemy.orm import sessionmaker
from models import Universities, About, Session, session
import sys
import pyinputplus as pyip

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
        return courses

    def get_course_aggregate(self):
        courses = self.get_courses()
        if courses:
            course_list = []
            for course in courses:
                course_list.append(course.name)

            print("\nSelect your dream course!\n")
            course_of_ch = pyip.inputMenu(
                course_list,
                numbered=True,
                prompt="Please enter one of the following "
                "(course name or serial number): \n",
            )

            print("\nYou selected {}\n".format(course_of_ch))
            for course in courses:
                if course.name == course_of_ch:
                    course_aggregate = course.aggregate

            if course_aggregate:
                uni = self.get_uni()
                print(
                    "In order to study {} at {} you need to achieve "
                    "an aggregate score of {}".format(
                        course_of_ch, uni.name, course_aggregate)
                )

                self.disclaimer_info()
                return course_aggregate                

    def list_courses(self):
        """Lists out all the courses offered in a selected university."""
        uni = self.get_uni()
        print("List of Courses offered in {}".format(uni.name))
        phrase_len = len(uni.name) + len("List of Courses offered in ")
        print("=" * phrase_len)
        courses = self.get_courses()
        for course in courses:
            print("{}. {}".format(course.id, course.name))

    def display_faculties_and_courses(self):
        """Displays all the faculties and courses under
        them in a selected university."""
        courses = self.get_courses()
        uni = self.get_uni()

        if courses:
            faculty_courses = {}
            for course in courses:
                faculty_courses.setdefault(
                    course.faculty, []).append(course.name)
            print(
                "List of faculties under {} with their "
                "respective Departments:".format(uni.name)
            )
            phrase_len = len(uni.name) + len(
                "List of faculties under  with their respective Departments:"
            )
            print("=" * phrase_len)

            for faculty, courses in faculty_courses.items():
                print(faculty)
                print("=" * len(faculty))
                for i, course in enumerate(courses, start=1):
                    print("{}. {}".format(i, course))
                print()
        else:
            print("Pending...")

    def display_name(self):
        """Prints out the name of a selected university."""
        uni = self.get_uni()
        if uni:
            uni_name = uni.name
            print("{}".format(uni_name))

    def about_uni(self):
        """Displays information about a selected university."""
        uni = self.get_uni()
        self.display_name()
        about = session.query(About).join(Universities).filter(
            Universities.name == uni.name).first()
        if about:
            print(about.description)

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
