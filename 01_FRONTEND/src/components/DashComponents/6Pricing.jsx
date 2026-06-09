import "../../styles/DashboardStyleComponents/6pricing.css";
import { CheckCircle, Star } from "lucide-react";

export default function Pricing() {
  return (
    <section className="pricing-section">
      <h2>Simple, Transparent Pricing</h2>
      <p className="pricing-subtitle">
        Start free. Upgrade when you're ready.
      </p>

      <div className="pricing-container">
        
        {/* Free Plan */}
        <div className="pricing-card pricing-free">
          <h4>Free</h4>

          <h3>
            <span className="pricing-price">$0</span>
            <span className="pricing-duration">/forever</span>
          </h3>

          <ul className="pricing-list">
            <li><CheckCircle size={18} /> 5 practice sessions/month</li>
            <li><CheckCircle size={18} /> Basic speech analysis</li>
            <li><CheckCircle size={18} /> Filler word detection</li>
            <li><CheckCircle size={18} /> Score summary</li>
          </ul>

          <button className="pricing-btn pricing-primary">
            Get Started Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card pricing-pro">
          <div className="pricing-badge ">
            <Star size={15} color="white" /> Most Popular
          </div>

          <h4>Pro</h4>

          <h3>
            <span className="pricing-price">$9.99</span>
            <span className="pricing-duration">/month</span>
          </h3>

         <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle size={18} className="mt-1 shrink-0" />
              <span>Unlimited sessions</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle size={18} className="mt-1 shrink-0" />
              <span>Full speech + expression + body language</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle size={18} className="mt-1 shrink-0" />
              <span>Downloadable reports</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle size={18} className="mt-1 shrink-0" />
              <span>Practice history</span>
            </li>

            <li className="flex items-start gap-3">
              <CheckCircle size={18} className="mt-1 shrink-0" />
              <span>Priority support</span>
            </li>
          </ul>

          <button className="pricing-btn pricing-secondary">
            Start 7-Day Free Trial
          </button>
        </div>

      </div>
    </section>
  );
}