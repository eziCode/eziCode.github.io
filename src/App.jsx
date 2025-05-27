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
		<div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 text-gray-800 flex flex-col">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center text-center py-12 px-4">
				<h1 className="text-5xl font-bold mb-4">Hi, I'm Ezra Akresh.</h1>
				<p className="text-xl mb-6">
					Full-Stack Developer • Designer • Problem Solver
				</p>
				<div className="flex gap-4">
					<a
						href="https://github.com/eziCode"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							className="bg-black text-white border border-black shadow-none
             hover:bg-white hover:text-black hover:border-black
             active:bg-black active:text-white active:border-black
             focus:bg-black focus:text-white focus:border-black
             focus:ring-0 focus:outline-none transition-colors"
						>
							View Projects
						</Button>
					</a>
					<a
						href="/ezra_cv.pdf"
						download
					>
						<Button
							className="bg-white text-black border border-black shadow-none
             hover:bg-black hover:text-white hover:border-black
             active:bg-black active:text-white active:border-black
             focus:bg-black focus:text-white focus:border-black
             focus:ring-0 focus:outline-none transition-colors"
							variant="outline"
						>
							Download Resume
						</Button>
					</a>
				</div>
			</section>

			{/* About Section */}
			<section className="max-w-4xl mx-auto py-8 px-4 text-center">
				<h2 className="text-3xl font-semibold mb-4">About Me</h2>
				<p className="text-lg text-gray-600">
					I'm a developer who's passionate about creating and helping people. I specialize in back-end development but have experience working with a variety of languages and frameworks.
				</p>
			</section>

			{/* Projects Section */}
			<section className="bg-white py-8 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl font-semibold text-center mb-10">
						Featured Projects
					</h2>
					<div className="flex flex-col md:flex-row justify-center items-center md:space-x-12 space-y-8 md:space-y-0">
						{projects.map((project, idx) => (
							<Card
								key={idx}
								className="w-[350px] rounded-xl shadow-md border border-gray-200"
							>
								<CardContent className="p-6 flex flex-col items-center">
									<div className="mb-4 w-full h-[220px] flex items-center justify-center">
										<img
											src={project.image}
											alt={project.title}
											className="max-h-full max-w-full object-cover rounded"
										/>
									</div>
									<h3 className="text-xl font-semibold mb-2 text-center">
										{project.title}
									</h3>
									<p className="text-sm text-gray-600 mb-4 text-center">
										{project.description}
									</p>
									{/* Conditionally render multiple links if present */}
									{project.links ? (
										<div className="flex gap-2 w-full justify-center">
											{project.links.map((link, i) => (
												<a
													key={i}
													href={link.url}
													target="_blank"
													rel="noopener noreferrer"
													className="flex-1"
												>
													<Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-3 py-2 transition-colors w-full">
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
											className="w-full flex justify-center"
										>
											<Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-5 py-2 transition-colors">
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
			<section className="py-8 px-4 max-w-4xl mx-auto text-center">
				<h2 className="text-3xl font-semibold mb-8">Skills & Tools</h2>
				<div className="flex flex-wrap justify-center gap-4 text-sm">
					{[
						"JavaScript",
						"SQL",
						"Kotlin",
						"Python",
						"Swift",
						"C++"
					].map((skill) => (
						<span
							key={skill}
							className="bg-gray-200 px-4 py-2 rounded-full"
						>
							{skill}
						</span>
					))}
				</div>
			</section>

			{/* Contact Section */}
			<section className="bg-gray-100 py-8 px-4 text-center">
				<h2 className="text-3xl font-semibold mb-4">Get In Touch</h2>
				<p className="mb-6 text-gray-600">Let’s build something together.</p>
				<div className="flex justify-center gap-6 mb-4">
					<a
						href="mailto:ezraakresh@gmail.com"
						className="text-gray-700 hover:text-gray-900"
					>
						<Mail />
					</a>
					<a
						href="https://github.com/ezraakresh"
						className="text-gray-700 hover:text-gray-900"
					>
						<Github />
					</a>
					<a
						href="https://www.linkedin.com/in/ezra-akresh-638358314/"
						className="text-gray-700 hover:text-gray-900"
					>
						<Linkedin />
					</a>
				</div>
				<Button
					className="bg-black text-white border border-black shadow-none
					hover:bg-white hover:text-black hover:border-black
					active:bg-black active:text-white active:border-black
					focus:bg-black focus:text-white focus:border-black
					focus:ring-0 focus:outline-none transition-colors"
					onClick={() => setShowContact(true)}
				>
					Send a Message
				</Button>
				{showContact && (
					<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
						<div className="bg-white rounded-xl shadow-lg max-w-md w-full">
							<ContactForm onClose={() => setShowContact(false)} />
						</div>
					</div>
				)}
			</section>

			{/* Footer */}
			<footer className="text-center text-sm text-gray-500 py-4">
				© {new Date().getFullYear()} Ezra Akresh. All rights reserved.
			</footer>
		</div>
	);
}
