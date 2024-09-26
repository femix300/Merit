from unilogics.uniben import Uniben
from unilogics.unizik import Unizik
from unilogics.futa import Futa
from unilogics.unn import Unn
from unilogics.unilag import Unilag
from unilogics.oau import Oau
from unilogics.ui import Ui
import pyinputplus as pyip
import sys
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from universities import universities

# more details to be added to mysql database for easy querying
# i could have a column fpr pass mark(post_utme)
uni_dict = {uni['name']: uni['id'] for uni in universities}
not_support_post_utme = [3, 5, 6, 10]
utme_postutme_olevel = [2, 4]
utme_olevel = [3]
grades_needed = {
    2: 5,
    3: 4,
    4: 5
}

uni_classes = {
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
    _class = uni_classes[uni_id_str]
    _class_instance = _class(uni_id)
    return _class_instance