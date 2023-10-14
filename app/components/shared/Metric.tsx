import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const metricContent = () => {
    return (
      <>
        <Image
          src={imgUrl}
          alt={alt}
          width={isAuthor ? 32 : 16}
          height={isAuthor ? 32 : 16}
          className={`object-cover ${href ? 'rounded-full' : ''}`}
          style={{
            // border: isAuthor ? '3px solid #FF7000' : '',
            height: isAuthor ? 32 : '',
          }}
        />
        <p className={`${textStyles} flex items-center gap-1`}>
          {value}
          <span
            className={`small-regular line-clamp-1 ${
              isAuthor ? 'max-sm:hidden' : ''
            }`}
          >
            {title}
          </span>
        </p>
      </>
    );
  };
  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent()}
      </Link>
    );
  }
  return <div className="flex-center flex-wrap gap-1">{metricContent()}</div>;
};

export default Metric;
