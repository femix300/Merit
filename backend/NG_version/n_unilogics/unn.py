from new_merit import University
import pyinputplus as pyip

"""Defines the Unn class"""


class Unn(University):

    """
    Contains unique methods for aggregate calculation
    and post utme score prediction
    """

    uni_name = "University of Nigeria, Nsukka (UNN)"

    unn_olevel = {
        "A1": {"value": 72, "index": 1},
        "B2": {"value": 64, "index": 2},
        "B3": {"value": 56, "index": 3},
        "C4": {"value": 48, "index": 4},
        "C5": {"value": 40, "index": 5},
        "C6": {"value": 32, "index": 6},
    }

    @classmethod
    def print_grades_info(cls):
        print(
            "In order to be considered for admission "
            "into {} you must have at least 5 credits  "
            "in 5 relevant subjects.\n".format(cls.uni_name)
        )

    @classmethod
    def calculate_olevel(cls):
        total = 0
        for i in range(4):
            grade = pyip.inputMenu(
                list(Unn.unn_olevel.keys()),
                numbered=True,
                prompt="Enter grade for subject({}): \n".format(i + 1),
            ).upper()
            total += cls.unn_olevel[grade]["value"]

        return round(total, 3)

    @classmethod
    def calculate_aggregate(cls):
        olevel = Unn.calculate_olevel()
        utme = pyip.inputInt("Enter UTME score: ", min=180, max=400)
        aggregate = (olevel * 0.2) + (utme * 0.8)
        return round(aggregate, 4)

    @classmethod
    def calculate_required_post_utme_score(cls, course_aggregate):
        return None
