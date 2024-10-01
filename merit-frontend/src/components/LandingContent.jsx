import headerImage from '../assets/header-1.png'; 
const LandingContent = () => {
    return (
        <section className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center">
                <h1 className="text-4xl md:text-5xl font-normal text-[#0f1e6a] mb-4">
                    Admission Process<br />
                    <span className="font-bold">Made Seamless</span><br />
                    <span className="font-bold text-[#5c48ee]">with Merit</span>
                </h1>
                <p className="text-gray-700 mb-6">
                    Merit was built to aid students in their admission process into tertiary institutions.
                    It helps students make the right choices when it comes to matters pertaining to courses and institutions. 
                    Not only does it do this in a very short time, but it also makes the whole process far easier and less stressful.
                </p>
                <form className="flex items-center space-x-2">
                    <input 
                        type="text" 
                        placeholder="Enter your dream university" 
                        className="px-4 py-2 w-full max-w-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5c48ee]"
                    />
                    <button type="submit" className="px-4 py-2 bg-[#5c48ee] text-white rounded-md hover:bg-[#0f1e6a] transition duration-300">
                        Search University
                    </button>
                </form>
            </div>
            <div className="relative">
                <img src={headerImage} alt="header" className="w-4/5 h-auto mx-auto mb-4 rounded-md" />
                <div className="absolute bottom-8 left-4 bg-white bg-opacity-90 p-4 rounded-md shadow-md">
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Determine Eligibility</li>
                        <li>Predict Required Score</li>
                        <li>Study at your dream University</li>
                        <li>Shape your Future</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default LandingContent;