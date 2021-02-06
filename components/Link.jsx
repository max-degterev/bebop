import { forwardRef } from 'react';
import NextLink from 'next/link';

const Link = forwardRef((props, ref) => {
  const { as, href, ...other } = props;

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

export default Link;
