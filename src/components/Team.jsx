import React from "react";
import "./team.css";
import user1 from '../assets/user1.jpg';
import user2 from '../assets/user2.jpg';
import user3 from '../assets/user3.jpg'

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Jane Doe",
      image: user1, // Replace with the correct image path
      title: "Web Developer",
    },
    {
      name: "John Smith",
      image: user2, // Replace with the correct image path
      title: "UI/UX Designer",
    },
    {
      name: "Mike Johnson",
      image: user3, // Replace with the correct image path
      title: "Project Manager",
    },
  ];

  return (
    <section className="our-team">
      <div className="container">
        <h2 className="team-heading">Our Team</h2>
        <p className="team-description">
          Sed quis nisi nisi. Proin consectetur porttitor dui sit amet viverra. Fusce sit amet lorem faucibus, vestibulum ante in, pharetra ante.
        </p>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img
                src={member.image}
                alt={member.name}
                className="team-member-img"
              />
              <h3 className="member-name">{member.name}</h3>
              <p className="member-title">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
