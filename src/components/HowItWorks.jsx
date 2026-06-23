"use client";

import { useEffect, useRef, useState } from "react";
import { MdPersonAddAlt1, MdSearch, MdVolunteerActivism } from "react-icons/md";

const steps = [
  [MdPersonAddAlt1, "Create your profile", "Register your blood group and location so the right people can find you."],
  [MdSearch, "Find the right match", "Search verified donors nearby or publish a request when blood is urgently needed."],
  [MdVolunteerActivism, "Connect & save a life", "Respond, coordinate the donation, and keep every request moving forward."],
];

export default function HowItWorks() {
  const flowRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setReady(true);
    const flow = flowRef.current;
    if (!flow) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    observer.observe(flow);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="container-pad py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-eyebrow">Simple. Human. Fast.</span>
        <h2 className="mt-3 text-4xl font-black md:text-5xl">How BloodLink works</h2>
        <p className="mt-4 text-lg leading-8 text-[#667085]">From signing up to saving a life, the path stays clear.</p>
      </div>
      <div ref={flowRef} className={`process-flow mt-14${ready ? " process-flow-ready" : ""}${visible ? " is-visible" : ""}`}>
        {steps.map(([Icon, title, text], index) => (
          <article key={title} className="process-card" style={{ "--step-delay": `${index * 440}ms` }}>
            <span className="process-number">0{index + 1}</span>
            <span className="process-icon"><Icon aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            {index < steps.length - 1 && <span className="process-connector" aria-hidden="true" />}
          </article>
        ))}
      </div>
    </section>
  );
}
