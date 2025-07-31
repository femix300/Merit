from app.models.merit import University
import pyinputplus as pyip

"""Defines the Oau class"""


class Oau(University):

    """
    Contains unique methods aggregate calculation
    and post utme score prediction
    """

    uni_name = "Obafemi Awolowo University (OAU)"

    oau_olevel = {
        "A1": {"value": 2, "index": 1},
        "B2": {"value": 1.8, "index": 2},
        "B3": {"value": 1.6, "index": 3},
        "C4": {"value": 1.4, "index": 4},
        "C5": {"value": 1.2, "index": 5},
        "C6": {"value": 1, "index": 6},
    }

    @classmethod
    def print_grades_info(cls):
        print(
            "In order to be considered for admission "
            "into {} you must have at least 5 credits  "
            "in 5 relevant subjects.\n".format(cls.uni_name)
        )

    @classmethod
    def calculate_olevel(cls, grades=[]):
        grade_list = grades.split(',')
        total = 0
        for grade in grade_list:
            total += cls.oau_olevel[grade]["value"]
        return round(total, 3)

    @classmethod
    def calculate_aggregate(cls, utme, post_utme, olevel=[]):
        olevel = Oau.calculate_olevel(olevel)
        aggregate = olevel + (utme * 0.125) + post_utme
        return round(aggregate, 4)

    @classmethod
    def calculate_required_post_utme_score(cls, course_aggregate, utme, grades=[]):
        olevel = Oau.calculate_olevel(grades)
        post_utme = course_aggregate - ((utme * 0.125) + olevel)
        return post_utme
