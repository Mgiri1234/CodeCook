import React from 'react';

const ContactUs = () => {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-4xl font-bold mb-5">Contact Us</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-3">We'd Love to Hear From You!</h2>
        <p className="mb-3">At AlgoForces, we value your feedback and are here to assist you with any questions or concerns you may have. Feel free to reach out to us through any of the following methods:</p>
        
        <h3 className="text-xl font-semibold mb-2">Email</h3>
        <p className="mb-3">For general inquiries and support, please email us at: <a href="mailto:support@algoforces.com" className="text-blue-500 hover:text-blue-700">support@algoforces.com</a></p>
        
        <h3 className="text-xl font-semibold mb-2">Social Media</h3>
        <p className="mb-2">Stay connected and follow us on social media for the latest updates and news:</p>
        <ul className="list-disc list-inside mb-3">
          <li><strong className="font-semibold">Facebook:</strong> <a href="https://www.facebook.com/algoforces" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">facebook.com/algoforces</a></li>
          <li><strong className="font-semibold">Twitter:</strong> <a href="https://twitter.com/algoforces" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">twitter.com/algoforces</a></li>
          <li><strong className="font-semibold">LinkedIn:</strong> <a href="https://www.linkedin.com/company/algoforces" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">linkedin.com/company/algoforces</a></li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Office Address</h3>
        <p className="mb-3">If you prefer to visit us, our office is located at:</p>
        <address className="mb-3">
          AlgoForces Headquarters<br />
          123 Code Street<br />
          Algorithm City, AL 45678<br />
          India
        </address>
        
        <h3 className="text-xl font-semibold mb-2">Feedback Form</h3>
        <p className="mb-3">Alternatively, you can use the form below to send us a message directly from our website:</p>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="block">Name:</label>
            <input type="text" id="name" name="name" className="w-full px-2 py-1 border rounded" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block">Email:</label>
            <input type="email" id="email" name="email" className="w-full px-2 py-1 border rounded" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="block">Message:</label>
            <textarea id="message" name="message" rows="5" className="w-full px-2 py-1 border rounded"></textarea>
          </div>
          <button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded cursor-pointer">Send Message</button>
        </form>
      </section>
      
      <footer>
        <p className="text-lg font-semibold">Together, let's code the future. Welcome to AlgoForces!</p>
      </footer>
    </div>
  );
};

export default ContactUs;