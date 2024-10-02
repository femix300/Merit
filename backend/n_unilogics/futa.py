from new_merit import University
import pyinputplus as pyip

"""Defines the Futa class"""


class Futa(University):

    """
    Contains unique methods for aggregate calculation
    and post utme score prediction
    """
    uni_name = "The Federal University of Technology, Akure(FUTA)"

    @classmethod
    def print_grades_info(cls):
        print(
            "In order to be considered for admission "
            "into {} you must have at least 5 credits "
            "in 5 relevant subjects.\n".format(cls.uni_name)
        )

    @classmethod
    def calculate_aggregate(cls, utme, post_utme):
        aggregate = (utme * 0.125) + (post_utme * 0.5)
        return round(aggregate, 4)

    @classmethod
    def calculate_required_post_utme_score(cls, course_aggregate, utme):
        post_utme = (course_aggregate - (utme * 0.125)) / 0.5
        return post_utme
