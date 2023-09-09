'use client'

import React, { FC, ReactNode } from 'react';

interface AuthLayoutProps {
children: ReactNode;
}


const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
return <div style={{display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"#525252", height:"100vh"}}>{children}</div>;
};

export default AuthLayout;