interface PullQuoteProps {
  value: {
    quote: string;
    attribution?: string;
  };
}

export const PullQuote = ({ value }: PullQuoteProps) => {
  return (
    <blockquote className="my-8 border-l-4 border-purple-500 py-2 pl-4 italic">
      <p className="text-xl leading-relaxed">{value.quote}</p>
      {value.attribution && (
        <cite className="mt-4 block text-right not-italic">— {value.attribution}</cite>
      )}
    </blockquote>
  );
};
