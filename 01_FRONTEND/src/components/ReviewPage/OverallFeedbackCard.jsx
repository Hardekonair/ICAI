import { MessageSquareQuote } from "lucide-react";

const OverallFeedbackCard = ({
    feedback = "No feedback available."
}) => {

    return (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5  flex flex-col">

            {/* Header */}

            <div className="flex items-center gap-2 mb-4">

                <MessageSquareQuote
                    size={20}
                    className="text-indigo-600"
                />

                <h3 className="text-lg font-semibold text-slate-900">
                    Overall Feedback
                </h3>

            </div>

            {/* Scrollable Body */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    pr-2
                    text-slate-600
                    leading-7
                    text-[15px]
                "
            >

                {feedback}

            </div>

        </div>

    );

};

export default OverallFeedbackCard;