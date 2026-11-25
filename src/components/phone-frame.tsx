import type { ReactNode } from "react";

type PhoneFrameProps = {
  className: string;
  children: ReactNode;
};

export function PhoneFrame({ className, children }: PhoneFrameProps) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-frame-screen">{children}</div>
      <img
        className="phone-frame-shell phone-frame-shell-top"
        src="/assets/phone-frame.webp"
        width="862"
        height="1825"
        alt=""
      />
      <img
        className="phone-frame-shell phone-frame-shell-bottom"
        src="/assets/phone-frame.webp"
        width="862"
        height="1825"
        alt=""
      />
    </div>
  );
}
