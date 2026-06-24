import { Fragment } from "react";

export const UDEMY_PROFILE_URL = "https://www.udemy.com/user/saad-ahmed-434/";

const LINK_CLASSES =
  "text-gold hover:text-gold-glow underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors";

export function UdemyLink() {
  return (
    <a
      href={UDEMY_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={LINK_CLASSES}
    >
      Udemy
    </a>
  );
}

export function WithUdemyLinks({ text }: { text: string }) {
  const parts = text.split("Udemy");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? <UdemyLink /> : null}
        </Fragment>
      ))}
    </>
  );
}
