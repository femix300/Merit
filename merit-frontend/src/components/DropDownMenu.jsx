import { Link } from 'react-router-dom';

const DropdownMenu = () => {
    return (
        <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
            <ul className="flex flex-col space-y-1">
                <li className="px-4 py-2 text-gray-700 hover:bg-[#f5f5f5] transition duration-200">
                    <Link to="/service/evaluate-course">Evaluate Course Eligibility</Link>
                </li>
                <li className="px-4 py-2 text-gray-700 hover:bg-[#f5f5f5] transition duration-200">
                    <Link to="/service/course-faculty">Find Course Faculty</Link>
                </li>
                <li className="px-4 py-2 text-gray-700 hover:bg-[#f5f5f5] transition duration-200">
                    <Link to="/service/post-utme">Post-UTME Requirements</Link>
                </li>
                <li className="px-4 py-2 text-gray-700 hover:bg-[#f5f5f5] transition duration-200">
                    <Link to="/service/aggregate-requirements">Course Aggregate Requirements</Link>
                </li>
                <li className="px-4 py-2 text-gray-700 hover:bg-[#f5f5f5] transition duration-200">
                    <Link to="/service/university-description">University Descriptions</Link>
                </li>
                <li className="px-4 py-2 text-gray-700 hover:bg-[#f5f5f5] transition duration-200">
                    <Link to="/service/university-courses">List of University Courses</Link>
                </li>
            </ul>
        </div>
    );
};

export default DropdownMenu;
