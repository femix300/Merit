"""Defines a class University"""
from universities import universities
from collections import defaultdict
import sys
import pyinputplus as pyip


class University:
    universities = universities

    """Initializes a university with an id."""

    def __init__(self, id):
        self.id = id

    def display_universities(self):
        """Displays all universities."""
        for uni in self.universities:
            print("{}. {}".format(uni.get("id"), uni.get("name")))

    def get_uni_index(self):
        """Get's the index of a particular
        university in the universities list."""
        for uni in self.universities:
            if uni.get("id") == self.id:
                uni_index = universities.index(uni)
                self.uni_index = uni_index
                return uni_index

    def get_courses(self):
        """Get's all the courses in a selected university."""
        uni_index = self.get_uni_index()
        courses = self.universities[uni_index].get("courses")
        return courses

    def get_faculty(self, course):
        """Returns the faculty of a given course"""
        uni_index = self.get_uni_index()
        course_faculty = universities[uni_index].get(
            "courses")[f"{course}"]["faculty"]
        return course_faculty

    def get_course_aggregate(self, _course):
        """Get's the aggregate score to a selected course."""
        index = self.get_uni_index()

        course_of_ch = _course
        if course_of_ch in list(self.universities[index]["courses"].keys()):
            course = universities[index]["courses"][course_of_ch]
            course_aggregate = course["aggregate"]
            return course_aggregate

        return None

    def list_courses(self):
        """Lists out all the courses offered in a selected university."""
        index = self.get_uni_index()
        print(
            "List of Courses offered in {}".format(
                self.universities[index].get("name"))
        )
        phrase_len = len(self.universities[index].get("name")) + len(
            "List of Courses offered in "
        )
        print("=" * phrase_len)
        for course, course_details in self.get_courses().items():
            print("{}. {}".format(course_details["id"], course))

    def get_faculties_and_courses(self):
        """Displays all the faculties and courses under
        them in a selected university."""
        courses_data = self.get_courses().items()
        if courses_data:
            faculties_data = defaultdict(list)
            for course, c_details in courses_data:
                faculties_data[c_details["faculty"]].append(course)
            return dict(faculties_data)
        else:
            return {}

    def display_name(self):
        """Prints out the name of a selected university."""
        index = self.get_uni_index()
        print("{}".format(self.universities[index].get("name")))

    def about_uni(self):
        """Displays information about a selected university."""
        uni_index = self.get_uni_index()
        return self.universities[uni_index].get("about")

    def disclaimer_info(self):
        """Prints disclaimer info."""
        index = self.get_uni_index()
        universities = self.universities
        print(
            "\nPlease note that this was determined by the departmental "
            "cut off mark set by {} in the year {} and may not accurately "
            "reflect recent developments.\n".format(
                universities[index].get("name", ""),
                universities[index].get("aggr_year", ""),
            )
        )

    def exit(self):
        """Exits the program."""
        sys.exit("Thanks for using Merit")
