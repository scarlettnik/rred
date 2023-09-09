import * as React from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = styled.input`
background-color: #bdbdbd;
font-size: 1.1rem;
border-color: transparent;
transition: border-color 0.3s;
color: black;
&:focus,
&:active {
outline: none;
border-color: #ccff00;
border-width: 2px;
}
input::placeholder {
  color: white;
}
&.disabled {
cursor: not-allowed;
opacity: 0.5;
}
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
({ className, type, ...props }, ref) => {
return (
<StyledInput
type={type}
className={cn(
"flex h-10 w-full rounded-md border border-input px-3 py-2",
className
)}
ref={ref}
{...props}
/>
);
}
);

Input.displayName = "Input";

export { Input };