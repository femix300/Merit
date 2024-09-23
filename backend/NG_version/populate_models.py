from universities import universities as universities_dict
from about_universities import about_uni as about_uni_dict
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

from sqlalchemy.exc import IntegrityError

from models import(
    Universities,
    Session,
    session,
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

# a helper function that helps create courses table for each university
def insert_uni_courses(session, uni_name, uni_class, courses_dict):
    try:
        university = session.query(
            Universities).filter_by(name=uni_name).first()
        if not university:
            print(f"University {uni_name} not found in the database.")
            return

        for course_name, course_data in courses_dict.items():
            course = uni_class(
                name=course_name,
                faculty=course_data['faculty'],
                aggregate=course_data['aggregate'],
                university_id=university.id  # Set university_id for each course
            )

            session.add(course)

        session.commit()
        print(f"Successfully inserted courses for {uni_name}.")
    except IntegrityError as e:
        session.rollback()
        print(
            f"Failed to insert courses for {uni_name} due to IntegrityError: {e.orig}")
    except Exception as e:
        session.rollback()
        print(f"An error occurred while inserting courses for {uni_name}: {e}")


# create a courses table for each university
uni_details_dict = {
    "University of Lagos (UNILAG)": (UnilagCourses, unilag_courses_),
    "Obafemi Awolowo University (OAU)": (OauCourses, oau_courses_),
    "University of Benin (UNIBEN)": (UnibenCourses, uniben_courses_),
}

# Iterate over the dictionary and call the function
for university, (course_class, course_data) in uni_details_dict.items():
    if course_data is not None:
        insert_uni_courses(Session(), university, course_class, course_data)

