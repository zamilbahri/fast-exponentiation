import React from 'react';
import katex from 'katex';

interface MathProps {
  children: string;
  block?: boolean;
  className?: string;
}

const MathText: React.FC<MathProps> = ({
  children,
  block = false,
  className = '',
}) => {
  const html = katex.renderToString(children, {
    throwOnError: false,
    displayMode: block,
  });

  return (
    <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default MathText;
