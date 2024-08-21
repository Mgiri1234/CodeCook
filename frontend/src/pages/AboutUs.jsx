import React from 'react';

const AboutUs = () => {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-4xl font-bold mb-5">About Us</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-3">Welcome to <strong className="font-bold">AlgoForces</strong> – your ultimate destination for honing algorithmic skills and acing coding challenges!</h2>
        
        <h3 className="text-xl font-semibold mb-2">Who I Am</h3>
        <p className="mb-3">AlgoForces is a cutting-edge online judge platform dedicated to helping programmers of all levels improve their problem-solving abilities. Whether you're a beginner taking your first steps in coding or an experienced developer looking to sharpen your skills, AlgoForces provides the perfect arena for you to practice, compete, and grow.
          AlgoForces was pioneered by Md Kamran, a B.Tech. student from IIT Patna, who is passionate about coding and education. With a vision to create a platform that would inspire and empower coders to reach their full potential, Md Kamran is committed to providing a world-class learning experience for all users.
        </p>
        
        <h3 className="text-xl font-semibold mb-2">My Mission</h3>
        <p className="mb-2">At AlgoForces, my mission is to:</p>
        <ul className="list-disc list-inside mb-3">
          <li><strong className="font-semibold">Empower Learners:</strong> I strive to make learning algorithms and data structures accessible and engaging for everyone.</li>
          <li><strong className="font-semibold">Foster a Community:</strong> I aim to build a vibrant community where coders can collaborate, compete, and support each other in their learning journeys.</li>
          <li><strong className="font-semibold">Promote Excellence:</strong> By offering a wide range of challenges and contests, I encourage users to strive for excellence and continuously push their limits.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">What I Offer</h3>
        <ul className="list-disc list-inside mb-3">
          <li><strong className="font-semibold">Diverse Problem Set:</strong> My extensive library features problems ranging from basic to advanced, covering a wide array of topics including sorting, searching, dynamic programming, graph theory, and more.</li>
          <li><strong className="font-semibold">Real-time Judging:</strong> Submit your solutions and receive instant feedback with my real-time judging system. My automated environment ensures fair and accurate evaluation of your code.</li>
          <li><strong className="font-semibold">Contests and Competitions:</strong> Participate in regular contests and competitions to test your skills against other programmers. Climb the leaderboards and earn recognition for your coding prowess.</li>
          <li><strong className="font-semibold">Learning Resources:</strong> Access tutorials, articles, and discussions to deepen your understanding of algorithms and improve your coding techniques.</li>
          <li><strong className="font-semibold">Community Interaction:</strong> Engage with fellow coders through my forums and discussion boards. Share insights, ask questions, and collaborate on challenging problems.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Why Choose AlgoForces?</h3>
        <ul className="list-disc list-inside mb-3">
          <li><strong className="font-semibold">User-Friendly Interface:</strong> My platform is designed to be intuitive and easy to navigate, allowing you to focus on solving problems without any distractions.</li>
          <li><strong className="font-semibold">Comprehensive Analytics:</strong> Track your progress with detailed analytics and performance metrics. Identify your strengths and areas for improvement to optimize your learning experience.</li>
          <li><strong className="font-semibold">Supportive Environment:</strong> I believe in fostering a supportive and inclusive environment where everyone is encouraged to learn and grow. I am always here to help you on your coding journey.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Join Me</h3>
        <p className="mb-3">Whether you're preparing for coding interviews, participating in competitive programming, or simply looking to enhance your algorithmic thinking, AlgoForces is the place for you. Join me today and become part of a dynamic community of passionate coders.</p>
        
        <h3 className="text-xl font-semibold mb-2">Contact Me</h3>
        <p className="mb-3">Have questions or need assistance? Reach out to me at <a href="mailto:mdkamran200404@gmail.com" className="text-blue-500 hover:text-blue-700">support@algoforces.com</a>. I'm here to help!</p>
      </section>
      
      <footer>
        <p className="text-lg font-semibold">Together, let's code the future. Welcome to AlgoForces!</p>
      </footer>
    </div>
  );
};

export default AboutUs;