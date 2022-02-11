import { ReactComponent as SendSVG } from '~assets/icon-send.svg';
import { ReactComponent as ReplySVG } from '~assets/icon-reply.svg';
import { ReactComponent as DeleteSVG } from '~assets/icon-delete.svg';

interface IconsProps {
  size: number;
}

export const Send = ({ size }: IconsProps) => {
  return <SendSVG width={size} height={size} />;
};

export const Reply = ({ size }: IconsProps) => {
  return <ReplySVG width={size} height={size} />;
};

export const Delete = ({ size }: IconsProps) => {
  return <DeleteSVG width={size} height={size} />;
};
