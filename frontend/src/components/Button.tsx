import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    starIcon: ReactElement;
}

const variantsClasses = {
    "primary": "bg-purple-600 text-white",    
    "secondary": "bg-purple-200 text-purple-600"            
}

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center" 

export function Button({variant, text, starIcon}: ButtonProps) {

    return <button className={variantsClasses[variant] + " " + defaultStyles } >
        <div className="pr-2" >
            {starIcon}
        </div>
            {text}
        
    </button>

}