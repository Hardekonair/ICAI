import { Sparkles } from "lucide-react";
import "../../styles/DashboardStyleComponents/9contact.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  return (
    <footer className="footer ">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-left">

          {/* Logo + Title */}
          <div className="flex mb-2 items-center gap-2">
            <div className="w-9 h-9  rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white">
              <Sparkles size={15} />
            </div>

            <span className="font-bold text-lg text-white">
              Interview <span className="text-indigo-600">Coach</span>
            </span>
          </div>

          <p>
            AI-powered interview coaching for everyone. Practice smarter,
            land your dream job.
          </p>

          {/* Social Icons */}
          <div className="socials flex gap-3 mt-3">
            <div><FaTwitter size={18} /></div>
            <div><FaLinkedin size={18} /></div>
            <div><FaGithub size={18} /></div>
          </div>
        </div>

        {/* Columns */}
        <div className="footer-columns">

          <div>
            <h4>Product</h4>
            <p>Features</p>
            <p>Pricing</p>
            <p>Sample Report</p>
            <p>Changelog</p>
          </div>

          <div>
            <h4>Company</h4>
            <p>About</p>
            <p>Blog</p>
            <p>Careers</p>
            <p>Contact</p>
          </div>

          <div>
            <h4>Legal</h4>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Cookie Policy</p>
            <p>GDPR</p>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 InterviewAI Coach. All rights reserved.</p>
        <p>Made with ❤️ to help you land your dream job</p>
      </div>
    </footer>
  );
}