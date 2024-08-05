import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  magicURL: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  magicURL,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>

    <p>click here to login to extro 😉 {magicURL}</p>
  </div>
);
