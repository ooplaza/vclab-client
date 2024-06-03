import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type ButtonVariant = "link" | "outline" | "default" | "destructive" | "success" | "secondary" | "ghost";

interface CustomButtonTargetProps {
    title: string;
    variant?: ButtonVariant;
    link: string;
    icon?: React.ReactNode;
    hoverClass?: string;
}

export default function CustomButtonTarget({
    title,
    variant,
    link,
    icon,
    hoverClass,
}: CustomButtonTargetProps) {
    const Icon = icon ? icon : null;
    const theme = variant ? variant : "outline";
    return (
        <>
            <Link href={link} target="_blank">
                <Button variant={theme} className={`${hoverClass}`}>
                    {Icon && <span className="mx-1">{Icon}</span>}{" "}
                    {title && <span className="mx-1">{title}</span>}{" "}
                </Button>
            </Link>
        </>
    );
}
