from n_unilogics.uniben import Uniben
from n_unilogics.unizik import Unizik
from n_unilogics.futa import Futa
from n_unilogics.unn import Unn
from n_unilogics.unilag import Unilag
from n_unilogics.oau import Oau
from n_unilogics.ui import Ui

from universities import universities

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

# maps university names with their mysql classes
uni_classes = {
    "University of Ibadan": UiCourses,
    "University of Lagos": UnilagCourses,
    "University of Nigeria": UnnCourses,
    "Obafemi Awolowo University": OauCourses,
    "Federal University of Technology Akure": FutaCourses,
    "Nnamdi Azikiwe University": UnizikCourses,
    "University of Benin": UnibenCourses,
}

# maps universities names and id's
uni_dict = {uni['name']: uni['id'] for uni in universities}

# maps university classes with their id's
uni_classes_logics = {
    "1": Ui,
    "2": Unilag,
    "3": Unn,
    "4": Oau,
    "7": Futa,
    "8": Unizik,
    "9": Uniben,
}


def create_class_instance(uni_id):
    uni_id_str = str(uni_id)
    _class = uni_classes_logics[uni_id_str]
    _class_instance = _class(uni_id)
    return _class_instance
