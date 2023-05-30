import { Typography } from '@mui/material';

export interface BannerProps {
  text: string;
}

export function Banner(props: BannerProps) {
  return <Typography variant="h5">{props.text}</Typography>;
}

export default Banner;
