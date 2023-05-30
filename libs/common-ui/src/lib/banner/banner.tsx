export interface BannerProps {
  text: string;
}

export function Banner(props: BannerProps) {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
}

export default Banner;
