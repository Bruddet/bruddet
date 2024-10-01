import Ibsen from "~/assets/Ibsen";

type Props = {
  socialMediaText?: string | null | undefined;
};
export const SocialMediaBlock = ({ socialMediaText }: Props) => {
  return (
    <div className="flex flex-col gap-4 max-w-[300px]">
      <Ibsen />
      <p>{socialMediaText}</p>
      <div className="flex gap-4">
        <a className="hover:underline" href="https://instagram.com">
          INSTAGRAM
        </a>
        <a className="hover:underline" href="https://facebook.com">
          FACEBOOK
        </a>
      </div>
    </div>
  );
};
