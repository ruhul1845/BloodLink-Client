"use client";

import { useEffect, useRef, useState } from "react";
import { MdCampaign, MdPayments, MdPersonSearch } from "react-icons/md";

const features = [
  {
    Icon: MdPersonSearch,
    eyebrow: "Faster discovery",
    title: "Precision donor search",
    text: "Find compatible donors by blood group, district, and upazila without sorting through irrelevant profiles.",
  },
  {
    Icon: MdCampaign,
    eyebrow: "Clear coordination",
    title: "Urgent request workflow",
    text: "Publish critical needs, connect with responders, and follow each request from pending to completed.",
  },
  {
    Icon: MdPayments,
    eyebrow: "Meaningful support",
    title: "Secure community funding",
    text: "Support blood donation operations through a protected funding flow with role-aware records.",
  },
];

export default function FeaturedSection() {
  const cardsRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setReady(true);
    const cards = cardsRef.current;
    if (!cards) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    observer.observe(cards);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="featured-section py-24">
      <div className="container-pad">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Built for every urgent moment</span>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">Everything needed to make an impact</h2>
          <p className="mt-4 text-lg leading-8 text-[#667085]">A focused platform that removes friction between a blood request and the person ready to help.</p>
        </div>
        <div ref={cardsRef} className={`feature-grid mt-14${ready ? " feature-grid-ready" : ""}${visible ? " is-visible" : ""}`}>
          {features.map(({ Icon, eyebrow, title, text }, index) => (
            <article className="feature-card" key={title} style={{ "--feature-delay": `${index * 210}ms` }}>
              <div className="feature-card-top">
                <span className="feature-icon"><Icon aria-hidden="true" /></span>
                <span className="feature-index">0{index + 1}</span>
              </div>
              <p className="feature-eyebrow">{eyebrow}</p>
              <h3>{title}</h3>
              <p className="feature-copy">{text}</p>
              <span className="feature-accent" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
