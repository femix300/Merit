import axios from 'axios'


const BASE_URL = 'http://127.0.0.1:5000'

//Fetch universities by course
export const fetchUniversitiesByCourse = async (course_name) => {
    try {
        const response = await axios.get(`${BASE_URL}/universities/courses`, {
            params: { course_name }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching universities by course:', error)
        throw error
    }
}

//Fetch recommendations based on course, UTME score, etc

export const fetchCourseRecommendations = async (course_name, utme_score, post_utme_score, grades) => {
    try {
        const response = await axios.post(`${BASE_URL}/evaluations/recommendations`, {
            course_name,
            utme_score,
            post_utme_score,
            grades,
        })
        return response.data
    } catch (error) {
        console.error('Error fetching course recommendations:', error)
        throw error
    }
}

// Fetch post-UTME requirements
export const fetchPostUtmeRequirements = async (course_name, utme_score, grades) => {
    try {
        const response = await axios.get(`${BASE_URL}/post-utme/requirements`, {
            params: { course_name, utme_score, grades, }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching post-UTME requirements:', error)
        throw error
    }
}

// Fetch course aggregate
export const fetchCourseAggregate = async (course_name) => {
    try {
        const response = await axios.get(`${BASE_URL}/aggregates/requirements`, {
            params: { course_name, university_name: "Obafemi Awolowo University (OAU)" }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching course aggregate:', error);
        throw error;
    }
};

// Fetch university description
export const fetchUniversityDescription = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/universities/description`);
        return response.data;
    } catch (error) {
        console.error('Error fetching university description:', error);
        throw error;
    }
};

// Fetch list of courses by university
export const fetchCoursesByUniversity = async (university_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/universities/list/courses`, {
            params: { university_id },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching courses by university:', error);
        throw error;
    }
};

// Fetch faculties and their courses
export const fetchFacultiesAndCourses = async (university_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/universities/faculties/courses`, {
            params: { university_id },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching faculties and courses:', error);
        throw error;
    }
};

