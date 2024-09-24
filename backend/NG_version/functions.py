import sys
from models import Universities, session
import pyinputplus as pyip
from n_unilogics.ui import Ui
from n_unilogics.oau import Oau
from n_unilogics.unilag import Unilag
from n_unilogics.unn import Unn
from n_unilogics.futa import Futa
from n_unilogics.unizik import Unizik
from n_unilogics.uniben import Uniben

from models import (
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

uni_classes = {
    "University of Ibadan": UiCourses,
    "University of Lagos": UnilagCourses,
    "University of Nigeria": UnnCourses,
    "Obafemi Awolowo University": OauCourses,
    "Federal University of Technology Akure": FutaCourses,
    "Nnamdi Azikiwe University": UnizikCourses,
    "University of Benin": UnibenCourses,
}


# global variable universities
universities = session.query(Universities).all()


def evaluate_and_recommend(_class_instance):
    """
    Takes in a class instance and the universities list.

    Gets the user's course of choice, calculates their aggregate,
    and prints out corresponding information.
    """
    uni = _class_instance.get_uni()
    uni_name = uni.name
    courses = _class_instance.get_courses()
    course_list = [course.name for course in courses]

    course_of_ch = pyip.inputMenu(
        course_list,
        numbered=True,
        prompt="Please enter one of the following "
        "(course name or serial number): \n",
    )
    print("\nYou selected {}\n".format(course_of_ch))

    _class_instance.print_grades_info()
    course_aggr = next(
        (course.aggregate for course in courses if course.name == course_of_ch), None)
    course_faculty = next(
        (course.faculty for course in courses if course.name == course_of_ch), None)

    stu_aggr = _class_instance.calculate_aggregate()
    stu_aggr = round(stu_aggr, 2)

    if stu_aggr >= course_aggr:
        print(
            "Congratulations! You got an aggregate of {} and met the requirements to "
            "study {} at {}.".format(
                stu_aggr, course_of_ch, uni_name)
        )
    else:
        print(
            "You did not meet the requirements to study {} at {}.".format(
                course_of_ch, uni_name
            )
        )

    same_faculty = [course.name for course in courses if course.faculty ==
                    course_faculty and course.name != course_of_ch]

    qualified_to_study = None

    if len(same_faculty) >= 1:
        qualified_to_study = {}
        for course in courses:
            if course.faculty == course_faculty:
                aggregate = course.aggregate
                if aggregate:
                    if stu_aggr >= aggregate:
                        if course.name != course_of_ch:
                            qualified_to_study[course.name] = aggregate

    if qualified_to_study:
        print(
            "You're qualified to study the following courses "
            "that share the same faculty as {}: ".format(course_of_ch)
        )
        for i, (course, aggregate) in enumerate(qualified_to_study.items()):
            print("{}. {} ({})".format(i + 1, course, aggregate))

    _class_instance.disclaimer_info()


def determine_post_utme_score(_class_instance):
    """
    Takes in a class instance and the universities list

    Predicts the post utme score needed for a particulat course
    using existing credentials.
    """
    uni = _class_instance.get_uni()
    courses = _class_instance.get_courses()
    course_list = [course.name for course in courses]
    post_utme_mark = uni.total_post_utme

    # pass mark is half the total, could be different in some schools.
    pass_mark = post_utme_mark / 2

    course_of_ch = pyip.inputMenu(
        course_list,
        numbered=True,
        prompt="Please enter one of the following "
        "(course name or serial number): \n",
    )
    print("\nYou selected {}\n".format(course_of_ch))

    _class_instance.print_grades_info()

    course_aggr = next(
        (course.aggregate for course in courses if course.name == course_of_ch), None)
    required_score = _class_instance.calculate_required_post_utme_score(
        course_aggr)

    if required_score is None:
        print("Currently Unavailable")
        return

    pd_score = required_score / 0.4

    if required_score < pass_mark:
        required_score = pass_mark
        if pd_score < 60:
            pd_score = 60

    required_score = int(round(required_score))

    pd_score = round(pd_score, 1)

    if required_score <= post_utme_mark:
        print(
            "Based on your grades, "
            "you are required to score at least {} "
            "in your post utme exams in order to be "
            "considered for admission.".format(
                required_score + 1
            )  # added one to be a little bit above
        )
        # pd score only works with OAU for now
        if isinstance(_class_instance, Oau):
            print(
                "If you're coming through predegree then you'll need "
                "to score at least {} out of 100 marks.".format(pd_score)
            )
    else:
        print(
            "Based on your grades, in order to be considered "
            "for admission to study {}, you'll have to score at least {} "
            "out of {} marks which is simply impossible.".format(
                course_of_ch, required_score, post_utme_mark
            )
        )
    _class_instance.disclaimer_info()


def get_uni_name():
    """
    Enables a user to select a university
    Returns the selected university.
    """
    uni_names = [uni.name for uni in universities]
    uni_names.append("universities that offer course of choice")
    uni_names.append("Exit")

    while True:
        selected = pyip.inputMenu(
            uni_names,
            numbered=True,
            prompt="Please enter one of the following "
            "(serial number or university name)\n",
        )

        selected_uni = True

        if selected == "universities that offer course of choice":
            selected_uni = False
            uni_list = find_universities_offering_course()
            if uni_list:
                print()
                for uni in uni_list:
                    print("->{}".format(uni))
                print()
            else:
                print(
                    "\nThere are no supported universities currently offering that course\n")

        if selected == "Exit":
            sys.exit("\nThanks for using Merit!")
        if selected_uni:
            print("\nYou selected {}\n".format(selected))

        if not selected_uni:
            continue

        for uni in universities:
            if uni.name == selected:
                return uni.name


def get_the_class_instance():
    """
    creates and returns a class instance using the uni id.
    """
    uni_name = get_uni_name()

    uni_classes = {
        "University of Ibadan (UI)": {"id": 1, "class": Ui},
        "University of Lagos (UNILAG)": {"id": 2, "class": Unilag},
        "University of Nigeria, Nsukka (UNN)": {"id": 3, "class": Unn},
        "Obafemi Awolowo University (OAU)": {"id": 4, "class": Oau},
        "Federal University of Technology, Akure (FUTA)": {"id": 7, "class": Futa},
        "Nnamdi Azikiwe University (UNIZIK)": {"id": 8, "class": Unizik},
        "University of Benin (UNIBEN)": {"id": 9, "class": Uniben},
    }

    if not uni_name in uni_classes.keys():
        return None

    uni_id = uni_classes[uni_name]["id"]
    _class = uni_classes[uni_name]["class"]

    _class_instance = _class(uni_id)

    return _class_instance


def find_universities_offering_course():
    """
    Function to find universities offering a particular course.
    Returns:
    universities_offering_course: list - List of university names that offer the specified course.
    """
    universities_offering_course = []

    course_name = pyip.inputStr('enter the course you want to study: ')
    for uni_name, CourseClass in uni_classes.items():

        course = session.query(CourseClass).filter(
            CourseClass.name == course_name).first()

        if course:
            universities_offering_course.append(uni_name)

    return universities_offering_course


def entry_point(_class_instance):
    """The main entry point to the program,
    creates an options dictionary that has keys as choices for the user
    and values that are methods/functions that are called based on the user's
    choice.
    """
    if not _class_instance:
        print("Coming Soon!")
        return

    options = {
        "Calculate Aggregate": lambda: evaluate_and_recommend(
            _class_instance
        ),
        "Determine required POST UTME score":
        lambda: determine_post_utme_score(_class_instance
                                          ),
        "Get the required score to study your dream course":
        _class_instance.get_course_aggregate,
        "About University": _class_instance.about_uni,
        "Display University Name": _class_instance.display_name,
        "Display list of courses":
        _class_instance.list_courses,
        "Display Faculties and Courses":
        _class_instance.display_faculties_and_courses,
        "Display all Universities": _class_instance.display_universities,
        "Exit": _class_instance.exit,
    }

    """Unless the user selects exit this loop will let them use
    multiple features of merit on the same university"""
    while True:
        choices = list(options.keys())

        print()
        choice = pyip.inputMenu(
            choices,
            numbered=True,
        )

        if choice == "Exit":
            break

        selected_option = options[choice]

        selected_option()


print("\n===============================Home===============================\n")
while True:
    _class_instance = get_the_class_instance()
    entry_point(_class_instance)
    print("\n===============================Home===========================\n")
