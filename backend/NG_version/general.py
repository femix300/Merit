import sys
from universities import universities
import pyinputplus as pyip
from unilogics.ui import Ui
from unilogics.oau import Oau
from unilogics.unilag import Unilag
from unilogics.unn import Unn
from unilogics.futa import Futa
from unilogics.unizik import Unizik
from unilogics.uniben import Uniben


def evaluate_and_recommend(_class_instance, universities):
    """
    Takes in a class instance and the universities list.

    Gets the user's course of choice, calculates their aggregate,
    and prints out corresponding information.
    """
    index = _class_instance.get_uni_index()
    print()
    courses = list(_class_instance.universities[index]["courses"].keys())

    course_of_ch = pyip.inputMenu(
        courses,
        numbered=True,
        prompt="Please enter one of the following "
        "(course name or serial number): \n",
    )
    print("\nYou selected {}\n".format(course_of_ch))

    _class_instance.print_grades_info()

    course_aggr = universities[index].get(
        "courses")[f"{course_of_ch}"]["aggregate"]
    stu_aggr = _class_instance.calculate_aggregate()
    stu_aggr = round(stu_aggr, 2)

    if stu_aggr >= course_aggr:
        print(
            "Congratulations! You met the requirements to "
            "study {} at {}.".format(
                course_of_ch, universities[index].get("name"))
        )
    else:
        print(
            "You did not meet the requirements to study {} at {}.".format(
                course_of_ch, universities[index].get("name")
            )
        )

    print(
        "The required score was {} and your final aggregate "
        "score was {}.".format(course_aggr, stu_aggr)
    )

    course_faculty = universities[index].get(
        "courses")[f"{course_of_ch}"]["faculty"]

    same_faculty = []
    for course, details in universities[index]["courses"].items():
        if course_faculty == details["faculty"]:
            if course_of_ch != course:
                same_faculty.append(details["faculty"])

    qualified_to_study = None

    """create a dictionary that contains all
    the courses a use is qualifies to study"""
    if len(same_faculty) >= 1:
        qualified_to_study = {}
        for course, course_details in universities[index]["courses"].items():
            if course_faculty == course_details["faculty"]:
                aggregate = course_details["aggregate"]
                if aggregate:
                    if stu_aggr >= aggregate:
                        if course != course_of_ch:
                            qualified_to_study[course] = aggregate
    if qualified_to_study:
        print(
            "You're qualified to study the following courses "
            "that share the same faculty as {}: ".format(course_of_ch)
        )
        for i, (course, aggregate) in enumerate(qualified_to_study.items()):
            print("{}. {} ({})".format(i + 1, course, aggregate))

    _class_instance.disclaimer_info()


def determine_post_utme_score(_class_instance, universities):
    """
    Takes in a class instance and the universities list

    Predicts the post utme score needed for a particulat course
    using existing credentials.
    """
    index = _class_instance.get_uni_index()
    print()
    courses = list(_class_instance.universities[index]["courses"].keys())
    post_utme_mark = _class_instance.universities[index]["total post utme"]

    # pass mark is half the total, could be different in some schools.
    pass_mark = post_utme_mark / 2

    course_of_ch = pyip.inputMenu(
        courses,
        numbered=True,
        prompt="Please enter one of the following "
        "(course name or serial number): \n",
    )
    print("\nYou selected {}\n".format(course_of_ch))

    _class_instance.print_grades_info()

    course_aggr = universities[index].get(
        "courses")[f"{course_of_ch}"]["aggregate"]
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


def get_uni_id(universities):
    """
    Enables a user to select a university
    Returns the id/serial number of that university.
    """
    university_names = [uni["name"] for uni in universities]
    university_names.append("Exit")
    uni_name = pyip.inputMenu(
        university_names,
        numbered=True,
        prompt="Please enter one of the following "
        "(serial number or university name)\n",
    )

    if uni_name == "Exit":
        sys.exit("\nThanks for using Merit!")

    print("\nYou selected {}\n".format(uni_name))

    for uni in universities:
        if uni["name"] == uni_name:
            # 1 was added to solve indexing issues
            uni_id = universities.index(uni) + 1

    # I substracted 1 from the id here to prevent errors
    # but 1 will be added later
    if not universities[uni_id - 1]["courses"]:
        return None
    return uni_id


def get_the_class_instance(universities):
    """
    creates and returns a class instance using the uni id.
    """
    uni_id = get_uni_id(universities)

    if uni_id is None:
        return None

    uni_classes = {
        "1": Ui,
        "2": Unilag,
        "3": Unn,
        "4": Oau,
        "7": Futa,
        "8": Unizik,
        "9": Uniben,
    }

    """puts the id in string format to support indexing into the dictionary."""
    uni_id_str = str(uni_id)
    _class = uni_classes[uni_id_str]

    _class_instance = _class(uni_id)

    return _class_instance


def entry_point(universities, _class_instance):
    """The main entry point to the program,
    creates an options dictionary that has keys as choices for the user
    and values that are methods/functions that are called based on the user's
    choice.
    """
    if not _class_instance:
        print("Not Available at the moment. Please check again later.")
        return

    options = {
        "Calculate Aggregate": lambda: evaluate_and_recommend(
            _class_instance, universities
        ),
        "Determine required POST UTME score":
        lambda: determine_post_utme_score(_class_instance, universities
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
    _class_instance = get_the_class_instance(universities)
    entry_point(universities, _class_instance)
    print("\n===============================Home===========================\n")
