from universities import universities


def list_universities_offering_course(required_course, universities):
    """
    This function lists out all the universities offering a particular course
    """
    universities_offering_the_course = []
    for university in universities:
        if university["courses"] != None:
            if required_course in university["courses"]:
                universities_offering_the_course.append(university["name"])
    return universities_offering_the_course

course = input('enter the course you want to study: ').upper()

uni_list = (list_universities_offering_course(course, universities))
if uni_list:
    for university in uni_list:
        print(university)
else:
    print("There are no universities currently offering the course")





#password ->>>>>>> ly89ly89 for mysql user 'mortti'

