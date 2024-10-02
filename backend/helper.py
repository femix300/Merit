"""A helper file"""
from unilogics.uniben import Uniben
from unilogics.unizik import Unizik
from unilogics.futa import Futa
from unilogics.unn import Unn
from unilogics.unilag import Unilag
from unilogics.oau import Oau
from unilogics.ui import Ui
from universities import universities


uni_dict = {uni['name']: uni['id'] for uni in universities}
not_support_post_utme = [3]


utme_postutme = [1, 7, 8, 9]
utme_postutme_olevel = [2, 4]
utme_olevel = [3]

grades_needed = {
    2: 5,
    3: 4,
    4: 5
}
# for views.py
uni_classes = {
    "1": Ui,
    "2": Unilag,
    "3": Unn,
    "4": Oau,
    "7": Futa,
    "8": Unizik,
    "9": Uniben,
}

# creates a class instance
def create_class_instance(uni_id):
    uni_id_str = str(uni_id)
    _class = uni_classes[uni_id_str]
    _class_instance = _class(uni_id)
    return _class_instance
