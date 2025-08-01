import React, { useState } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./experience.css";

const Experience = () => {
  const allExperiences = [
    {
      type: "Volunteer",
      title: "Rexall Volunteer Assistant",
      company: "Rexall",
      duration: "August 2021 - August 2021",
      description: (
        <ul>
          <li><strong>Accurately filled and labeled an average of 50+ prescriptions per shift</strong>, ensuring compliance with pharmacy protocols and patient safety standards.</li>
          <li><strong>Replenished and organized 200+ medications and products weekly</strong>, maintaining stock levels and improving workflow efficiency for pharmacists.</li>
          <li><strong>Assisted 20+ patients per shift with inquiries and over-the-counter purchases</strong>, providing courteous and knowledgeable customer service.</li>
        </ul>
      )
    },
    {
      type: "Volunteer",
      title: "Food Bank Volunteer",
      company: "St. Mary's Food Bank",
      duration: "March 2022 - May 2022",
      description: (
        <ul>
          <li><strong>Arranged and stocked shelves for 50+ families per shift</strong>, improving accessibility and reducing wait times during distribution.</li>
          <li>Arranged and stocked shelves, improving accessibility and reducing wait times during distribution.</li>
          <li><strong>Communicated empathetically with 5+ families per shift</strong>, assessing needs and customizing food orders to best fit their circumstances and dietary restrictions.</li>
        </ul>
      )
    },
    {
      type: "Work",
      title: "Kitchen Worker",
      company: "McDonald's",
      duration: "July 2022 - May 2022",
      description: (
        <ul>
          <li><strong>Organized events</strong>, to support community initiatives and raise awareness.</li>
          <li><strong>Managed volunteer teams</strong>, ensuring smooth execution of activities.</li>
          <li><strong>Secured funding</strong>, by collaborating with local businesses and sponsors.</li>
        </ul>
      )
    },
    {
      type: "Volunteer",
      title: "Summer Camp Volunteer",
      company: "Ontario Science Centre",
      duration: "July 2023 - July 2023",
      description: (
        <ul>
          <li><strong>Supervised and cared for 30+ children daily</strong>, ensuring a safe and engaging environment.</li>
          <li><strong>Planned and executed 10+ structured activities per week</strong>, adhering to a strict schedule and minimizing risks.</li>
          <li><strong>Collaborated with a team of 10+ volunteers and staff</strong> to manage camp operations smoothly and respond to unexpected situations effectively.</li>
        </ul>
      )
    },
    {
      type: "Volunteer",
      title: "Youth Volunteer",
      company: "Community Living Mississauga",
      duration: "August 2023 - August 2023",
      description: (
        <ul>
          <li><strong>Built positive relationships with and supported teens with disabilities</strong>, fostering inclusion and emotional well-being through daily social interaction.</li>
          <li><strong>Engaged participants in recreational and skill-building activities weekly</strong>, promoting confidence and enjoyment in a safe, supportive environment.</li>
        </ul>
      )
    },
    {
      type: "Work",
      title: "Software Engineering Intern",
      company: "Royal Bank of Canada",
      duration: "July 2024 - August 2024",
      description: (
        <ul>
          <li><strong>Developed a program to migrate 14 million real client files</strong> to a new system using Python, Selenium, and recursive functions.</li>
          <li><strong>Saved an estimated $1,500,000 in labour costs and $10,000/month in compliance costs</strong> by keeping client history easily accessible to the insurance department.</li>
          <li>Utilized Python and Java to automate processes and improve system efficiency.</li>
        </ul>
      )
    },
    {
      type: "Work",
      title: "Software Engineering Intern",
      company: "Royal Bank of Canada",
      duration: "July 2025 - August 2025",
      description: (
        <ul>
          <li>Developed CHIP (Client History Insight Portal) which highlights clients’ previous interactions with asynchronous chats, invest banking platforms, and mobile banking platforms to help an agent anticipate the need of a client.</li>
          <li><strong>Estimated to save 2 min per call for an agent. Total estimate savings over $1,000,000.</strong></li>
          <li>Developed and optimized software applications for Branch Services Technologies at Royal Bank of Canada.</li>
        </ul>
      )
    },
    {
      type: "Research",
      title: "How the camber and thickness positions affect the lift produced at different angles of attack.",
      duration: "September 2023 - August 2024",
      description: (
        <div>
          <ul>
            <li>Measured the camber/thickness positions of an airfoil and its impact on lift.</li>
            <li><strong>3D printed airfoils for wind tunnel testing.</strong></li>
            <li>Created a custom wind tunnel and custom measuring tools to be able to conduct the research.</li>
          </ul>
          {/* <a 
            href="/Research_camber_position.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "blue", textDecoration: "underline", display: "block", marginTop: "10px" }}
          >
            View Research PDF
          </a> */}
        </div>
      )
    },
    {
      type: "Research",
      title: "How does an airfoil’s maximum thickness affect the lift versus drag produced at various angles of attack?",
      duration: "September 2024 - March 2025",
      description: (
        <div>
          <ul>
            <li><strong>Designed and conducted controlled experiments</strong> using 3D-printed NACA airfoils of varying maximum thickness (6–21%) to systematically measure lift and drag forces across angles of attack from -5° to 60°, maintaining constant wing area, camber, airspeed, and air density.</li>
            <li><strong>Collected and analyzed quantitative data</strong> by recording lift and drag forces with a precision balance, calculating lift-to-drag ratios, and plotting trends to evaluate how increasing thickness influenced aerodynamic performance and stall behavior.</li>
            <li><strong>Applied fluid dynamics principles</strong> (Bernoulli’s Principle, Newton’s Third Law, boundary layer theory) to interpret results, validate hypotheses, and explain observed relationships between airfoil geometry, lift generation, drag production, and efficiency.</li>
          </ul>
          <a 
            href="/research_airfoil_thickness.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "blue", textDecoration: "underline", display: "block", marginTop: "10px" }}
          >
            View Research PDF
          </a>
        </div>
      )
    },
    {
      type: "Research",
      title: "An Investigation on the Effect of Chain Length and Hydroxyl Position on the LogP and Solvent Accessible Surface Area of Alcohols.",
      duration: "December 2024 - February 2025",
      description: (
        <div>
          <ul>
            <li><strong>Investigated the molecular factors influencing solubility and absorption</strong> by analyzing how alcohol chain length and hydroxyl group position affect solvent accessible surface area (SASA) and the logarithm of the partition coefficient (logP), a predictor of biological membrane permeability.</li>
            <li><strong>Conducted computational modeling using chemical databases and molecular visualization tools</strong> (PubChem, ALOGPS, ChemSpider, Chemicalize, PyMol) to collect and process data for 36 alcohols (C1–C11) across multiple hydroxyl positions, ensuring control over variables such as branching and solvent radius.</li>
            <li><strong>Established clear quantitative relationships</strong>, finding strong positive linear correlations between chain length and both logP (R² {" > "} 0.99) and SASA, as well as negative decaying correlations between hydroxyl position and both metrics, revealing that longer chains and terminal hydroxyl positions increase non-polarity and solvent accessibility, thereby enhancing lipophilicity.</li>
          </ul>
          <a 
            href="/chem_research.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "blue", textDecoration: "underline", display: "block", marginTop: "10px" }}
          >
            View Research PDF
          </a>
        </div>
      )
    },
    {
      type: "Research",
      title: "Investigating the relationship between the outer pipe radius and the time it takes for a magnet to fall through it.",
      duration: "December 2024 - February 2025",
      description: (
        <div>
          <ul>
            <li><strong>Modeled the effect of eddy currents on magnet motion</strong> by deriving a theoretical relationship between pipe thickness and fall time using electromagnetic induction principles (Faraday’s Law, Lenz’s Law) and Newtonian mechanics, predicting a linear correlation between fall time and the reciprocal of the outer radius cubed.</li>
            <li><strong>Designed and conducted a controlled experiment</strong> using aluminum pipes of varying outer radii and high-speed video analysis (60 fps) to quantify magnet fall times and validate theoretical predictions.</li>
            <li><strong>Confirmed theoretical accuracy through data analysis</strong>, obtaining a strong linear correlation (R² = 0.9861) and calculating an inner pipe radius (9 ± 1 mm) that aligned closely with the measured value (8 ± 0.05 mm), demonstrating the validity of the derived model.</li>
          </ul>
          <a 
            href="/physics_research.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "blue", textDecoration: "underline", display: "block", marginTop: "10px" }}
          >
            View Research PDF
          </a>
        </div>
      )
    },
    {
      type: "Research",
      title: "Modelling Diffusion Across Red Blood Cells of Different Sizes and Elongations",
      duration: "April 2025 - March 2025",
      description: (
        <div>
          <ul>
            <li><strong>Derived a diffusion model using Fick’s law</strong> to mathematically represent oxygen transfer into red blood cells (RBCs), incorporating biological constants (e.g., membrane thickness, oxygen concentrations) and solving a first-order linear differential equation.</li>
            <li><strong>Developed mathematical functions to model RBC geometry</strong>, using holographic data and fitting quartic and specialized functions to represent RBC profiles, then applying horizontal and vertical dilations to simulate size variations and pathological deformations.</li>
            <li><strong>Calculated volumes, surface areas, and diffusion rates</strong> of circular and elongated RBCs using advanced calculus techniques (shell method, double integrals, numerical integration with Python), demonstrating how RBC shape and size impact oxygen diffusion efficiency.</li>
          </ul>
          <a 
            href="/math_research.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: "blue", textDecoration: "underline", display: "block", marginTop: "10px" }}
          >
            View Research PDF
          </a>
        </div>
      )
    }
  ];

  const [filter, setFilter] = useState("All");

  const filteredExperiences = filter === "All"
    ? [...allExperiences].reverse()
    : [...allExperiences].filter(exp => exp.type === filter).reverse();

  return (
    <div className="experience-section">
      <h1 className="experience-title">Experience</h1>
      <div className="experience-filters">
        <button onClick={() => setFilter("All")} className={filter === "All" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("Work")} className={filter === "Work" ? "active" : ""}>Work</button>
        <button onClick={() => setFilter("Volunteer")} className={filter === "Volunteer" ? "active" : ""}>Volunteer</button>
        <button onClick={() => setFilter("Research")} className={filter === "Research" ? "active" : ""}>Research</button>
      </div>
      <VerticalTimeline>
        {filteredExperiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            date={exp.duration}
            iconStyle={{ background: "#555", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">{exp.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{exp.company}</h4>
            {exp.description}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;
