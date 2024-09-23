from about_universities import about_uni
from courses.ui_courses import ui_courses_
from courses.unilag_courses import unilag_courses_
from courses.unn_courses import unn_courses_
from courses.oau_courses import oau_courses_
from courses.abu_courses import abu_courses_
from courses.unilorin_courses import unilorin_courses_
from courses.futa_courses import futa_courses_
from courses.unizik_courses import unizik_courses_
from courses.uniben_courses import uniben_courses_
from courses.fuoye_courses import fuoye_courses_

"""
universities is a list of dicationaries that
contains important info about each university
"""

universities = [
    {
        "id": 1,
        "name": "University of Ibadan (UI)",
        "about": about_uni[0]["description"],
        "aggr_year": "2021/2022",
        "courses": ui_courses_,
        "olevel for aggr": False,
        "total post utme": 100,
    },
    {
        "id": 2,
        "name": "University of Lagos (UNILAG)",
        "about": about_uni[1]["description"],
        "aggr_year": "2022/2023",
        "courses": unilag_courses_,
        "olevel for aggr": True,
        "total post utme": 30,
    },
    {
        "id": 3,
        "name": "University of Nigeria, Nsukka (UNN)",
        "about": about_uni[2]["description"],
        "aggr_year": "2022/2023",
        "courses": unn_courses_,
        "olevel for aggr": True,
        "total post utme": 400,
    },
    {
        "id": 4,
        "name": "Obafemi Awolowo University (OAU)",
        "about": about_uni[3]["description"],
        "aggr_year": "2022/2023",
        "courses": oau_courses_,
        "olevel for aggr": True,
        "total post utme": 40,
    },
    {
        "id": 5,
        "name": "Ahmadu Bello University (ABU)",
        "about": about_uni[4]["description"],
        "aggr_year": None,
        "courses": abu_courses_,
        "olevel for aggr": None,
        "total post utme": None,
    },
    {
        "id": 6,
        "name": "University of Ilorin (UNILORIN)",
        "about": about_uni[5]["description"],
        "aggr_year": None,
        "courses": unilorin_courses_,
        "olevel for aggr": None,
        "total post utme": None,
    },
    {
        "id": 7,
        "name": "Federal University of Technology, Akure (FUTA)",
        "about": about_uni[6]["description"],
        "aggr_year": "2022/2023",
        "courses": futa_courses_,
        "olevel for aggr": False,
        "total post utme": 100,
    },
    {
        "id": 8,
        "name": "Nnamdi Azikiwe University (UNIZIK)",
        "about": about_uni[7]["description"],
        "aggr_year": "2022/2023",
        "courses": unizik_courses_,
        "olevel for aggr": False,
        "total post utme": 100,
    },
    {
        "id": 9,
        "name": "University of Benin (UNIBEN)",
        "about": about_uni[8]["description"],
        "aggr_year": "2022/2023",
        "courses": uniben_courses_,
        "olevel for aggr": False,
        "total post utme": 100,
    },
    {
        "id": 10,
        "name": "Federal University Oye Ekiti (FUOYE)",
        "about": about_uni[9]["description"],
        "aggr_year": None,
        "courses": fuoye_courses_,
        "olevel for aggr": None,
        "total post utme": None,
    },
]


