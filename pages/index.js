import Head from "next/head";
import Image from "next/image";
import logo from "../assets/Black_and_White_Minimal_Monogram_Logo-removebg-preview.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
       <link rel="icon" href="favicon.ico"/>
       <title>Wo</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Vocabulate</h1>
          </div>
          <div className="header-subtitle">
            <h2>
            Find the word you're thinking of just by describing it
            </h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="start typing here"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={() => {
                console.log("pressed me");
                callGenerateEndpoint();
              }}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Find Your Word</p>
                )}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Your Word:</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://twitter.com/KrishivThakuria"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <p>Made by Krishiv Thakuria</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
