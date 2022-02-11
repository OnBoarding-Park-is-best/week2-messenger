import React from 'react';
import styled from 'styled-components';
import { AvatarSizeEnum } from '~types/index';

interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSizeEnum;
  width?: string;
}

const SIZES: { [K in AvatarSizeEnum]: string } = {
  [AvatarSizeEnum.Small]: '32px',
  [AvatarSizeEnum.Medium]: '64px',
  [AvatarSizeEnum.Large]: '128px',
};

const Avatar = ({
  src,
  alt,
  size = AvatarSizeEnum.Small,
  width = '',
}: AvatarProps) => {
  return <Image src={src} alt={alt} size={width || SIZES[size]} />;
};

interface ImageProps {
  size: string;
}

const Image = styled.img<ImageProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`;

export default Avatar;
