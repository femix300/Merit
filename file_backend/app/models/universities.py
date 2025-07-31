from app.models.about_universities import about_uni
from app.models.courses.ui_courses import ui_courses_
from app.models.courses.unilag_courses import unilag_courses_
from app.models.courses.unn_courses import unn_courses_
from app.models.courses.oau_courses import oau_courses_
from app.models.courses.abu_courses import abu_courses_
from app.models.courses.unilorin_courses import unilorin_courses_
from app.models.courses.futa_courses import futa_courses_
from app.models.courses.unizik_courses import unizik_courses_
from app.models.courses.uniben_courses import uniben_courses_
from app.models.courses.fuoye_courses import fuoye_courses_

from app.utils.docs_required import get_aggr_docs

"""
universities is a list of dicationaries that
contains important info about each university
"""

universities = [
    {
        "id": 1,
        "name": "University of Ibadan (UI)",
        "about": about_uni[0],
        "aggr_year": "2021/2022",
        "courses": ui_courses_,
        "require olevel": False,
        "total post utme": 100,
        "utme postutme": True,
        "aggr docs": get_aggr_docs(1),
    },
    {
        "id": 2,
        "name": "University of Lagos (UNILAG)",
        "about": about_uni[1],
        "aggr_year": "2022/2023",
        "courses": unilag_courses_,
        "require olevel": True,
        "total post utme": 30,
        "aggr docs": get_aggr_docs(2),
    },
    {
        "id": 3,
        "name": "University of Nigeria, Nsukka (UNN)",
        "about": about_uni[2],
        "aggr_year": "2022/2023",
        "courses": unn_courses_,
        "require olevel": True,
        "total post utme": None,
        "aggr docs": get_aggr_docs(3),
    },
    {
        "id": 4,
        "name": "Obafemi Awolowo University (OAU)",
        "about": about_uni[3],
        "aggr_year": "2022/2023",
        "courses": oau_courses_,
        "require olevel": True,
        "total post utme": 40,
        "aggr docs": get_aggr_docs(4),
    },
    {
        "id": 5,
        "name": "Ahmadu Bello University (ABU)",
        "about": about_uni[4],
        "aggr_year": None,
        "courses": abu_courses_,
        "require olevel": None,
        "total post utme": None,
        "aggr docs": get_aggr_docs(5),
    },
    {
        "id": 6,
        "name": "University of Ilorin (UNILORIN)",
        "about": about_uni[5],
        "aggr_year": None,
        "courses": unilorin_courses_,
        "require olevel": None,
        "total post utme": None,
        "aggr docs": get_aggr_docs(6),
    },
    {
        "id": 7,
        "name": "Federal University of Technology, Akure (FUTA)",
        "about": about_uni[6],
        "aggr_year": "2022/2023",
        "courses": futa_courses_,
        "require olevel": False,
        "total post utme": 100,
        "aggr docs": get_aggr_docs(7),
    },
    {
        "id": 8,
        "name": "Nnamdi Azikiwe University (UNIZIK)",
        "about": about_uni[7],
        "aggr_year": "2022/2023",
        "courses": unizik_courses_,
        "require olevel": False,
        "total post utme": 100,
        "aggr docs": get_aggr_docs(8),
    },
    {
        "id": 9,
        "name": "University of Benin (UNIBEN)",
        "about": about_uni[8],
        "aggr_year": "2022/2023",
        "courses": uniben_courses_,
        "require olevel": False,
        "total post utme": 100,
        "aggr docs": get_aggr_docs(9),
    },
    {
        "id": 10,
        "name": "Federal University Oye Ekiti (FUOYE)",
        "about": about_uni[9],
        "aggr_year": None,
        "courses": fuoye_courses_,
        "require olevel": None,
        "total post utme": None,
        "aggr docs": get_aggr_docs(10),
    },
]

# for uni in universities:
#     print(uni["aggr docs"])
# print(universities[1]["aggr docs"])
