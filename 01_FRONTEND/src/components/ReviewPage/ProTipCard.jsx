import { Sparkles } from "lucide-react";

const ProTipCard = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-3xl p-6 text-white shadow-lg">

      <div className="flex items-center gap-3 mb-4">
        <Sparkles size={24} />
        <h3 className="text-xl font-bold">
          PRO TIP
        </h3>
      </div>

      <p className="leading-8 text-white/90">
        Strong interview answers combine a clear strength,
        a real example, and a measurable impact. Avoid
        generic statements like "I'm hardworking" unless
        they're backed by evidence.
      </p>

    </div>
  );
};

export default ProTipCard;