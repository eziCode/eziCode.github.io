import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import ContactForm from "@/components/contact_form";

const projects = [
	{
		title: "Amazon Alexa Skill: Medical Tracker",
		description: "Developed an Alexa skill to track medication schedules and medical activities.",
		link: "https://your-portfolio-link.com",
		image: "images/my_med_tracker_icon.png",
	},
	{
		title: "FIRST Robotics Competition Programming w/ Team 4096",
		description: "Coded 2024 & 2025 robots for FRC Team 4096: Ctrl-Z",
		links: [
			{ label: "Robot 2025 Repo", url: "https://github.com/CtrlZ-FRC4096/Robot-2025" },
			{ label: "Robot 2024 Repo", url: "https://github.com/CtrlZ-FRC4096/Robot-2024" },
		],
		image: "images/frc_4096_icon.png",
	},
];

export default function HomePage() {
	const [showContact, setShowContact] = useState(false);

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 text-gray-800 flex flex-col relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl animate-spin-slow"></div>
			</div>
			
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center text-center py-16 px-4 relative z-10">
				<div className="animate-fade-in-up">
					<h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
						Hi, I'm Ezra Akresh.
					</h1>
					<p className="text-2xl mb-8 text-gray-700 animate-fade-in-up delay-300">
						Software Developer • Designer • Problem Solver
					</p>
				</div>
				<div className="flex gap-6 animate-fade-in-up delay-500">
					<a
						href="https://github.com/eziCode"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-xl
             hover:from-purple-700 hover:to-blue-700 hover:shadow-2xl hover:scale-105
             active:scale-95 transform transition-all duration-300 ease-out
             focus:ring-4 focus:ring-purple-300 focus:outline-none px-8 py-3 text-lg font-semibold"
						>
							View Projects
						</Button>
					</a>
					<a
						href="/ezra_cv.pdf"
						download
					>
						<Button
							className="bg-white text-purple-600 border-2 border-purple-600 shadow-xl
             hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent hover:shadow-2xl hover:scale-105
             active:scale-95 transform transition-all duration-300 ease-out
             focus:ring-4 focus:ring-purple-300 focus:outline-none px-8 py-3 text-lg font-semibold"
							variant="outline"
						>
							Download Resume
						</Button>
					</a>
				</div>
			</section>

			{/* About Section */}
			<section className="max-w-4xl mx-auto py-12 px-4 text-center relative z-10">
				<div className="animate-fade-in-up">
					<h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
						About Me
					</h2>
					<p className="text-xl text-gray-700 leading-relaxed bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
						I'm a developer who's passionate about creating and helping people. I specialize in back-end development but have experience working with a variety of languages and frameworks.
					</p>
				</div>
			</section>

			{/* Projects Section */}
			<section className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm py-12 px-4 relative z-10">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-semibold text-center mb-12 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
						Featured Projects
					</h2>
					<div className="flex flex-col md:flex-row justify-center items-center md:space-x-12 space-y-8 md:space-y-0">
						{projects.map((project, idx) => (
							<Card
								key={idx}
								className="w-[350px] rounded-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl hover:scale-105 transform transition-all duration-500 ease-out group overflow-hidden"
							>
								<CardContent className="p-6 flex flex-col items-center relative">
									<div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
									<div className="mb-6 w-full h-[220px] flex items-center justify-center relative z-10">
										<img
											src={project.image}
											alt={project.title}
											className="max-h-full max-w-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
									<h3 className="text-xl font-semibold mb-3 text-center text-gray-800 relative z-10">
										{project.title}
									</h3>
									<p className="text-sm text-gray-600 mb-6 text-center relative z-10">
										{project.description}
									</p>
									{/* Conditionally render multiple links if present */}
									{project.links ? (
										<div className="flex gap-3 w-full justify-center relative z-10">
											{project.links.map((link, i) => (
												<a
													key={i}
													href={link.url}
													target="_blank"
													rel="noopener noreferrer"
													className="flex-1"
												>
													<Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-xl px-4 py-3 transition-all duration-300 w-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform">
														{link.label}
													</Button>
												</a>
											))}
										</div>
									) : (
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											className="w-full flex justify-center relative z-10"
										>
											<Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-xl px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform">
												View Project
											</Button>
										</a>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section className="py-12 px-4 max-w-4xl mx-auto text-center relative z-10">
				<h2 className="text-4xl font-semibold mb-10 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
					Skills & Tools
				</h2>
				<div className="flex flex-wrap justify-center gap-4 text-sm">
					{[
						"JavaScript",
						"SQL",
						"Kotlin",
						"Python",
						"Swift",
						"C++"
					].map((skill, index) => (
						<span
							key={skill}
							className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-110 transform transition-all duration-300 cursor-default animate-fade-in-up"
							style={{ animationDelay: `${index * 100}ms` }}
						>
							{skill}
						</span>
					))}
				</div>
			</section>

			{/* Contact Section */}
			{/* Contact Section */}
			<section className="bg-gradient-to-br from-indigo-100/80 to-purple-100/80 backdrop-blur-sm py-12 px-4 text-center relative z-10">
				<h2 className="text-4xl font-semibold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
					Get In Touch
				</h2>
				<p className="mb-8 text-gray-700 text-lg">Let's build something together.</p>
				<div className="flex justify-center gap-8 mb-8">
					<a
						href="mailto:ezraakresh@gmail.com"
						className="text-indigo-600 hover:text-purple-600 transform hover:scale-125 transition-all duration-300 p-3 rounded-full bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl"
					>
						<Mail size={28} />
					</a>
					<a
						href="https://github.com/ezraakresh"
						className="text-indigo-600 hover:text-purple-600 transform hover:scale-125 transition-all duration-300 p-3 rounded-full bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl"
					>
						<Github size={28} />
					</a>
					<a
						href="https://www.linkedin.com/in/ezra-akresh-638358314/"
						className="text-indigo-600 hover:text-purple-600 transform hover:scale-125 transition-all duration-300 p-3 rounded-full bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-xl"
					>
						<Linkedin size={28} />
					</a>
				</div>
				<Button
					className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-xl
					hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl hover:scale-105
					active:scale-95 transform transition-all duration-300 ease-out
					focus:ring-4 focus:ring-indigo-300 focus:outline-none px-8 py-3 text-lg font-semibold"
					onClick={() => setShowContact(true)}
				>
					Send a Message
				</Button>
				{showContact && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
						<div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-in">
							<ContactForm onClose={() => setShowContact(false)} />
						</div>
					</div>
				)}
			</section>			{/* Footer */}
			<footer className="text-center text-sm text-gray-500 py-6 bg-white/60 backdrop-blur-sm relative z-10">
				© {new Date().getFullYear()} Ezra Akresh. All rights reserved.
			</footer>
		</div>
	);
}
