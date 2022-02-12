import { ReactComponent as SendSVG } from '~assets/icon-send.svg';
import { ReactComponent as ReplySVG } from '~assets/icon-reply.svg';
import { ReactComponent as DeleteSVG } from '~assets/icon-delete.svg';

interface SvgProps {
  size: number;
  color?: string;
}

export const Send = ({ size, color }: SvgProps) => {
  return <SendSVG width={size} height={size} fill={color} />;
};

export const Reply = ({ size }: SvgProps) => {
  return <ReplySVG width={size} height={size} />;
};

export const Delete = ({ size }: SvgProps) => {
  return <DeleteSVG width={size} height={size} />;
};
