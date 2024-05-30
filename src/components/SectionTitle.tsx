import React from "react";

interface SectionTitleProps {
    title: string;
    fontSize?: string;
    textTracking?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, fontSize, textTracking }) => {
    const size = fontSize ? fontSize : "text-5xl";
    const tracking = textTracking ? textTracking : "tracking-normal";
    return <h1 className={`font-extrabold ${size} ${tracking}`}>{title}</h1>;
}

export default SectionTitle;
