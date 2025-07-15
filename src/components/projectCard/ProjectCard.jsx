import React from "react";
import { FaGithub } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { TbServer2 } from "react-icons/tb";

const ProjectCard = ({ data }) => {
    return (
        <div className="bg-gradient-to-br from-[#fcefee] to-[#e3e4f8] p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-500 group overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-5 items-center">
                {/* 🖼 Image */}
                <div className="col-span-1 md:col-span-2 w-full overflow-hidden rounded-xl">
                    <img
                        src={data?.image}
                        alt="Project Screenshot"
                        className="w-full h-[180px] object-cover rounded-xl transform group-hover:scale-105 transition duration-500"
                    />
                </div>

                {/* 📄 Description */}
                <div className="col-span-1 md:col-span-5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:300%_300%]">
                        {data?.name}
                    </h1>
                    <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                        {data?.shortDescription}
                    </p>

                    {/* 💻 Tech Stack */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {data?.techStack?.map((tech, i) => (
                            <span
                                key={i}
                                className="text-xs sm:text-sm bg-gradient-to-r from-[#bc34cc] to-[#ff9f07] border border-gray-300 text-white px-2 py-1 rounded-md shadow-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 🔗 Action Buttons */}
                <div className="col-span-1 flex md:flex-col gap-3 justify-center items-center mt-4 md:mt-0">
                    <a
                        href={data?.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        title="Live Site"
                        className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-2 rounded-full shadow-md hover:scale-110 transition duration-300"
                    >
                        <IoIosArrowDropright size={20} />
                    </a>

                    <a
                        href={data?.clientRepo}
                        target="_blank"
                        rel="noreferrer"
                        title="Client Repo"
                        className="bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 hover:scale-110 transition duration-300"
                    >
                        <FaGithub size={18} />
                    </a>

                    <a
                        href={data?.serverRepo}
                        target="_blank"
                        rel="noreferrer"
                        title="Server Repo"
                        className="bg-blue-800 text-white p-2 rounded-full shadow-md hover:bg-blue-700 hover:scale-110 transition duration-300"
                    >
                        <TbServer2 size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
