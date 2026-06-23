import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  AlertCircle,
  MessageSquare,
  RotateCw,
  Square,
  Play,
  RadioReceiver,
} from "lucide-react";

import Header from "../DashComponents/1Header";
import { saveRecording, getSession } from "../../utils/interviewStorage";

const StartRecording = () => {

  const navigate = useNavigate(); // Because useNavigate() is a React Hook, must be called inside a react component
  /*
    -----------------------------------
    REFS
    -----------------------------------
  */
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const recognitionRef = useRef(null);
  const recordingStartRef = useRef(null);   //Need start timestamp, Need duration calculation
  const transcriptRef = useRef("");     // is the SAME object forever.

  // for audio waves
  const analyserRef = useRef(null);
  const audioDataRef = useRef(null);
  const animationRef = useRef(null);


  /*
    -----------------------------------
    STATES
    -----------------------------------
  */
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const [timer, setTimer] = useState(0);

  const [videoBlob, setVideoBlob] = useState(null);
  const [videoURL, setVideoURL] = useState("");

  const [transcript,setTranscript] = useState("");

  const [question, setQuestion] = useState(""); // Add Question State

  // for audio waves
  const [waveData, setwaveData] = useState(Array(20).fill(5));

  //  FOR SAVING SESSION DATA AND QUESTION, Create loadQuestion()
  const loadQuestion = async () =>{
    
    const session = await getSession();

      if(!session){
        navigate("/practice");
        return;
      }

      setQuestion(session.question);
    };

    useEffect(() => {
      console.log("Transcript State Updated:", transcript);
      setTranscript(transcript);
    }, [transcript]);

  /*
    -----------------------------------
    START CAMERA
    -----------------------------------
  */
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = mediaStream;

      // for audio waveform
      const audioContext = new AudioContext();
      const analyzer = audioContext.createAnalyser();

      const source = audioContext.createMediaStreamSource(mediaStream);
      source.connect(analyzer);

      analyzer.fftSize = 64;

      const bufferLength = analyzer.frequencyBinCount;
      const dataArray= new Uint8Array(bufferLength);
      analyserRef.current=analyzer;
      audioDataRef.current = dataArray;
    // done

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);

      alert("Unable to access camera/microphone");
    }
  };

  /*
    -----------------------------------
    STOP CAMERA TRACKS
    -----------------------------------
  */
  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    setStream(null);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  /*
    -----------------------------------
    TIMER
    -----------------------------------
  */
  const startTimer = () => {
    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerIntervalRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${mins}:${secs}`;
  };

  /* 
    -----------------------------------
    SPEECH RECOGNITION
    -----------------------------------
  */
  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(!SpeechRecognition){
      window.alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // recognition.onresult = (event) => {
    //   let finalTranscript = "";
    //   let interimTranscript = "";

    //   for(let i = event.resultIndex; i<event.results.length; i++){
    //     const transcriptPart = event.results[i][0].transcript;

    //     if(event.results[i].isFinal){
    //       finalTranscript += transcriptPart + " ";
    //     } else {
    //       interimTranscript += transcriptPart;
    //     }
    //   }

    //   // setTranscript(finalTranscript + interimTranscript);
    //   setTranscript((prev) => {
    //     return prev + finalTranscript;
    //   });
    // };

    recognition.onresult = (event) => {
      let transcriptText = "";

      for (let i = 0; i < event.results.length; i++) {
        transcriptText +=
          event.results[i][0].transcript + " ";
      }

      transcriptRef.current = transcriptText;     // Now both transcript and transcript.current stay synchronized

      setTranscript(transcriptText);
      console.log(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error: ", event.error);
    };

    recognition.start();
  }

  const stopSpeechRecognition = () => {
    if(recognitionRef.current){
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };
  /*
    -----------------------------------
    START WAVES
    -----------------------------------
  */
  const startWaveAnimation = () => {
    const animate = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(
        audioDataRef.current
      )

      const bars = Array.from(
        audioDataRef.current
      ).slice(0,20);

      setwaveData(
        bars.map((v)=>Math.max(6,v/4))
      );
      animationRef.current = requestAnimationFrame(animate);

    };

    animate();
  }
  /*
    -----------------------------------
    START RECORDING
    -----------------------------------
  */
  const startRecording = async () => {
    try {
      /*
        Restart camera if stopped
      */
      if (!streamRef.current) {
        await startCamera();
      }

      if (isRecording) return;

      if (!window.MediaRecorder) {
        alert("MediaRecorder not supported");
        return;
      }

      setTimer(0);

      // Save Recording Start Time
      recordingStartRef.current = Date.now();

      const options = MediaRecorder.isTypeSupported("video/webm")
        ? { mimeType: "video/webm" }
        : {};

      const mediaRecorder = new MediaRecorder(
        streamRef.current,
        options
      );

      mediaRecorderRef.current = mediaRecorder;

      let chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      // mediaRecorder.onstop = () => {
      //   const blob = new Blob(chunks, {
      //     type: "video/webm",
      //   });
      // setVideoBlob(blob);
      mediaRecorder.onstop = async () => {

        const blob = new Blob (chunks,{type:"video/webm"});
        
        // Calculate Duration
        const endedAt = Date.now();
        const duration = Math.floor((endedAt - recordingStartRef.current)/1000);
        
        // Prevent Tiny Recordings
        if(duration<3){

          alert("Please Record atleast 3 SECOND");
          return;

        }
        console.log("Saving Transcript",transcriptRef.current);
        await saveRecording({
          videoBlob:blob,

          transcript : transcriptRef.current,

          duration,
          startedAt: recordingStartRef.current,
          endedAt,
          createdAt: Date.now(),
        });
        
        navigate("/analyze");
      };


        /*
          Remove old URL
        */
        // if (videoURL) {
        //   URL.revokeObjectURL(videoURL);
        // }

        // const url = URL.createObjectURL(blob);

        // setVideoURL(url);
      // };

      mediaRecorder.start();

      setIsRecording(true);
      setTranscript("");

      transcriptRef.current = "";     // reset otherwise previous recording transcript can remain
      startWaveAnimation();
      startSpeechRecognition();

      startTimer();
    } catch (err) {
      console.error(err);
    }
  };

  /*
    -----------------------------------
    STOP RECORDING
    -----------------------------------
  */
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    stopTimer();

    setIsRecording(false);
    setTranscript(transcript);

    stopSpeechRecognition();

    /*
      OPTIONAL:
      Turn camera OFF after recording
    */
    stopMediaTracks();
    cancelAnimationFrame(animationRef.current);
  };

  /*
    -----------------------------------
    CANCEL
    -----------------------------------
  */
  const handleCancel = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }

    stopTimer();

    setIsRecording(false);

    setTimer(0);
    
    stopSpeechRecognition();

    stopMediaTracks();
    cancelAnimationFrame(animationRef.current);
    navigate("/questions");
  };

  /*
    -----------------------------------
    Get microphone stream
    -----------------------------------
  */
  // const stream=await navigator.mediaDevices.getUserMedia({
  //   audio:true
  // });


  /*
    -----------------------------------
    INITIAL CAMERA START
    -----------------------------------
  */
  useEffect(() => {
    startCamera();

    // Call loadQuestion()
    loadQuestion();

    return () => {
      /*
        Stop recorder
      */
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }

      /*
        Stop timer
      */
      stopTimer();

      /*
        Stop Speech Recognition
      */
      stopSpeechRecognition();

      /*
        Stop webcam/mic
      */
      stopMediaTracks();

      /*
        Cleanup blob URL
      */
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-auto">
      <Header />

      <div className="flex-1 flex flex-col justify-center items-center bg-gray-100 px-4 py-8">
        {/* HEADER */}
        <div className="flex items-center text-red-500 font-semibold gap-2 mb-4">
          <div
            className={`w-3 h-3 rounded-full ${
              isRecording
                ? "bg-red-500 animate-pulse"
                : "bg-gray-400"
            }`}
          />

          <span className="text-sm font-semibold uppercase tracking-widest">
            {isRecording ? "Recording" : "Idle"}
          </span>

          <span className="text-sm font-black text-gray-900 tabular-nums ml-2">
            {formatTime(timer)}
          </span>
        </div>

        {/* QUESTION BOX */}
        <div className="bg-white border border-indigo-100 rounded-2xl px-5 py-4 mb-5 max-w-xl w-full text-center shadow-sm">
          <p className="text-base font-semibold text-gray-900 leading-relaxed">
            {question?.title}
          </p>

          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
              {question?.difficulty}
            </span>

            <span className="text-xs text-gray-400">
              {question?.type}
            </span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-4">
          {/* CAMERA */}
          <div className="bg-black rounded-2xl overflow-hidden aspect-video relative shadow-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* LIVE BADGE */}
            {isRecording && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 rounded-full px-2 py-1">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>

                <span className="text-white text-xs font-medium">
                  LIVE
                </span>
              </div>
            )}
          </div>

          {/* TRANSCRIPT */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare
                className="text-indigo-500"
                size={16}
              />

              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Live Transcript
              </span>
            </div>

            <div className="flex-1 overflow-y-auto text-sm text-gray-700 leading-relaxed">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {transcript || "Start speaking — your words will appear here…"}
              </p>
            
            {!isRecording &&
              <p className="text-xs text-amber-600 mt-4 flex items-center gap-1">
                <AlertCircle
                  size={14}
                  className="text-yellow-500"
                />
                Speech recognition not connected yet
              </p>
            }

            </div>
          </div>
        </div>

        {/* <div className="bg-white rounded-2xl p-6 mt-4 w-full max-w-xl flex justify-center items-center gap-1"> */}
        <div className="bg-white rounded-2xl p-6 mt-4 w-full max-w-xl h-24 flex justify-center items-center gap-1 overflow-hidden">
          {waveData.map((height, index) => (
            <div
              key={index}
              className="w-1.5 rounded-full bg-gradient-to-t from-indigo-600 to-cyan-400 transition-all duration-75"
              style={{
                height: `${height}px`,
              }}
            />
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
          {/* CANCEL */}
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <RotateCw size={16} />

            CANCEL
          </button>

          {/* START / STOP */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-sm shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-105 transition-all duration-200"
            >
              <Play size={16} />

              START RECORDING
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm shadow-lg shadow-red-200 hover:shadow-red-300 hover:scale-105 transition-all duration-200"
            >
              <Square size={16} />

              STOP RECORDING
            </button>
          )}

          {/* DOWNLOAD */}
          {videoURL && (
            <a
              href={videoURL}
              download="recording.webm"
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium"
            >
              Download Recording
            </a>
          )}
        </div>

        {/* PLAYBACK */}
        {videoURL && (
          <div className="w-full max-w-3xl mt-8">
            <video
              controls
              src={videoURL}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* TIP */}
        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-400 max-w-md text-center leading-relaxed">
            <span className="font-semibold text-gray-500">
              Tip:
            </span>{" "}
            Use the Present–Past–Future structure:
            where you are now, how you got here,
            and where you're headed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartRecording;
