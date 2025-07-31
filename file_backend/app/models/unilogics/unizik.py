from app.models.merit import University
import pyinputplus as pyip

"""Defines the Unizik class"""


class Unizik(University):

    """
    Contains unique methods for aggregate calculation
    and post utme score prediction
    """

    uni_name = "Nnamdi Azikiwe University (UNIZIK)"

    @classmethod
    def print_grades_info(cls):
        print(
            "In order to be considered for admission "
            "into {} you must have at least 5 credits "
            "in 5 relevant subjects.\n".format(cls.uni_name)
        )

    @classmethod
    def calculate_aggregate(cls, utme, post_utme):
        aggregate = (utme) + (post_utme * 4) / 2
        return round(aggregate, 4)

    @classmethod
    def calculate_required_post_utme_score(cls, course_aggregate, utme):
        post_utme = ((2 * course_aggregate) - (utme)) / 4
        return post_utme
